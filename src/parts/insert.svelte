<!-- @component Insert -->

<script lang="ts">

import type { Int } from "#scripts/types";
import type { DraggingData } from "#src/routes/subtitles-view.svelte";

import { subtitles } from "#scripts/stores";
import { Subtitle } from "#scripts/types";


interface Props {
  index: Int;
  dragging: DraggingData;
}

let { index, dragging }: Props = $props();

</script>


<button
  class="insert"
  class:hidden={dragging.sub_id}
  onclick={() => $subtitles.subs.splice(index, 0, new Subtitle())}
>
  <div class="line"></div>
  <div class="add">+</div>
</button>


<style lang="scss">

button.insert {
  width: calc(100% + 1.5rem);
  height: 1rem;
  position: absolute;
  z-index: 2;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  font-size: 150%;
  background: none;
  border: none;
  transform: translateY(-0.64rem);
  opacity: 1.0;
  transition: all 0.1s ease-out;

  &:hover, &:focus-visible {
    cursor: pointer;
    color: rgb(black, 50%);

    .line {
      background: rgb(black, 10%);
    }

    .add {
      background: rgb(black, 10%);
    }
  }

  &:active {
    .line {
      background: rgb(black, 20%);
    }
  }

  &.hidden {
    opacity: 0;
  }
}

.line {
  width: 100%;
  height: 0.5rem;
  background: transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-out;
}

.add {
  width: 2rem;
  min-width: 2rem;
  height: 2rem;
  min-height: 2rem;
  @include font-code;
  color: rgb(black, 20%);
  background: transparent;
  border-radius: 50%;
  transition: all 0.1s ease-out;
}

:global(.subtitle:active button.insert) {
  opacity: 0;
}

</style>
