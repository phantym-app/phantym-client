<script lang="ts">
  export let roomId;

  import { readable } from 'svelte/store';
  import { db } from '@logic/firebase/database';
  import type firebase from 'firebase';

  function dbReadable(ref: firebase.database.Reference) {
    const { subscribe } = readable({}, function (set) {
      const flag = ref.child('isCasting');
      flag.set(true);
      flag.onDisconnect().remove();

      const query = ref.orderByChild('index').startAt(0);
      const sync = snap => set(snap.val());
      query.on('value', sync);
      return () => query.off('value', sync);
    });

    return { subscribe, ref };
  }

  const room = dbReadable(db.ref('room').child(roomId));

  $: players = Object.values($room ?? {});
  $: playerCount = players.length;
</script>

<div class="playerList">
  <h2 class="title">
    {playerCount} player{playerCount === 1 ? '' : 's'} in room
  </h2>

  {#each players as { displayName }, i}
    <h4 class="player" class:admin={i == 0}>{displayName}</h4>
  {/each}
</div>

<style lang="scss">
  @import '../../styling/sass.scss';

  .playerList {
    grid-area: plyr;
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
  }
</style>
