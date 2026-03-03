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

input {
  padding: 0.5em 1em;
  @include font-ui;
  font-size: unset;
  background: none;
  border: 1px solid #ddd;
  border-radius: 0.5em;

  &:hover, &:focus {
    outline: 2px solid rgb(lightskyblue, 50%);
  }
}

</style>
