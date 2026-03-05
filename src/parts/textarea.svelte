<!-- @component Textarea -->

<script lang="ts">

import { FrozenWeightedList } from "@sup2.0/weighted-list";

import { subtitles, prefs } from "#scripts/stores";
import type { Subtitle } from "#scripts/types";


interface Props {
  value: any;
  subtitle: Subtitle;
}

let { value = $bindable(), subtitle }: Props = $props();


function onkeydown(e: KeyboardEvent)
{
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "ArrowUp":   $subtitles.change_focus(subtitle, "previous"); break;
      case "ArrowDown": $subtitles.change_focus(subtitle, "next"); break;
    }
  }
}


const flavour = new FrozenWeightedList(
  [20, "The quick brown fox jumps over the lazy dog"],
  [20, "What’s on your mind today?"],
  [20, "Never gonna give you up~"],
  [2, "sup sup’s sups sup sup’s sup sup sup sup’s sup sups"],
);

const placeholder = flavour.sample_value();

</script>


<textarea
  bind:value
  bind:this={subtitle._textarea}
  placeholder={$prefs.show_flavour && placeholder}
  {onkeydown}
>
</textarea>


<style lang="scss">

textarea {
  resize: none;
  flex-grow: 1;
  height: 5em;
  padding: 0.75em;
  @include font-ui;
  font-size: 100%;
  background: none;
  @include interactive;
  border: 1px solid $col-line;
  border-radius: $border-radius;
  transition: all 0.1s ease-out;
  
  &::placeholder {
    color: $col-text-placeholder;
  }
}

</style>
