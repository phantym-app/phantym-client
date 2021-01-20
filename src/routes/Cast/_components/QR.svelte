<script lang="ts">
  export let url = 'https://drywa.dev/';
  export let size = 200;
  export let foreground = 'black';

  let element;

  function makeQR() {
    //@ts-ignore
    new QRious({
      element,
      foreground,
      size,
      value: url,
    });
  }
</script>

<svelte:head>
  <!-- --><script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js" on:load={makeQR}>
  </script><!-- -->
</svelte:head>

<canvas bind:this={element} />
