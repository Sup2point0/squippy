<!-- @component Textarea -->

<script lang="ts">

interface Props {
  value: any;
}

let { value = $bindable() }: Props = $props();

</script>


<textarea bind:value></textarea>


<style lang="scss">

textarea {
  resize: none;
  width: 20em;
  height: 5em;
  padding: 0.75em;
  @include font-ui;
  font-size: 120%;
  background: none;
  @include interactive;
  border: 1px solid #ddd;
  border-radius: $border-radius;
  transition: all 0.1s ease-out;
}

</style>
