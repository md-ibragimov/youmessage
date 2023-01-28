<template>
  <div :class="$style.container">
    <form @submit.prevent="submit" :class="$style.form">
      <h2>Sign Up</h2>
      <div v-if="count === 1" :class="$style.wrapper">
        <input
          :class="$style.input"
          v-model="newUser.email"
          type="email"
          placeholder="Email"
        />
        <input
          :class="$style.input"
          v-model="newUser.username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div v-if="count === 2" :class="$style.wrapper">
        <input
          :class="$style.input"
          v-model="newUser.firstName"
          type="text"
          placeholder="First Name"
        />
        <input
          :class="$style.input"
          v-model="newUser.lastName"
          type="text"
          placeholder="Last Name"
        />
      </div>
      <div v-if="count === 3" :class="$style.wrapper">
        <input
          :class="$style.input"
          v-model="newUser.password"
          type="password"
          placeholder="Password (from 8 characters)"
        />
        <input
          :class="$style.input"
          v-model="newUser.passwordConfirm"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div v-if="count === 4" :class="$style.wrapper">
        <h3>Upload your avatar</h3>
        <label
          :style="
            url && {
              background: `url(${url}) no-repeat no-repeat center`,
              backgroundSize: 'cover',
            }
          "
          :class="$style['avatar-load']"
        >
          <input
            @change="handleAvatar"
            type="file"
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
      <div :class="$style['nav-wrapper']">
        <button-vue :class="$style.navigate" @click="count--" v-if="count > 1">
          Back
        </button-vue>
        <button-vue v-if="count < 4" :class="$style.navigate" @click="count++">
          Next
        </button-vue>
        <button-vue
          :disabled="isValid"
          type="submit"
          v-if="count === 4 && !isLoading"
          :class="$style.navigate"
        >
          signUp
        </button-vue>
        <ClipLoader v-else-if="isLoading" />
      </div>
    </form>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import ButtonVue from "./ButtonVue.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
export default {
  components: { ButtonVue, ClipLoader },
  data() {
    return {
      url: "",
      isValid: true,
      isLoading: false,
      count: 1,
      newUser: {
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        password: null,
        passwordConfirm: null,
        avatar: null,
      },
    };
  },
  watch: {
    newUser: {
      handler(value) {
        if (
          value.email &&
          value.username &&
          value.firstName &&
          value.lastName &&
          value.password &&
          value.passwordConfirm &&
          value.avatar
        ) {
          if (
            value.email.trim().length &&
            value.username.trim().length &&
            value.firstName.trim().length &&
            value.lastName.trim().length &&
            value.password.trim().length &&
            value.passwordConfirm.trim().length
          ) {
            this.isValid = false;
          }
        } else {
          this.isValid = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    clearState() {
      this.url = "";
      this.isValid = true;
      this.isLoading = false;
      this.count = 1;
      this.newUser = {
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        password: null,
        passwordConfirm: null,
        avatar: null,
      };
    },
    submit() {
      const pb = new PocketBase("https://test-database.pockethost.io");
      this.isLoading = true;
      const formData = new FormData();
      for (let i in this.newUser) {
        formData.append(i, this.newUser[i]);
      }
      pb.collection("users")
        .create(formData)
        .then((response) => {
          pb.collection("users")
            .authWithPassword(this.newUser.email, this.newUser.password)
            .then(() => {
              this.clearState();
              navigateTo(`users/${pb.authStore.model.id}`);
            });
        })
        .catch((error) => {
          alert(error);
          this.clearState();
        });
    },
    handleAvatar(event) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (eventLoad) => {
        this.url = eventLoad.target.result;
      };
      this.newUser.avatar = event.target.files[0];
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
    .input {
      width: 100%;
      height: 3em;
      outline: none;
      border: 2px solid teal;
    }
    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      row-gap: 0.5em;
    }
    .avatar-load {
      width: 8em;
      height: 8em;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
      background: url("~/assets/upload.svg") teal no-repeat no-repeat center;
      background-size: 30%;
      cursor: pointer;
    }
    .nav-wrapper {
      width: auto;
      height: 2em;
      display: flex;
      justify-content: space-between;
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
  @media (max-width: 500px) {
    width: 100%;
  }
}
</style>