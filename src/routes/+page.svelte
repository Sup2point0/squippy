<script lang="ts">

import "#styles/essence.scss";

import { subtitles, prefs } from "#scripts/stores";

import Subtitle    from "#parts/subtitle.svelte";
import AddSubtitle from "#parts/add-subtitle.svelte";
import Clicky      from "#parts/clicky.svelte";

import { flip } from "svelte/animate";
import { expoOut } from "svelte/easing";


let exported = $derived($subtitles.export_raw($prefs.default_duration));


function export_srt()
{
  let blob = new Blob([exported], { type: "text/plain"});
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "subtitles.srt";
  a.click();
}

function ondragover(e: DragEvent)
{
  if (e.dataTransfer?.types.includes("task")) {
    e.preventDefault();
  }
}

</script>


<div class="root">
  <main {ondragover}>
    {#each $subtitles.subs as sub, index (sub.id)}
      <div animate:flip={{ duration: 500, easing: expoOut }}>
        <Subtitle {index} bind:subtitle={$subtitles.subs[index]} />
      </div>
    {/each}

    <AddSubtitle />
  </main>

  <aside class="preview">
    <p class="lang">SRT</p>

    <pre><code>{#key $subtitles.subs}{exported}{/key}</code></pre>

    <div class="clickies">
      <Clicky
        text="Export to File"
        onclick={export_srt}
      />

      <Clicky
        text={["Copy to Clipboard", "Copied to Clipboard!"]}
        onclick={() => navigator.clipboard.writeText(exported)}
      />
    </div>
  </aside>
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

main {
  flex-grow: 1;
  min-width: 40vw;
  padding: 0.5rem 1.5rem 4rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
}

.preview {
  flex-grow: 1;
  min-width: 40vw;
  position: relative;
  background: rgb(black, 3%);

  p.lang {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    @include font-code;
    color: #aaa;
    font-weight: 500;
  }
}

pre {
  height: 100%;
  padding: 1em;
  overflow-y: scroll;

  code {
    @include font-code;
    word-wrap:break-word
  }
}

.clickies {
  position: absolute;
  bottom: 0.5rem;
  right: 1.5rem;
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
}

</style>
