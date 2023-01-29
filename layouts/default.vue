<template>
  <div :class="$style.container">
    <custom-header />
    <slot />
  </div>
</template>

<script>
import CustomHeader from "~/components/CustomHeader.vue";
export default {
  components: { CustomHeader },
};
</script>

<style module lang="scss">
.container {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>