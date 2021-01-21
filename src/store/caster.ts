import { useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

declare const chrome, cast;

const apiLoaded = pipe(
  loadScript,
  wait(500),
)('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');

function useCaster() {
  const [receiverIsAvailable, setReceiverAvailable] = useState(false);
  const [session, setSession] = useState<any>(undefined);
  const [castContext, setCastContext] = useState<any>(undefined);

  async function getCastContext() {
    await apiLoaded;

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
    onSessionStateChange({ sessionState: castContext.getSessionState() });

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

  function onSessionStateChange({ sessionState /* ,session */ }) {
    switch (sessionState) {
      default:
    }
  }

  useEffect(getCastContext, []);
  useEffect(listenForCasts, [castContext]);

  async function sendCast() {
    try {
      const session: any = await castContext.requestSession();
      setSession(castContext.getCurrentSession());
      return;
    } catch (err) {
      throw new Error('Error connecting to the Chromecast');
    }
  }

  async function stopCast() {
    try {
      await new Promise(session.stop);
      console.log('Successfully stopped app.');
    } catch (err) {
      console.log('Error stopping app.');
    }
  }

  return {
    receiverIsAvailable,
    sendCast,
    stopCast,
  };
}

const CasterContainer = createContainer(useCaster);
export { CasterContainer };
