<template>
  <header :class="$style.header">
    <NuxtLink :class="$style['logo-wrapper']" to="/">
      <div :class="$style.logo"></div>
    </NuxtLink>
    <nav :class="$style.navigation">
      <NuxtLink title="All users" to="/users" :class="$style.users"></NuxtLink>
      <NuxtLink
        title="messages"
        to="/messages"
        :class="$style.messages"
      ></NuxtLink>
      <button title="Sign out" @click="signOut" :class="$style.signout"></button>
      <input type="text" placeholder="Search users" :class="$style.search" />
    </nav>
  </header>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  methods: {
    signOut() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      pb.authStore.clear();
      navigateTo("/signin");
    },
  },
};
</script>

<style module lang="scss">
.header {
  width: 100%;
  height: 3em;
  position: sticky;
  top: 0px;
  background-color: rgb(216, 216, 216);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  .logo-wrapper {
    width: max-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    .logo {
      width: 3em;
      height: 100%;
      background: url("~/assets/logo.svg") no-repeat no-repeat center;
      background-size: contain;
    }
  }
  .navigation {
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 1em;
    .users {
      width: 2em;
      height: 2em;
      background: url("~/assets/users.svg") no-repeat no-repeat center;
      background-size: 80%;
      transition: 0.25s;
      &:hover {
        background-color: rgb(175, 175, 175);
      }
    }
    .signout {
      width: 1.7em;
      height: 1.7em;
      background: url("~/assets/signout.svg") no-repeat no-repeat center;
      background-size: 90%;
      transition: 0.25s;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: rgb(175, 175, 175);
      }
    }
    .messages {
      width: 2em;
      height: 2em;
      background: url("~/assets/message.svg") no-repeat no-repeat center;
      background-size: 90%;
      transition: 0.25s;
      &:hover {
        background-color: rgb(175, 175, 175);
      }
    }
    .search {
      width: 130px;
      border: none;
      border-radius: 1em;
      padding: 0.5em;
      outline: none;
      transition: 0.2s;
      &:focus {
        width: 300px;
        border: 2px solid teal;
        &::placeholder {
          color: rgba($color: #000000, $alpha: 0);
        }
      }
      &::placeholder {
        text-align: center;
      }
    }
  }
}
</style>