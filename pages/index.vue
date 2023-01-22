<template></template>
<script>
import PocketBase from "pocketbase";
import { toggle } from "~/mixins/userRedirect";

export default {
  mixins: [toggle],
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      if (pb.authStore.isValid) {
        navigateTo(`users/${pb.authStore.model.id}`);
      }
    });
  },
  methods: {
    signOut() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      pb.authStore.clear();
      navigateTo("signin");
    },
  },
};
</script>