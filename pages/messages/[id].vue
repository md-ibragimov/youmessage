<template>
  <div :class="$style.container">
    <div v-if="user" :class="$style['message-window']">
      <div :class="$style.header">
        <NuxtLink :class="$style['back-link']" to="/messages">
          <div :class="$style.back"></div>
          <span :class="$style.textBack">Back</span>
        </NuxtLink>
        <NuxtLink :to="`/users/${user.id}`" :class="$style['user-info']">
          <span :class="$style.name"
            >{{ user.firstName }} {{ user.lastName }}</span
          >
          <img :src="avatarUrl" alt="user avatar" :class="$style.avatar" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      useHead({ title: "Loading..." });
      if (pb.authStore.model.id === this.$route.params.id) {
        navigateTo("/messages");
      }
      pb.collection("users")
        .getOne(this.$route.params.id)
        .then((response) => {
          this.user = response;
          console.log(response);
          const url = `${
            useRuntimeConfig().public.DATABASE_URL
          }/api/files/users/${response.id}/${response.avatar}?thumb=80x80`;
          this.avatarUrl = url;
          useHead({ title: `${response.firstName} ${response.lastName}` });
        })
        .catch(() => navigateTo("/messages"));
    });
  },
  data() {
    return {
      user: null,
      avatarUrl: null,
    };
  },
};
</script>

<style module lang="scss">
.container {
  width: 750px;
  height: calc(100% - 3em);
  margin: 0 auto;
  padding: 1em 0;
  .message-window {
    width: 100%;
    height: 100%;
    border: 2px solid teal;
    border-radius: 1em;
    overflow-y: auto;
    .header {
      width: 100%;
      height: 3em;
      display: flex;
      padding: 0.25em;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid teal;
      border-radius: 1em 1em 0 0;
      .back-link {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        column-gap: 0.5em;
        color: #000;
        text-decoration: none;
        padding: 0.25em;
        &:hover {
          text-decoration: underline;
        }
        .back {
          width: 1.5em;
          height: 1.5em;
          background: url("~/assets/back.svg") no-repeat no-repeat center;
          background-size: contain;
        }
        .textBack {
          font-weight: 600;
          font-size: 1.2em;
        }
      }
      .user-info {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        color: #000;
        text-decoration: none;
        column-gap: 1em;
        .name {
          font-size: 1.3em;
          font-weight: 600;
        }
        .avatar {
          width: auto;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  @media (max-width: 750px) {
    width: 98%;
  }
}
</style>