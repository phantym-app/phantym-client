import { useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

declare const chrome, cast;

importScript('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
const apiAvailable = new Promise(res => (window['__onGCastApiAvailable'] = res));

function useCaster() {
  const [receiverIsAvailable, setReceiverAvailable] = useState(false);
  const [session, setSession] = useState<any>(undefined);
  const [castContext, setCastContext] = useState<any>(undefined);

  async function getCastContext() {
    await apiAvailable;

    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: '4D7DAAD2',
      // receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    setCastContext(castContext);
  }

  function listenForCasts() {
    if (castContext === undefined) return;

    onCastStateChange({ castState: castContext.getCastState() });
    // onSessionStateChange({ sessionState: castContext.getSessionState() });

    const { CAST_STATE_CHANGED, SESSION_STATE_CHANGED } = cast.framework.CastContextEventType;
    castContext.addEventListener(CAST_STATE_CHANGED, onCastStateChange);
    castContext.addEventListener(SESSION_STATE_CHANGED, onSessionStateChange);
    return function cleanup() {
      castContext.removeEventListener(CAST_STATE_CHANGED, onCastStateChange);
      castContext.removeEventListener(SESSION_STATE_CHANGED, onSessionStateChange);
    };
  }

  function onCastStateChange({ castState }) {
    switch (castState) {
      case 'NO_DEVICES_AVAILABLE':
        setReceiverAvailable(false);
        break;

      case 'NOT_CONNECTED':
        setReceiverAvailable(true);
        break;

      case 'CONNECTING':
      case 'CONNECTED':
        break;
        throw new Error('unhandled castStateChange');
    }
  }

  function onSessionStateChange({ errorCode, session, sessionState }) {
    switch (sessionState) {
      case 'SESSION_STARTED':
        const _session = castContext.getCurrentSession();
        _session.addMessageListener('urn:x-cast:com.unsole.room', onMessage);
        setSession(_session);
        break;

      case 'NO_SESSION':
      case 'SESSION_STARTING':
      case 'SESSION_START_FAILED':
      case 'SESSION_ENDING':
      case 'SESSION_ENDED':
      case 'SESSION_RESUMED':
        break;
        throw new Error('unhandled sessionStateChange');
    }
  }

  function onMessage(_namespace, data) {
    if (data === 'OK') return;
    console.log(JSON.parse(data));
  }

  useEffect(getCastContext, []);
  useEffect(listenForCasts, [castContext]);
  useEffect(
    function () {
      if (session) sendMessage({ type: 'SET_ROOM', roomId: 'NICE' });
    },
    [session],
  );

  async function sendCast() {
    try {
      await castContext.requestSession();
      return;
    } catch (err) {
      throw new Error('Error connecting to the Chromecast');
    }
  }

  async function sendMessage(message: any) {
    if (!session) throw new Error('cant send message to cast - no cast session exists');
    session.sendMessage('urn:x-cast:com.unsole.room', message);
  }

  return {
    receiverIsAvailable,

    sendCast,
    stopCast() {
      session.endSession(true);
    },

    isCasting: !!session,
  };
}

const CasterContainer = createContainer(useCaster);
export { CasterContainer };
