<script context="module">
  declare const QRious;
</script>

<script>
  import importScript from '@logic/importScript';

  export let foreground;
  export let background;
  export let roomId$;

  const qriousLoaded = importScript('https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js');

  function qr(element, value) {
    new QRious({
      element,
      foreground,
      background,
      value,
      size: 300,
      level: 'H',
    });
  }
</script>

<div>
  {#await qriousLoaded then _}
    {#await roomId$ then roomId}
      <canvas use:qr={`https://un-sole.web.app/room?join=${roomId}`} />
    {/await}
  {/await}
</div>

<style lang="scss">
  @import '../../styling/sass.scss';

  div {
    grid-area: qrcd;

    width: 400px;
    height: 400px;
    background-color: $white;

    padding: 50px;
    border-radius: 25px;
  }
</style>
