<script context="module">
  declare const cast;
</script>

<script lang="ts">
  import QrCard from './_qrCard.svelte';
  import PlayerList from './_playerList.svelte';

  // const castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

  // castReceiverManager.onReady = function (e) {
  //   castReceiverManager.setApplicationState('Waiting for players');
  // };

  // let roomId = 'ABCD';

  // const messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.unsole.room');
  // messageBus.onMessage = function ({ data, senderId }) {
  //   roomId = JSON.parse(data).roomId;
  //   messageBus.send(senderId, 'ok');
  // };

  // castReceiverManager.start({ statusText: 'Creating Room' });

  const castContext = cast.framework.CastReceiverContext.getInstance();

  const { READY, SENDER_DISCONNECTED } = cast.framework.system.EventType;
  castContext.addEventListener(READY, function () {
    castContext.setApplicationState('Waiting for players');
  });

  let roomId = 'ABCD';

  const NAMESPACE = 'urn:x-cast:com.unsole.room';

  castContext.addCustomMessageListener(NAMESPACE, onMessage);

  function onMessage({ data: message, senderId }) {
    switch (message.type) {
      case 'SET_ROOM':
        roomId = message.roomId;
        break;

      default:
        break;
    }

    castContext.sendCustomMessage(NAMESPACE, senderId, 'OK');
  }

  castContext.start();
  // {
  // skipMplLoad: true,
  // skipPlayersLoad: true,
  // skipShakaLoad: true,
  // }
</script>

<main>
  <QrCard url={'http://en.m.wikipedia.org'} size={300} foreground="#101010" background="#f2f2f2 " />

  <div>
    <h5>or use room code</h5>
    <h1>{roomId}</h1>
  </div>

  <PlayerList />
</main>

<style lang="scss">
  @import '../../styling/sass.scss';

  main {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content max-content 1fr;
    grid-template-rows: 1fr 400px min-content 1fr;
    grid-template-areas:
      '.... .... .... ....'
      '.... qrcd plyr ....'
      '.... code plyr ....'
      '.... .... .... ....';

    column-gap: 100px;

    background-color: $background;

    div {
      grid-area: code;

      margin: auto;
      text-align: center;
      padding-top: 25px;

      h1 {
        color: $purple;
      }
    }
  }
</style>
