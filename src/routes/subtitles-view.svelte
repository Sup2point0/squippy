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

import Subtitle    from "#parts/subtitle.svelte";
import AddSubtitle from "#parts/add-subtitle.svelte";

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
  <div
    class="ghost subtitle"
    class:haunting={dragging.grabbed}
    bind:this={dragging.ghost}
    style:top="{dragging.mouse_y + dragging.offset_y - dragging.layer_y}px"
  >
  </div>
  
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
  padding: 0.5rem 1.5rem 4rem 1rem;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
}

.ghost {
  pointer-events: none;
  z-index: -2;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0%;

  &.haunting {
    z-index: 20;
    opacity: 100%;
  }
}

.subtitle {
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 0.5rem;

  font-size: unset;
  border: 1px solid transparent;
  border-radius: 1em;
  outline: 3px solid transparent;
}

.left {
  align-self: start;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  gap: 0.5rem;
}

.timestamps {
  display: flex;
  flex-flow: row nowrap;
  align-items: start;
  gap: 0.25rem;
}


.grabber {
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @include font-code;
  color: rgb(black, 20%);
  opacity: 0;
  transition: all 0.1s ease-out;
}

.actions {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.actions button {
  width: 2.1rem;
  height: 2.1rem;

  @include font-code;
  color: rgb(black, 20%);
  font-size: 150%;
  background: none;
  border: none;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.1s ease-out;
}
</style>
