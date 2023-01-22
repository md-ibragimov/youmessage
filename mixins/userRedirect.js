import PocketBase from "pocketbase";

export const toggle = {
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      if (!pb.authStore.isValid) {
        navigateTo('signin');
      }
    })
  },
}