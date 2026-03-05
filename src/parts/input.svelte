<!-- @component Input -->

<script lang="ts">

interface Props {
  value: any;
  placeholder?: string;
  max?: number;
  disabled?: boolean;
}

let {
  value = $bindable(),
  placeholder = "",
  max,
  disabled,
}: Props = $props();

</script>


<input
  type="number"
  bind:value
  {placeholder}
  min={0}
  {max}
  {disabled}
/>


<style lang="scss">

@use 'sass:color';


input {
  width: 2.5em;
  padding: 0.25em 0.5em;
  @include font-ui;
  font-size: 120%;
  background: none;
  @include interactive;
  border: 1px solid #ddd;
  border-radius: $border-radius;
  transition: all 0.1s ease-out;

  &:invalid {
    color: $col-prot;
    background: color.change($col-prot, $alpha: 0.08);
    border-color: $col-prot;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 25%;
  }

  &::placeholder {
    color: rgb(black, 25%);
    font-size: 80%;
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }
}

</style>
