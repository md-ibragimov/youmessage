<template>
  <button type="button" :class="$style.button">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style module lang="scss">
.button {
  border: 1px solid teal;
  background: none;
  font-size: 1.3em;
  cursor: pointer;
}
</style>