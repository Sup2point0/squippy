<!-- @component Input -->

<script lang="ts">

interface Props {
  value: any;
  placeholder?: string;
  max?: number;
}

let {
  value = $bindable(),
  placeholder = "",
  max,
}: Props = $props();

</script>


<input
  type="number"
  bind:value
  {placeholder}
  min={0}
  {max}
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

  &::placeholder {
    color: rgb(black, 25%);
    font-size: 80%;
  }

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
