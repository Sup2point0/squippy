<!-- @component SubtitleView -->

<script lang="ts">

import { subtitles } from "#scripts/stores";

import Subtitle    from "#parts/subtitle.svelte";
import AddSubtitle from "#parts/add-subtitle.svelte";

import { flip } from "svelte/animate";
import { expoOut } from "svelte/easing";


let self: HTMLElement;


function create_placeholder(): HTMLElement
{
  let out = document.createElement("div");
  out.classList.add("placeholder");
  return out;
}


function ondragover(e: DragEvent)
{
  if (!e.dataTransfer?.types.includes("drag-subtitle")) return;

  e.preventDefault();

  let placeholder = self.querySelector(".placeholder");

  if (placeholder) {
    let rect = placeholder.getBoundingClientRect();
    if (rect.top <= e.clientY && e.clientY <= rect.bottom) return;
  }

  let dragged = document.getElementById("dragged-subtitle");

  for (let child of self.children) {
    if (child.getBoundingClientRect().bottom >= e.clientY) {
      if (child === placeholder) return;

      placeholder?.remove();

      if (child === dragged || child.previousElementSibling === dragged) return;

      self.insertBefore(
        placeholder ?? create_placeholder(),
        child,
      )

      return;
    }
  }

  placeholder?.remove();
  if (self.lastElementChild === dragged) return;
  self.append(placeholder ?? create_placeholder());
}

function ondrop(e: DragEvent)
{
  e.preventDefault();

  let dragged = document.getElementById("dragged-subtitle");
  let placeholder = self.querySelector(".placeholder");
  if (!placeholder) return;

  
}

</script>


<main
  bind:this={self}
  {ondragover}
  {ondrop}
>
  {#each $subtitles.subs as sub, index (sub.id)}
    <div animate:flip={{ duration: 500, easing: expoOut }}>
      <Subtitle {index} bind:subtitle={$subtitles.subs[index]} />
    </div>
  {/each}

  <AddSubtitle />
</main>


<style lang="scss">

main {
  flex-grow: 1;
  min-width: 40vw;
  padding: 0.5rem 1.5rem 4rem 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
}

.placeholder {
  width: 100%;
  height: 2rem;
}

</style>
