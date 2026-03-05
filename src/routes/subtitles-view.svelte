<!-- @component SubtitleView -->

<script module>

export interface DraggingData {
  root:    HTMLElement | null,
  grabbed: HTMLElement | null,
  ghost:   HTMLElement | null,

  mouse_y:  number,
  offset_y: number,
  layer_y:  number,
}

</script>

<script lang="ts">

import { subtitles } from "#scripts/stores";

import Subtitle      from "#parts/subtitle.svelte";
import AddSubtitle   from "#parts/add-subtitle.svelte";
import SubtitleGhost from "#parts/subtitle.ghost.svelte";

import { onMount, setContext } from "svelte";
import { flip } from "svelte/animate";
import { expoOut } from "svelte/easing";


let dragging: DraggingData = $state({
  root: null,
  grabbed: null,
  ghost: null,

  mouse_y: 0,
  offset_y: 0,
  layer_y: 0,
});

setContext("dragging", dragging);


let self: HTMLElement;

onMount(() => {
  dragging.root = self;
});


function onmousemove(e: MouseEvent)
{
  e.stopPropagation();

  if (dragging.grabbed) {
    dragging.mouse_y = e.clientY;
    dragging.layer_y = self.getBoundingClientRect().y;
  }
}

function onmouseup(e: MouseEvent)
{
  e.stopPropagation();
  dragging.grabbed = null;
}

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main
  bind:this={self}
  {onmousemove}
  {onmouseup}
>
  <SubtitleGhost {dragging} />
  
  {#each $subtitles.subs as sub, index (sub.id)}
    <div animate:flip={{ duration: 500, easing: expoOut }}>
      <Subtitle {index} bind:subtitle={$subtitles.subs[index]} />
    </div>
  {/each}

  <AddSubtitle />
</main>


<style lang="scss">

main {
  flex-grow: 1;
  min-width: 40vw;
  padding: 1.5rem 1.5rem 4rem 1rem;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
}

</style>
