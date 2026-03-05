<!-- @component Subtitle -->

<script lang="ts">

import { subtitles, prefs } from "#scripts/stores";
import type { Subtitle } from "#scripts/types";

import type { DraggingData } from "#src/routes/subtitles-view.svelte"

import Input    from "#parts/input.svelte";
import Textarea from "#parts/textarea.svelte";
import Insert   from "#parts/insert.svelte";

import { slide } from "svelte/transition";
import { expoOut } from "svelte/easing";

import { getContext } from "svelte";
    import { stopPropagation } from "svelte/legacy";


interface Props {
  index: number;
  subtitle: Subtitle;
}

let { index, subtitle = $bindable() }: Props = $props();

let dragging: DraggingData = getContext("dragging");


let self: HTMLElement;


function onmousedown(e: MouseEvent)
{
  dragging.sub_id = subtitle.id;

  if (dragging.ghost) {
    // dragging.ghost.innerHTML = self.innerHTML;
    dragging.ghost.style.height = `${self.offsetHeight}px`;
  }

  dragging.offset_y = self.getBoundingClientRect().y - e.clientY;
  dragging.mouse_y = e.clientY;
  dragging.layer_y = dragging.root?.getBoundingClientRect().y ?? 0;
}

function onmouseenter(e: MouseEvent)
{
  e.stopPropagation();

  if (!dragging.sub_id || dragging.sub_id === subtitle.id) return;

  if (dragging.direction === "up") {
    $subtitles.reorder_before_by_id(dragging.sub_id, subtitle.id);
  } else {
    $subtitles.reorder_after_by_id(dragging.sub_id, subtitle.id);
  }
  $subtitles.subs = $subtitles.subs;
}


function get(
  field: "start" | "end" | "duration",
  component: "mins" | "secs" | "frames",
): () => number | null
{
  /* @ts-ignore */
  return () => subtitle[field]?.[component] ?? null;
}

</script>


<div style:position="relative">
<Insert {index} {dragging} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="subtitle"
  class:grabbed={dragging.sub_id === subtitle.id}
  bind:this={self}
  {onmouseenter}
  transition:slide={{ duration: 400, easing: expoOut }}
>
  <div class="grabber" {onmousedown}>
    <div>=</div>
  </div>

  <div class="left">
    <!-- start -->
    <div class="timestamps">
      <Input placeholder="mm"
        bind:value={get("start", "mins"),   m => subtitle.set("start", { mins: m })} />

      <Input placeholder="ss" max={59}
        bind:value={get("start", "secs"),   s => subtitle.set("start", { secs: s })} />

      <Input placeholder="ff" max={$prefs.framerate}
        bind:value={get("start", "frames"), f => subtitle.set("start", { frames: f })} />
    </div>
    
    <!-- end -->
    <div class="timestamps">
      <Input placeholder="mm" disabled={subtitle.duration?.is_nonempty()}
        bind:value={get("end", "mins"),   m => subtitle.set("end", { mins: m })} />

      <Input placeholder="ss" disabled={subtitle.duration?.is_nonempty()} max={59}
        bind:value={get("end", "secs"),   s => subtitle.set("end", { secs: s })} />

      <Input placeholder="ff" disabled={subtitle.duration?.is_nonempty()} max={$prefs.framerate}
        bind:value={get("end", "frames"), f => subtitle.set("end", { frames: f })} />
    </div>
  </div>

  <Textarea bind:value={subtitle.body} {subtitle} />

  <!-- duration -->
  <div class="timestamps">
    <Input placeholder="mm" disabled={subtitle.end?.is_nonempty()}
      bind:value={get("duration", "mins"),   m => subtitle.set("duration", { mins: m })} />

    <Input placeholder="ss" disabled={subtitle.end?.is_nonempty()} max={59}
      bind:value={get("duration", "secs"),   s => subtitle.set("duration", { secs: s })} />

    <Input placeholder="ff" disabled={subtitle.end?.is_nonempty()} max={$prefs.framerate}
      bind:value={get("duration", "frames"), f => subtitle.set("duration", { frames: f })} />
  </div>

  <div class="actions">
    <button
      onclick={() => $subtitles.reorder_in(subtitle, "up")}
      disabled={index === 0}
    >
      ↑
    </button>
    
    <button onclick={() => $subtitles.delete(subtitle)}>
      ×
    </button>
    
    <button
      onclick={() => $subtitles.reorder_in(subtitle, "down")}
      disabled={index === $subtitles.subs.length - 1}
    >
      ↓
    </button>
  </div>
</div>
</div>


<style lang="scss">

@use 'sass:color';


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
  transition: all 0.1s ease-out;

  &:where(:hover, :focus-visible, :focus-within) {
    box-shadow: 0 0 4px rgb(black, 20%);
  }

  // &:has(.grabber:active) {
  //   user-select: none;
  //   border-color: $col-prot;
  //   outline-color: color.change($col-prot, $alpha: 0.2);
  //   box-shadow: 0 0 0 rgb(black, 20%);
  // }

  &.grabbed {
    user-select: none;
    opacity: 0;
  }
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
  padding: 0 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @include font-code;
  color: rgb(black, 20%);
  font-size: 150%;
  opacity: 0;
  transition: all 0.1s ease-out;

  .subtitle:where(:hover, :focus-visible) & {
    opacity: 1;
  }

  &:hover {
    cursor: grab;
    color: rgb(black, 50%);
  }

  &:active {
    color: black;
  }
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

  .subtitle:where(:hover, :focus-visible, :focus-within) &{
    opacity: 1;
  }
  .subtitle:where(:hover, :focus-visible, :focus-within) &[disabled] {
    pointer-events: none;
    opacity: 20%;
  }

  &:hover, &:focus-visible {
    cursor: pointer;
    color: rgb(black, 50%);
    background: rgb(black, 10%);
  }

  &:active {
    background: rgb(black, 20%);
  }
}

</style>
