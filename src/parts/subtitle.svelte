<!-- @component Subtitle -->

<script lang="ts">

import { subtitles, prefs } from "#scripts/stores";
import type { Subtitle } from "#scripts/types";

import Input    from "#parts/input.svelte";
import Textarea from "#parts/textarea.svelte";
import Insert   from "#parts/insert.svelte";

import { slide } from "svelte/transition";
import { expoOut } from "svelte/easing";


interface Props {
  index: number;
  subtitle: Subtitle;
}

let { index, subtitle = $bindable() }: Props = $props();


let self: HTMLElement;

function ondragstart(e: DragEvent)
{
  self.id = "dragged-subtitle";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("drag-subtitle", "");
}

function ondragend(e: DragEvent)
{
  self.removeAttribute("id");
}


function get_start(part: "mins" | "secs" | "frames"): () => number | null {
  return () => subtitle.start?.[part] ?? null;
}

function get_end(part: "mins" | "secs" | "frames"): () => number | null {
  return () => subtitle.end?.[part] ?? null;
}

function get_duration(part: "mins" | "secs" | "frames"): () => number | null {
  return () => subtitle.duration?.[part] ?? null;
}

</script>


<div style:position="relative">
<div
  class="subtitle"
  draggable={true}
  {ondragstart}
  {ondragend}
  bind:this={self}
  transition:slide={{ duration: 400, easing: expoOut }}
>
  <div class="grabber">
    <div>=</div>
  </div>

  <div class="left">
    <!-- start -->
    <div class="timestamps">
      <Input placeholder="mm"
        bind:value={get_start("mins"),   m => subtitle.set("start", { mins: m })} />

      <Input placeholder="ss"
        bind:value={get_start("secs"),   s => subtitle.set("start", { secs: s })} />

      <Input placeholder="ff" max={$prefs.framerate}
        bind:value={get_start("frames"), f => subtitle.set("start", { frames: f })} />
    </div>

    <!-- end -->
    <div class="timestamps">
      <Input placeholder="mm"
        bind:value={get_end("mins"),   m => subtitle.set("end", { mins: m })} />

      <Input placeholder="ss"
        bind:value={get_end("secs"),   s => subtitle.set("end", { secs: s })} />

      <Input placeholder="ff" max={$prefs.framerate}
        bind:value={get_end("frames"), f => subtitle.set("end", { frames: f })} />
    </div>
  </div>

  <Textarea bind:value={subtitle.body} />

  <!-- duration -->
  <div class="timestamps">
    <Input placeholder="mm" disabled={subtitle.end?.is_not_null()}
      bind:value={get_duration("mins"),   m => subtitle.set("duration", { mins: m })} />

    <Input placeholder="ss" disabled={subtitle.end?.is_not_null()}
      bind:value={get_duration("secs"),   s => subtitle.set("duration", { secs: s })} />

    <Input placeholder="ff" disabled={subtitle.end?.is_not_null()} max={$prefs.framerate}
      bind:value={get_duration("frames"), f => subtitle.set("duration", { frames: f })} />
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

<Insert {index} />
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
