<!-- @component Input -->

<script lang="ts">

interface Props {
  value: any;
  title: string;
  placeholder?: string;
  max?: number;
  disabled?: boolean;
}

let {
  value = $bindable(),
  title,
  placeholder = "",
  max,
  disabled,
}: Props = $props();

</script>


<input
  type="number"
  bind:value
  {title}
  {placeholder}
  min={0}
  {max}
  {disabled}
/>


<style lang="scss">

@use 'sass:color';


input {
  width: 2.6em;
  padding: 0.25em 0.5em;
  @include font-ui;
  font-size: 100%;
  background: none;
  @include interactive;
  border: 1px solid $col-line;
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
    color: $col-text-placeholder;
    font-size: 80%;
    transform: translateY(-0.1em);
  }

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    display: none;
  }
}


@media (prefers-contrast: more) {
  input {
    border-color: $col-line-contrast;
  }
}

</style>
