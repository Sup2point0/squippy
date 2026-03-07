<!-- @component UploadFile -->

<script lang="ts">

import { subtitles } from "#src/scripts/stores";


function upload_file(e)
{
  let files = e.target?.files;

  if (files?.length) {
    console.log(files[0]);
  }
}

</script>


<input
  type="file"
  accept="text/plain"
  onchange={upload_file}
/>


<style lang="scss">

input {
  padding: 0.5em 1em;
  @include font-ui;
  color: white;
  font-size: 100%;
  background: $col-prot;
  border: none;
  border-radius: $border-radius;

  &::file-selector-button {
    display: none;
  }

  &:hover, &:focus-visible {
    cursor: pointer;
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
  input:where(:hover, :focus-visible) {
    background: $col-deut;
  }
}

</style>
