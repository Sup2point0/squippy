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
    dragging.ghost.innerHTML = self.innerHTML;
  }

  dragging.offset_y = self.getBoundingClientRect().y - e.clientY;
  dragging.mouse_y = e.clientY;
  dragging.layer_y = dragging.root?.getBoundingClientRect().y ?? 0;
}

function onmouseenter(e: MouseEvent)
{
  e.stopPropagation();

  console.log("dragging.sub_id =", dragging.sub_id);
  console.log("subtitle.id =", subtitle.id);

  if (!dragging.sub_id || dragging.sub_id === subtitle.id) return;

  // console.log("$subtitles.subs.before =", $subtitles.subs.map(sub => `${sub.id}-${sub.body}`));
  if (dragging.direction === "up") {
    $subtitles.reorder_before_by_id(dragging.sub_id, subtitle.id);
  } else {
    $subtitles.reorder_after_by_id(dragging.sub_id, subtitle.id);
  }
  // console.log("$subtitles.subs.after =", $subtitles.subs.map(sub => `${sub.id}-${sub.body}`));
  $subtitles.subs = $subtitles.subs;

  dragging.reordering_id = subtitle.id;
  requestAnimationFrame(() => { dragging.reordering_id = null; });
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


{#snippet timestamp(field: "start" | "end" | "duration")}
  <div class="timestamps">
    <Input placeholder="mm"
      bind:value={get(field, "mins"),   m => subtitle.set(field, { mins: m })} />

    <Input placeholder="ss"
      bind:value={get(field, "secs"),   s => subtitle.set(field, { secs: s })} />

    <Input placeholder="ff" max={$prefs.framerate}
      bind:value={get(field, "frames"), f => subtitle.set(field, { frames: f })} />
  </div>
{/snippet}


<div style:position="relative">
<Insert {index} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="subtitle"
  class:grabbed={dragging.sub_id === subtitle.id}
  bind:this={self}
  {onmousedown}
  {onmouseenter}
  transition:slide={{ duration: 400, easing: expoOut }}
>
  <div class="grabber">
    <div>=</div>
  </div>

  <div class="left">
    {@render timestamp("start")}
    {@render timestamp("end")}
  </div>

  <Textarea bind:value={subtitle.body} />

  <!-- duration -->
  <div class="timestamps">
    <Input placeholder="mm" disabled={subtitle.end?.is_not_null()}
      bind:value={get("duration", "mins"),   m => subtitle.set("duration", { mins: m })} />

    <Input placeholder="ss" disabled={subtitle.end?.is_not_null()}
      bind:value={get("duration", "secs"),   s => subtitle.set("duration", { secs: s })} />

    <Input placeholder="ff" disabled={subtitle.end?.is_not_null()} max={$prefs.framerate}
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

  &:has(.grabber:active) {
    user-select: none;
    border-color: $col-prot;
    outline-color: color.change($col-prot, $alpha: 0.2);
    box-shadow: 0 0 0 rgb(black, 20%);
  }

  &.grabbed {
    opacity: 0%;
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
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @include font-code;
  color: rgb(black, 20%);
  opacity: 0;
  transition: all 0.1s ease-out;

  .subtitle:where(:hover, :focus-visible) & {
    opacity: 100%;
  }

  &:hover {
    cursor: grab;
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
    opacity: 100%;
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
