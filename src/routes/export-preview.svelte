<script>

import { subtitles, prefs } from "#scripts/stores";
import Clicky from "#parts/clicky.svelte";


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

</script>


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


<style lang="scss">

.preview {
  flex-grow: 1;
  min-width: 40vw;
  position: relative;
  background: light-dark(rgb(black, 3%), rgb(white, 5%));

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
