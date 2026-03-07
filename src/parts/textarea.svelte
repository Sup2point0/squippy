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


let invalid = $derived(value.includes("\n\n"));


function onkeydown(e: KeyboardEvent)
{
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "ArrowUp":
        if (e.shiftKey) {
          $subtitles.focus($subtitles.subs[0]);
        }
        else {
          $subtitles.change_focus(subtitle, "previous");
        }
        break;
      
        case "ArrowDown":
        if (e.shiftKey) {
          $subtitles.focus($subtitles.subs[$subtitles.subs.length - 1]);
        }
        else {
          $subtitles.change_focus(subtitle, "next");
        }
        break;
    }
  }
}


const flavour = new FrozenWeightedList(
  [20, "The quick brown fox jumps over the lazy dog"],
  [20, "Lorem ipsum dolor sit amet, consectetur adipiscing elit"],
  [20, "What’s on your mind today?"],
  [20, "The start of something brilliant..."],
  [20, "Your work is regularly saved to your device’s localStorage."],
  [20, "If you’d like to request a feature, just open an Issue in the GitHub repo ;)"],
  [20, "Never gonna give you up~"],
  [2, "sup sup’s sups sup sup’s sup sup sup sup’s sup sups"],
  [2, "If you’re enjoying Squippy, do let me know on GitHub!"],
  [2, "Perfectly balanced, as all things should be"],
  [2, "Is free will real?"],
  [2, "subtext is famously an anagram"],
);

const placeholder = flavour.sample_value();

</script>


<textarea
  class:invalid
  bind:value
  bind:this={subtitle._textarea}
  title={invalid ? "Subtitle body cannot contain an empty line (disallowed in SRT subtitle format)" : "Displayed text of subtitle"}
  placeholder={$prefs.show_flavour && placeholder}
  {onkeydown}
>
</textarea>


<style lang="scss">

@use 'sass:color';


textarea {
  resize: vertical;
  flex-grow: 1;
  height: 6em;
  min-height: 5em;
  field-sizing: content;
  padding: 0.75em;
  @include font-ui;
  font-size: 100%;
  background: none;
  @include interactive;
  border: 1px solid $col-line;
  border-radius: $border-radius;
  transition: all 0.1s ease-out;

  &.invalid {
    color: $col-prot;
    background: color.change($col-prot, $alpha: 0.08);
    border-color: $col-prot;
  }
  
  &::placeholder {
    color: $col-text-placeholder;
  }
}


@media (prefers-contrast: more) {
  textarea {
    border-color: $col-line-contrast;
  }
}

</style>
