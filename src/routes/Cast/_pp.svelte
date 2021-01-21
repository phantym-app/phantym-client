<script>
  export let obj;

  const pp = obj =>
    JSON.stringify(obj, (key, value) => value, '..')
      .split('\n')
      .join('<br/>');
</script>

<code>
  {@html pp(obj)}
</code>

<style>
  code {
    background-color: lavender;
    font-size: x-small;
  }
</style>
