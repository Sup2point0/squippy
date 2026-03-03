<!-- @component Subtitle -->

<script lang="ts">

import type { Subtitle } from "#scripts/types";

import Input from "#parts/input.svelte";


interface Props {
  subtitle: Subtitle;
}

let { subtitle = $bindable() }: Props = $props();

</script>


<button>
  <div class="timestamps">
    <div class="upper">
      <Input kind="number" placeholder="mm" style="width: 2em"
        bind:value={() => subtitle.start?.mins,   m => subtitle.set_start({ mins: m })} />

      <Input kind="number" placeholder="ss" style="width: 2em"
        bind:value={() => subtitle.start?.secs,   s => subtitle.set_start({ secs: s })} />

      <Input kind="number" placeholder="ff" style="width: 2em"
        bind:value={() => subtitle.start?.frames, f => subtitle.set_start({ frames: f })} />
    </div>

    <div class="lower">
      <Input kind="number" placeholder="mm" style="width: 2em"
        bind:value={() => subtitle.end?.mins,   m => subtitle.set_end({ mins: m })} />

      <Input kind="number" placeholder="ss" style="width: 2em"
        bind:value={() => subtitle.end?.secs,   s => subtitle.set_end({ secs: s })} />

      <Input kind="number" placeholder="ff" style="width: 2em"
        bind:value={() => subtitle.end?.frames, f => subtitle.set_end({ frames: f })} />
    </div>
  </div>

  <Input kind="text" bind:value={subtitle.body} style="width: 25em; height: 5em;" />
</button>


<style lang="scss">

button {
  padding: 1em 2em;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 0.5rem;

  font-size: unset;
  background: none;
  border: 1px solid transparent;
  border-radius: 1em;
  transition: all 0.1s ease-out;

  &:hover, &:focus {
    box-shadow: 0 0 4px rgb(black, 20%);
  }
}

.timestamps {
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  gap: 0.5rem;
}

</style>
