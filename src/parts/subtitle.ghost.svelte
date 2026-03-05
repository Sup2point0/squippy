<!-- @component SubtitleGhost -->

<script lang="ts">

import type { DraggingData } from "#src/routes/subtitles-view.svelte";


interface Props {
  dragging: DraggingData;
}

let { dragging = $bindable() }: Props = $props();

</script>


<div
  class="ghost subtitle"
  class:haunting={dragging.sub_id}
  bind:this={dragging.ghost}
  style:top="{dragging.mouse_y + dragging.offset_y - dragging.layer_y}px"
>
</div>


<style lang="scss">


.ghost {
  pointer-events: none;
  width: 100%;
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgb(black, 8%);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.1s ease-out;

  &.haunting {
    opacity: 1;
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
