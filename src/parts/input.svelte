<!-- @component Input -->

<script lang="ts">

interface Props {
  kind?: "text" | "number";
  value: any;
  placeholder?: string;
  max?: number;
  style: string;
}

let {
  kind = "text",
  value = $bindable(),
  placeholder = "",
  max: MAX_FRAMES = 60,
  style,
}: Props = $props();

</script>


<input 
  class={kind}
  type={kind}
  bind:value
  {placeholder}
  {style}
  min={kind === "number" ? 0 : undefined}
  max={kind === "number" ? MAX_FRAMES : undefined}
/>


<style lang="scss">

@use 'sass:color';


input {
  min-width: max-content;
  padding: 0.25em 0.5em;
  @include font-ui;
  font-size: 120%;
  background: none;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  outline: 3px solid transparent;
  transition: all 0.1s ease-out;

  &:hover, &:focus {
    border-color: $col-prot;
    outline-color: color.change($col-prot, $alpha: 0.2);
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }
}

</style>
