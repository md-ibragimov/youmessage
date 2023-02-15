<template>
  <div :class="$style.post">
    <button v-if="isLoading && postsId.includes(data.id)">Delete</button>
    <button @click="deletePost" :class="$style.delete"></button>
    {{ data.post_content.body }}
  </div>
</template>

<script>
export default {
  props: ["data", "postsId"],
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    deletePost() {
      this.isLoading = true;
      this.$emit("deletePost", this.data.id, this.data.author);
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