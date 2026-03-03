<!-- @component Clicky -->

<script lang="ts">

interface Props {
  text: string | [string, string];
  onclick: () => void;
}

let { text, onclick }: Props = $props();


let clicked = $state(false);

function click()
{
  clicked = true;
  onclick();
  setTimeout(() => { clicked = false; }, 3000);
}

</script>


<button
  class:clicked
  onclick={click}
>
  {Array.isArray(text) ? text[+clicked] : text}
</button>


<style lang="scss">

button {
  padding: 0.5em 1em;
  color: white;
  @include font-ui;
  font-size: 100%;
  background: $col-prot;
  border: none;
  border-radius: $border-radius;

  &:hover, &:focus-visible {
    cursor: pointer;
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }

  &.clicked {
    background: $col-deut;
  }
}

</style>
