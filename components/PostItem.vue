<template>
  <div :class="$style.post">
    {{data.post_content.body}}
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style module lang="scss">
.post {
  width: 100%;
  min-height: 5em;
  border-radius: 1em;
  background-color: rgb(216, 216, 216);
  padding: .5em 1em;
  text-align: justify;
}
</style>