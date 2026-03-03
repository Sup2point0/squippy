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
  <Input kind="number" value={subtitle.start} style="width: 4em" />
  <Input bind:value={subtitle.body} style="width: 20em; height: 5em;" />
</button>


<style lang="scss">

button {
  padding: 1em 2em;
  font-size: unset;
  background: none;
  border: 1px solid transparent;
  border-radius: 1em;

  &:hover, &:focus {
    border-color: #ddd;
  }
}

</style>
