<template>
  <div :class="$style.container">
    <sign-in-form />
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import SignInForm from "~/components/signin-form.vue";

export default {
  components: { SignInForm },
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      if (pb.authStore.isValid) {
        navigateTo(`users/${pb.authStore.model.id}`);
      }
    });
  },
};
</script>

<style module lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>