<template>
  <form @submit.prevent="submit" :class="$style['new-post']">
    <textarea
      v-model="input"
      rows="5"
      :class="$style.input"
      placeholder="Что нового ?"
    />
    <button
      v-if="!loading"
      :disabled="buttonDisabled"
      :class="$style.submit"
      type="submit"
    >
      Send post
    </button>
    <ClipLoader v-else :class="$style.loader" />
  </form>
</template>

<script>
import PocketBase from "pocketbase";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  props: ["posts"],
  components: { ClipLoader },
  data() {
    return {
      input: "",
      buttonDisabled: true,
      loading: false,
    };
  },
  watch: {
    input(value) {
      if (value.length) this.buttonDisabled = false;
      else this.buttonDisabled = true;
    },
  },
  methods: {
    submit() {
      this.loading = true;
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);

      pb.collection("allposts")
        .create({
          author: pb.authStore.model.id,
          post_content: {
            body: this.input,
          },
        })
        .then((response) => {
          console.log(response)
          pb.collection("users")
            .getOne(pb.authStore.model.id)
            .then((userInfo) => {
              pb.collection("users")
                .update(pb.authStore.model.id, {
                  posts: [...userInfo.posts, response.id],
                })
                .then(() => {
                  this.input = "";
                  this.loading = false;
                  this.$emit("pushPost", response);
                });
            });
        });
    },
  },
};
</script>

<style module lang="scss">
.new-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  .input {
    outline: none;
    resize: none;
    font-size: 1.1em;
    border: 2px solid teal;
    padding: 0.5em;
  }
  .submit {
    cursor: pointer;
    width: max-content;
    font-size: 1.2em;
    margin-left: auto;
    background: teal;
    border: none;
    color: #fff;
    padding: 0.3em;
    border-radius: 0.3em;
    &:hover {
      background: rgb(0, 100, 100);
    }
    &:disabled {
      background: gray;
      cursor: default;
    }
  }
  .loader {
    margin-left: auto;
  }
}
</style>