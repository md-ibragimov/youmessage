<template>
  <div class="container">
    <signup-form />
    <!-- <h1>Создание пользователя</h1>
    <form @submit.prevent="submit" class="form">
      <input
        v-model="newUser.email"
        required
        type="email"
        placeholder="email"
      />
      <input
        v-model="newUser.username"
        required
        type="text"
        placeholder="username"
      />
      <input
        v-model="newUser.password"
        required
        type="password"
        placeholder="password"
      />
      <input
        v-model="newUser.passwordConfirm"
        required
        type="password"
        placeholder="repeat password"
      />
      <input @change="handleFile" type="file" />
      <input type="submit" />
    </form> -->
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import signupForm from "~~/components/signup-form.vue";

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
  data() {
    return {
      newUser: {
        email: null,
        username: null,
        password: null,
        passwordConfirm: null,
        avatar: null,
      },
    };
  },
  methods: {
    submit(e) {
      const pb = new PocketBase("https://test-database.pockethost.io");
      const formData = new FormData();
      for (let i in this.newUser) {
        formData.append(i, this.newUser[i]);
      }
      pb.collection("users")
        .create(formData)
        .then(() => {
          pb.collection("users")
            .authWithPassword(this.newUser.email, this.newUser.password)
            .then((resp) => {
              console.log(resp);
              navigateTo(`users/${pb.authStore.model.id}`);
            });
        });
    },
    handleFile(event) {
      this.newUser.avatar = event.target.files[0];
      console.log(this.newUser.avatar);
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
    margin-top: 40px;
  }
}
</style>