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
  @include interactive;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  transition: all 0.1s ease-out;

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }
}

</style>
