<script context="module">
  declare const cast;
</script>

<script lang="ts">
  import QrCard from './_qrCard.svelte';
  import PlayerList from './_playerList.svelte';

  const NAMESPACE = 'urn:x-cast:com.unsole.room';

  const castContext = cast.framework.CastReceiverContext.getInstance();
  const { READY, SENDER_DISCONNECTED } = cast.framework.system.EventType;

  const roomIdPromise = new Promise(function (res) {
    function onRoomCode({ data }) {
      if (data?.type === 'SET_ROOM') {
        castContext.removeCustomMessageListener(NAMESPACE, onRoomCode);
        castContext.addCustomMessageListener(NAMESPACE, onMessage);
        res(data.roomId);
      }
    }

    castContext.addCustomMessageListener(NAMESPACE, onRoomCode);
  });

  castContext.addEventListener(READY, onReady);

  castContext.start({
    skipMplLoad: true,
    skipPlayersLoad: true,
    skipShakaLoad: true,
  });

  function onReady() {
    castContext.setApplicationState('Waiting for players');
  }

  function onMessage({ data, senderId }) {
    switch (data?.type) {
    }
    castContext.sendCustomMessage(NAMESPACE, senderId, 'OK');
  }
</script>

<main>
  <QrCard foreground="#101010" background="#f2f2f2" {roomIdPromise} />

  {#await roomIdPromise}
    <div>
      <h5>creating room...</h5>
    </div>
  {:then roomId}
    <div>
      <h5>or use room code</h5>
      <h1>{roomId}</h1>
    </div>
  {/await}

  <PlayerList />
</main>

<style lang="scss">
  @import '../../styling/sass.scss';

  main {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content 420px 1fr;
    grid-template-rows: 1fr 400px min-content 1fr;
    grid-template-areas:
      '.... .... .... ....'
      '.... qrcd plyr ....'
      '.... code plyr ....'
      '.... .... .... ....';

    column-gap: 100px;

    background-color: $background;

    div {
      height: 133.8px;
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
