<!-- @component AddSubtitle

-->

<script lang="ts">

import { subtitles } from "#scripts/stores";
import { Subtitle } from "#scripts/types";


let self: HTMLElement;


function add_subtitle()
{
  $subtitles.subs.push(new Subtitle());
  $subtitles.subs = $subtitles.subs;

  setTimeout(() => {
    self.parentElement?.scrollTo({
      top: self.parentElement.scrollHeight,
      behavior: "smooth"
    });
  }, 100);
}

</script>


<button
  bind:this={self}
  onclick={add_subtitle}
>
  +
</button>


<style lang="scss">

button {
  padding: 0 1.5rem;
  margin: 1rem 5rem 0;
  @include font-code;
  color: rgb(black, 20%);
  font-size: 200%;
  background: none;
  border: none;
  border-radius: $border-radius;
  transition: all 0.1s ease-out;

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
