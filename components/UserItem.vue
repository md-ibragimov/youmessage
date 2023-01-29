<template>
  <div :class="$style.container">
    Hello: {{data.firstName}} {{data.lastName}}
  </div>
</template>

<script>
export default {
  props: ["data",],
};
</script>

<style module lang="scss">
.container {}
</style>