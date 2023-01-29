<template>
  <div>
    Hello
    {{
      !store.user.username
        ? "Loading..."
        : `${store.user.firstName} ${store.user.lastName}`
    }}
    !
  </div>
  <button @click="store.signOut()">Sign Out</button>
</template>

<script>
import PocketBase from "pocketbase";
import { toggle } from "~/mixins/userRedirect";
import { useUserInfo } from "~/store/user";

export default {
  mixins: [toggle],
  data() {
    return {
      store: useUserInfo(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      if(!pb.authStore.isValid) navigateTo('/')
      pb.collection("users")
        .getOne(this.$route.params.id)
        .then(response => {
          this.store.setUser(response)
        })
    });
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>