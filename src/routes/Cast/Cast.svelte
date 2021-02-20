<script context="module">
  declare const cast;
</script>

<script lang="ts">
  import QrCard from './_qrCard.svelte';
  import PlayerList from './_playerList.svelte';

  const NAMESPACE = 'urn:x-cast:com.phantym.room';

  const castContext = cast.framework.CastReceiverContext.getInstance();
  const { READY, SENDER_DISCONNECTED } = cast.framework.system.EventType;

  const roomId$ = new Promise<string>(function (res) {
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
  <QrCard foreground="#101010" background="#f2f2f2" {roomId$} />

  {#await roomId$}
    <div class="roomCode">
      <h5>creating room...</h5>
    </div>
  {:then roomId}
    <div class="roomCode">
      <h5>or use room code</h5>
      <h1>{roomId}</h1>
    </div>
  {/await}

  {#await roomId$}
    <div class="playerList">
      <h2 class="title">Waiting for players</h2>
    </div>
  {:then roomId}
    <PlayerList {roomId} />
  {/await}
</main>

<style lang="scss">
  @import '../../styling/sass.scss';

  main {
    width: 100%;
    display: grid;
    // TODO use non absolute, what if 4k???
    grid-template-columns: 1fr 400px 420px 1fr;
    grid-template-rows: 1fr 400px 135px 1fr;
    grid-template-areas:
      '.... .... .... ....'
      '.... qrcd plyr ....'
      '.... code plyr ....'
      '.... .... .... ....';

    column-gap: 150px;

    background-color: $background;

    .roomCode {
      height: 100%;
      grid-area: code;

      margin: auto;
      text-align: center;
      padding-top: 25px;

      h1 {
        color: $purple;
      }
    }

    .playerList {
      grid-area: plyr;
    }
  }
</style>
