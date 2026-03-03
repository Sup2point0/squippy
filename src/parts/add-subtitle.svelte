<!-- @component AddSubtitle

-->

<script lang="ts">

import { subtitles } from "#scripts/stores";
import { Subtitle } from "#scripts/types";


function add_subtitle()
{
  $subtitles.subs.push(new Subtitle());
}

</script>


<button
  onclick={add_subtitle}
>
  +
</button>


<style lang="scss">

button {
  padding: 1rem 2rem;
  @include font-code;
  font-size: 200%;
  background: none;
  border: 1px solid transparent;

  &:hover, &:focus {
    border-color: $col-prot;
  }
}

</style>
