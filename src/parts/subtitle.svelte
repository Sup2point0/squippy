<!-- @component Subtitle -->

<script lang="ts">

import { subtitles, prefs } from "#scripts/stores";
import type { Subtitle } from "#scripts/types";

import Input    from "#parts/input.svelte";
import Textarea from "#parts/textarea.svelte";

import { slide } from "svelte/transition";
import { expoOut } from "svelte/easing";


interface Props {
  index: number;
  subtitle: Subtitle;
}

let { index, subtitle = $bindable() }: Props = $props();


function get_start(part: "mins" | "secs" | "frames"): () => number | undefined {
  return () => subtitle.start?.[part];
}

function get_end(part: "mins" | "secs" | "frames"): () => number | undefined {
  return () => subtitle.end?.[part];
}

</script>


<div class="subtitle" transition:slide={{ duration: 300, easing: expoOut }}>
  <div class="timestamps">
    <div class="upper">
      <Input kind="number" placeholder="mm" style="width: 2em"
        bind:value={get_start("mins"),   m => subtitle.set_start({ mins: m })} />

      <Input kind="number" placeholder="ss" style="width: 2em"
        bind:value={get_start("secs"),   s => subtitle.set_start({ secs: s })} />

      <Input kind="number" placeholder="ff" style="width: 2em" max={$prefs.framerate}
        bind:value={get_start("frames"), f => subtitle.set_start({ frames: f })} />
    </div>

    <div class="lower">
      <Input kind="number" placeholder="mm" style="width: 2em"
        bind:value={get_end("mins"),   m => subtitle.set_end({ mins: m })} />

      <Input kind="number" placeholder="ss" style="width: 2em"
        bind:value={get_end("secs"),   s => subtitle.set_end({ secs: s })} />

      <Input kind="number" placeholder="ff" style="width: 2em" max={$prefs.framerate}
        bind:value={get_end("frames"), f => subtitle.set_end({ frames: f })} />
    </div>
  </div>

  <Textarea bind:value={subtitle.body} />

  <div class="actions">
    <button onclick={() => $subtitles.reorder_in(subtitle, "up")} disabled={index === 0}> ↑ </button>
    <button onclick={() => $subtitles.delete(subtitle)}> × </button>
    <button onclick={() => $subtitles.reorder_in(subtitle, "down")} disabled={index === $subtitles.subs.length - 1}> ↓ </button>
  </div>
</div>


<style lang="scss">

.subtitle {
  padding: 1em 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 1rem;

  font-size: unset;
  border: 1px solid transparent;
  border-radius: 1em;
  transition: all 0.1s ease-out;

  &:hover, &:focus-visible {
    box-shadow: 0 0 4px rgb(black, 20%);
  }
}

.timestamps {
  align-self: start;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  gap: 0.5rem;

  > div {
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;
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
  margin-left: 0.5rem;

  @include font-code;
  color: rgb(black, 20%);
  font-size: 150%;
  background: none;
  border: none;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.1s ease-out;

  .subtitle:where(:hover, :focus-visible) & {
    opacity: 100%;
  }
  .subtitle:where(:hover, :focus-visible) &[disabled] {
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
