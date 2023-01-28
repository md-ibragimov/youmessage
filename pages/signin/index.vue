<template>
  <div :class="$style.container">
    <sign-in-form />

  </div>
</template>

<script>
import PocketBase from "pocketbase";
import SignInForm from "~/components/signin-form.vue";
import { useUserInfo } from "~/store/user";

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
  data() {
    return {
      loginForm: {
        loginOrEmail: null,
        password: null,
      },
      user: useUserInfo(),
    };
  },
  methods: {
    handleLogin() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      pb.collection("users")
        .authWithPassword(this.loginForm.loginOrEmail, this.loginForm.password)
        .then(() => {
          this.user.handleAuth(true);
          navigateTo("/");
        });
    },
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