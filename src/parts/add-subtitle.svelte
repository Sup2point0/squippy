<!-- @component AddSubtitle

-->

<script lang="ts">

import { subtitles } from "#scripts/stores";
import { Subtitle } from "#scripts/types";


function add_subtitle()
{
  $subtitles.subs.push(new Subtitle());
  $subtitles.subs = $subtitles.subs;
}

</script>


<button
  onclick={add_subtitle}
>
  +
</button>


<style lang="scss">

button {
  padding: 0.5rem 1.5rem;
  margin-top: 1rem;
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
