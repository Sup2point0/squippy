<script lang="ts">

import "#styles/essence.scss";

import SubtitlesView from "./subtitles-view.svelte";
import Preview from "./preview.svelte";


</script>


<div class="root">
  <SubtitlesView />
  <Preview />
</div>


<style lang="scss">

.root {
  width: 100vw;
  height: 100vh;
  padding: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  gap: 1rem;
}

</style>
