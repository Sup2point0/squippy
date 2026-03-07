<!-- @component SubtitleView -->

<script module>

import type { Int } from "#scripts/types";

export interface DraggingData {
  root:   HTMLElement | null;
  ghost:  HTMLElement | null;

  sub_id: Int | null;
  direction: "up" | "down";
  mouse_y_previous: number;

  mouse_y:  number;
  offset_y: number;
  layer_y:  number;
}

</script>

<script lang="ts">

import { subtitles, prefs } from "#scripts/stores";
import { parse_srt } from "#scripts/parsers";
import { Subtitle as SubtitleData } from "#scripts/types";

import Subtitle      from "#parts/subtitle.svelte";
import AddSubtitle   from "#parts/add-subtitle.svelte";
import SubtitleGhost from "#parts/subtitle.ghost.svelte";
import Clicky        from "#parts/clicky.svelte";

import { onMount, setContext } from "svelte";
import { flip } from "svelte/animate";
import { expoOut } from "svelte/easing";


let dragging: DraggingData = $state({
  root: null,
  ghost: null,

  sub_id: null,
  direction: "down",
  mouse_y_previous: 0,
  
  mouse_y: 0,
  offset_y: 0,
  layer_y: 0,
});

setContext("dragging", dragging);


let self: HTMLElement;
let upload: HTMLElement;

onMount(() => {
  dragging.root = self;
});


function onmousemove(e: MouseEvent)
{
  e.stopPropagation();

  if (dragging.sub_id) {
    dragging.mouse_y_previous = dragging.mouse_y;
    dragging.mouse_y = e.clientY;
    dragging.layer_y = self.getBoundingClientRect().y;

    if (dragging.mouse_y < dragging.mouse_y_previous) {
      dragging.direction = "up";
    } else {
      dragging.direction = "down";
    }
  }
}

function onmouseup(e: MouseEvent)
{
  e.stopPropagation();
  dragging.sub_id = null;
}


function upload_file()
{
  if ($subtitles.subs.length > 1) {
    if (!window.confirm("Overwrite current work with content of uploaded file?")) return;
  }

  if (upload === undefined) {
    upload = document.createElement("input");
    upload.type = "file";
    upload.accept = ".srt";
    upload.addEventListener("change", process_file);
  }

  upload.click();
}

async function process_file(e)
{
  let files = e.target?.files;
  if (!files?.length) return;

  let file = files[0];
  let src = await file.text();
  let subs = parse_srt(src, $prefs.framerate);
  console.log("subs =", $state.snapshot(subs));
  $subtitles.subs = subs;
}

function clear_subtitles()
{
  if (window.confirm("Delete all subtitles and timings? This will clear all work.")) {
    $subtitles.subs = [new SubtitleData()];
  }
}

</script>


<div class="container">

  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <main
    bind:this={self}
    {onmousemove}
    {onmouseup}
  >
    <SubtitleGhost bind:dragging />
    
    {#each $subtitles.subs as sub, index (sub.id)}
      <div animate:flip={{ duration: 500, easing: expoOut }}>
        <Subtitle {index} bind:subtitle={$subtitles.subs[index]} />
      </div>
    {/each}

    <AddSubtitle />
  </main>

  <div class="clickies">
    <Clicky text="Upload File" onclick={upload_file} />
    <Clicky text="Clear" onclick={clear_subtitles} />
  </div>

</div>


<style lang="scss">

.container {
  flex-grow: 1;
  min-width: 50vw;
  position: relative;
}

main {
  height: 100%;
  padding: 1.5rem 1.5rem 4rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
}

.clickies {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
}

</style>
