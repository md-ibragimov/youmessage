<template>
  <div :class="$style.post">
    <button :class="$style.delete"></button>
    {{ data.post_content.body }}
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    postDelete() {
      console.log(this.data);
    },
  },
};
</script>

<style module lang="scss">
.post {
  width: 100%;
  min-height: 5em;
  border-radius: 1em;
  background-color: rgb(216, 216, 216);
  padding: 0.5em 1em;
  text-align: justify;
  position: relative;
  .delete {
    width: 1.5em;
    height: 1.5em;
    border: none;
    top: 0.25em;
    right: 0.5em;
    position: absolute;
    background: url("~/assets/delete.svg") no-repeat no-repeat center;
    background-size: contain;
    cursor: pointer;
  }
}
</style>