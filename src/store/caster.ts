import { useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

declare const chrome: {
  cast: {
    initialize: (apiConfig, onInitSuccess?, onInitError?) => any;
    media: {
      DEFAULT_MEDIA_RECEIVER_APP_ID;
      MediaInfo;
      LoadRequest;
    };
    SessionRequest;
    ApiConfig;
    isAvailable;
    requestSession;
  };
};

const apiHasLoaded = new Promise<void>(res => {
  const _pollApi = setInterval(function () {
    if (chrome.cast.isAvailable) {
      clearInterval(_pollApi);
      res();
    }
  }, 1000);
});

function useCaster() {
  const [session, _setSession] = useState<any>(undefined);
  const [receiverIsAvailable, _setReceiverAvailable] = useState(false);

  useEffect(async function initApi() {
    await apiHasLoaded;

    const _config = new chrome.cast.ApiConfig(
      new chrome.cast.SessionRequest('4D7DAAD2'),
      sessionListener,
      receiverListener,
    );

    chrome.cast.initialize(_config);
  }, []);

  function receiverListener(e) {
    if (e === 'available') {
      console.log('Chromecast was found on the network.');
      _setReceiverAvailable(true);
    } else {
      console.log('There are no Chromecasts available.');
      _setReceiverAvailable(false);
    }
  }

  function sessionListener(e) {
    _setSession(e);
    console.log('New session');
    if (session.media.length != 0) {
      console.log('Found ' + session.media.length + ' sessions.');
    }
  }

  async function launchApp() {
    try {
      console.log('Launching the Chromecast App...');
      const session: any = await new Promise(chrome.cast.requestSession);
      console.log('Successfully created session: ' + session.sessionId);
      _setSession(session);

      let mediaInfo = new chrome.cast.media.MediaInfo('http://i.imgur.com/IFD14.jpg');
      mediaInfo.contentType = 'image/jpg';

      let request = new chrome.cast.media.LoadRequest(mediaInfo);
      request.autoplay = true;

      await new Promise((res, rej) => session.loadMedia(request, res, rej));

      console.log('Successfully loaded image.');

      return;
    } catch (err) {
      console.log('Error connecting to the Chromecast or Failed to load image.');
      throw new Error('Error connecting to the Chromecast or Failed to load image.');
    }
  }

  async function stopApp() {
    try {
      await new Promise(session.stop);
      console.log('Successfully stopped app.');
    } catch (err) {
      console.log('Error stopping app.');
    }
  }

  return {
    receiverIsAvailable,
    launchApp,
    stopApp,
  };
}

const CasterContainer = createContainer(useCaster);
export { CasterContainer };
