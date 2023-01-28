<template>
  <div>Hello {{ !userInfo ? "Loading..." : userInfo.username }} !</div>
  <input @change="handleAvatar" type="file" />
  <button @click="signOut">Sign Out</button>
</template>

<script>
import PocketBase from "pocketbase";
import { toggle } from "~/mixins/userRedirect";

export default {
  mixins: [toggle],
  data() {
    return {
      userInfo: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      pb.collection("users")
        .getOne(this.$route.params.id)
        .then((response) => {
          this.userInfo = response;
        });
    });
  },
  methods: {
    signOut() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      pb.authStore.clear();
      navigateTo("/signin");
    },
    handleAvatar(event) {
      const formData = new FormData();
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      console.log(event.target.files[0]);
      formData.append("avatar", event.target.files[0]);
      pb.collection("users").update(this.userInfo.id, formData).then(data => {
        console.log(data)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>