<!-- @component Clicky -->

<script lang="ts">

interface Props {
  text: string | [string, string];
  onclick: () => void;
}

let { text, onclick }: Props = $props();


let clicked = $state(false);
let timeout = 0;

function click()
{
  clicked = true;
  onclick();
  timeout = setTimeout(() => { clicked = false; }, 3000);
}

function unclick()
{
  if (timeout) clearTimeout(timeout);
  clicked = false;
}

</script>


<button
  class:clicked={Array.isArray(text) && clicked}
  onclick={click}
  onmouseover={unclick}
  onfocus={unclick}
>
  {Array.isArray(text) ? text[+clicked] : text}
</button>


<style lang="scss">

button {
  padding: 0.5em 1em;
  @include font-ui;
  color: white;
  font-size: 100%;
  background: $col-prot;
  border: none;
  border-radius: $border-radius;
  box-shadow: 0 2px 4px rgb(black, 25%);
  transition: all 0.1s ease-out;

  &:hover, &:focus-visible {
    cursor: pointer;
    box-shadow: 0 2px 6px rgb(black, 40%);
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }

  &.clicked {
    background: $col-deut;
  }
}


@media (prefers-color-scheme: dark) {
  button:where(:hover, :focus-visible) {
    background: $col-deut;
  }
}

</style>
