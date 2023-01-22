<template>
  <div class="container">
    <h1>Войдите</h1>
    <form @submit.prevent="handleLogin" class="form">
      <input
        v-model="loginForm.loginOrEmail"
        type="text"
        placeholder="Login | Email"
      />
      <input
        v-model="loginForm.password"
        type="password"
        placeholder="Password"
      />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import { useUserInfo } from "~/store/user";

export default {
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

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>