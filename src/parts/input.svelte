<!-- @component Input -->

<script lang="ts">

interface Props {
  kind?: "text" | "number";
  value: any;
  placeholder?: string;
  style: string;
}

let {
  kind = "text",
  value = $bindable(),
  placeholder = "",
  style,
}: Props = $props();

</script>


<input type={kind}
  bind:value
  {placeholder}
  {style}
/>


<style lang="scss">

@use 'sass:color';


input {
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
    outline-color: color.change($col-prot, $alpha: 0.4);
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }
}

</style>
