<template>
  <div :class="$style.container">
    <form @submit.prevent="submit" :class="$style.form">
      <h2>Sign In</h2>
      <div :class="$style.wrapper">
        <input
          v-model="form.emailOrLogin"
          :class="$style.input"
          autocapitalize="off"
          placeholder="Username or Email"
        />
        <input
          type="password"
          v-model="form.password"
          :class="$style.input"
          placeholder="Password"
        />
        <div :class="$style['nav-wrapper']">
          <NuxtLink to="/signup">Don't have an account? Sign Up!</NuxtLink>
          <button-vue
            :disabled="isValid"
            :class="$style.navigate"
            type="submit"
            v-if="!isLoading"
          >
            Sign In
          </button-vue>
          <ClipLoader v-else />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { useUserInfo } from "~/store/user";

export default {
  components: { ClipLoader },
  data() {
    return {
      store: useUserInfo(),
      isLoading: false,
      isValid: true,
      form: {
        emailOrLogin: "",
        password: "",
      },
    };
  },
  methods: {
    clearState() {
      this.form = {
        emailOrLogin: "",
        password: "",
      };
      this.isLoading = false;
    },
    submit() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      this.isLoading = true;
      pb.collection("users")
        .authWithPassword(this.form.emailOrLogin, this.form.password)
        .then((response) => {
          this.store.setUser(response.record);
          navigateTo(`users/${response.record.id}`);
          this.clearState();
        })
        .catch((error) => {
          alert("Data is incorrect");
          this.clearState();
        });
    },
  },
  watch: {
    form: {
      handler(value) {
        if (value.emailOrLogin.trim().length && value.password.trim().length) {
          this.isValid = false;
        } else {
          this.isValid = true;
        }
      },
      deep: true,
    },
  },
};
</script>

<style module lang="scss">
.container {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.5em;
  .form {
    width: 100%;
    height: 30em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid teal;
    padding: 5em 2em;
    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 0.5em;
      .input {
        width: 100%;
        height: 3em;
        outline: none;
        border: 2px solid teal;
      }
      .nav-wrapper {
        width: auto;
        height: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1em 0 0 auto;
        column-gap: 0.5em;
        .navigate {
          margin-left: auto;
          &:disabled {
            cursor: default;
          }
        }
      }
    }
  }
  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>