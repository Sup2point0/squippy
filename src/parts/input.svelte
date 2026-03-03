<!-- @component Input -->

<script lang="ts">

interface Props {
  value: any;
  placeholder?: string;
  max?: number;
  style: string;
}

let {
  value = $bindable(),
  placeholder = "",
  max = 60,
  style,
}: Props = $props();

</script>


<input
  type="number"
  bind:value
  {placeholder}
  {style}
  min={0}
  {max}
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
  border-radius: $border-radius;
  transition: all 0.1s ease-out;

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }

  &:invalid {
    color: $col-prot;
    background: color.change($col-prot, $alpha: 0.08);
    border-color: $col-prot;
  }
}

</style>
