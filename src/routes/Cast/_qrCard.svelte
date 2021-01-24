<script context="module">
  declare const QRious;
</script>

<script>
  export let url = 'https://drywa.dev/';
  export let size = 200;
  export let foreground = 'black';
  export let background = 'white';

  let element;

  const qriousLoaded = importScript('https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js');

  qriousLoaded.then(function makeQR() {
    new QRious({
      element,
      foreground,
      background,
      size,
      value: url,
    });
  });
</script>

<div>
  <canvas bind:this={element} />
</div>

<style lang="scss">
  @import '../../styling/sass.scss';

  div {
    grid-area: qrcd;
    background-color: $white;
    padding: 50px;
    border-radius: 25px;
  }
</style>
