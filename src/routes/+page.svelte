<script>

import "#styles/essence.scss";

import { data } from "#scripts/stores";

import Subtitle from "#parts/subtitle.svelte";

</script>


<div class="root">
  <main>
    {#each $data.subtitles as subtitle}
      <Subtitle bind:subtitle />
    {/each}
  </main>

  <aside class="preview">
    <pre><code>{#key $data.subtitles}{$data.export_raw()}{/key}</code></pre>
  </aside>
</div>


<style lang="scss">

.root {
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  gap: 1rem;
}

main {
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.preview {
  flex-grow: 1;
}

pre {
  height: 100%;
  padding: 1em;
  overflow-y: scroll;
  background: rgb(black, 4%);

  code {
    @include font-code;
  }
}

</style>
