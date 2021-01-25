import { useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

declare const chrome, cast;
type CastSession = any;
type CastContext = any;

const NAMESPACE = 'urn:x-cast:com.unsole.room';

importScript('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
const apiAvailable = new Promise(res => (window['__onGCastApiAvailable'] = res));

function useCaster() {
  const [canCast, setCanCast] = useState(false);
  const [castSession, setCastSession] = useState<CastSession>(null);
  const [castContext, setCastContext] = useState<CastContext>(null);

  function onCastStateChange({ castState }) {
    switch (castState) {
      case 'NO_DEVICES_AVAILABLE':
      case 'CONNECTED':
        setCanCast(false);
        break;

      case 'NOT_CONNECTED':
        setCanCast(true);
        break;

      case 'CONNECTING':
        break;
    }
  }

  function onSessionStateChange({ errorCode, session, sessionState }) {
    switch (sessionState) {
      case 'SESSION_STARTED':
        session.sendMessage(NAMESPACE, { type: 'SET_ROOM', roomId: 'NICE' });
      case 'SESSION_RESUMED':
        session.addMessageListener(NAMESPACE, onMessage);
        setCastSession(session);
        break;

      case 'SESSION_ENDED':
        session.removeMessageListener(NAMESPACE, onMessage);
        setCastSession(null);
        break;

      case 'NO_SESSION':
      case 'SESSION_STARTING':
      case 'SESSION_START_FAILED':
      case 'SESSION_ENDING':
        break;
    }
  }

  function onMessage(_, data: string) {
    const message = JSON.parse(data);
    if (message === 'OK') return;

    switch (message.type) {
      default:
        console.log(message);
    }
  }

  useEffect(getCastContext, []);
  useEffect(listenForCasts, [castContext]);

  async function getCastContext() {
    await apiAvailable;

    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: '4D7DAAD2',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    setCastContext(castContext);
  }

  function listenForCasts() {
    if (castContext === null) return;

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

  function sendMessage(message: object) {
    if (!castSession) throw new Error('cant send message to cast - no cast session exists');

    let _handle;
    let _onOk;

    // TODO i wish this wasnt so ugly :(
    return new Promise<void>(function (res, rej) {
      _handle = setTimeout(rej, 15000);
      _onOk = function (_, data) {
        JSON.parse(data) === 'OK' && res();
      };

      castSession.addMessageListener(NAMESPACE, _onOk);
      castSession.sendMessage(NAMESPACE, message);
    }).finally(function () {
      clearTimeout(_handle);
      castSession.removeMessageListener(NAMESPACE, _onOk);
    });
  }

  return {
    canCast,
    isCasting: !!castSession,

    async startCast() {
      await castContext.requestSession();
    },

    stopCast() {
      castSession.endSession(true);
    },
  };
}

const CasterContainer = createContainer(useCaster);
export { CasterContainer };
