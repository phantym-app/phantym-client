<script lang="ts">
</script>

<div class="playerList">
  <h2 class="title">
    Players in room {3}/{8}
  </h2>

  {#each ['twist', 'Keanu Reeves', 'MarkBoi99'] as player, i}
    <h4 class="player" class:admin={i == 0}>{player}</h4>
  {/each}

  {#if true}
    <h6 class="subtext">waiting for more players to join...</h6>
  {/if}
</div>

<style lang="scss">
  @import '../../styling/sass.scss';

  .playerList {
    grid-area: plyr;
    margin: 0px auto;
    display: flex;
    flex-direction: column;

    .title {
      margin-bottom: 25px;
    }

    .player {
      padding-left: 30px;

      &.admin::before {
        margin-left: -30px;
        padding-right: 10px;
        content: url('/assets/icons/crown.svg');
      }
    }

    .subtext {
      padding-left: 30px;
      margin: 50px 0px 0px;
      color: $greyLifted;
    }
  }
</style>
