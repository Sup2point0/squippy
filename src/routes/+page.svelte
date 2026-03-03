<script>

import { data } from "#scripts/stores";

import Subtitle from "#parts/subtitle.svelte";

</script>


<div class="root">
  <main>
    {#each $data.subtitles as subtitle}
      <Subtitle bind:subtitle />
    {/each}
  </main>
</div>


<style lang="scss">

.root {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

main {
  
}

</style>
