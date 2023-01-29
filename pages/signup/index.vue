<template>
  <div class="container">
    <signup-form />
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import signupForm from "~/components/signup-form.vue";

export default {
  components: { signupForm },
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

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>