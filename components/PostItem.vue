<template>
  <div :class="$style.post">
    <ClipLoader v-if="isLoading" :class="$style.loader" />
    <button
      v-else-if="!isLoading && authUser && $route.params.id === authUser.id"
      @click="deletePost"
      :class="$style.delete"
    ></button>
    {{ data.post_content.body }}
  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import PocketBase from "pocketbase";

export default {
  props: ["data"],
  components: { ClipLoader },
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      this.authUser = pb.authStore.model;
    });
  },
  data() {
    return {
      isLoading: false,
      authUser: null,
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
  .loader {
    position: absolute;
    top: 0.25em;
    right: 0.5em;
  }
}
</style>