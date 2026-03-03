<!-- @component AddSubtitle

-->

<script lang="ts">

import { data } from "#scripts/stores";
import { Subtitle } from "#scripts/types";


function add_subtitle()
{
  $data.subtitles.push(new Subtitle());
  $data.subtitles = $data.subtitles;
}

</script>


<button
  onclick={add_subtitle}
>
  +
</button>


<style lang="scss">

button {
  padding: 2rem 5rem;
  @include font-code;
  font-size: 200%;
  background: none;
  border: none;

  &:hover, &:focus {
    background: rgb(black, 2%);
  }
}

</style>
