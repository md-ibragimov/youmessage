<template>
  <div :class="$style.container">
    <img :src="avatarUrl" :class="$style.avatar" />
    <div :class="$style['user-info']">
      <span :class="$style.name">{{ data.firstName }} {{ data.lastName }}</span>
      <a :class="$style.message" href="#">Send message</a>
    </div>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
export default {
  props: ["data"],
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      const url = `${pb.baseUrl}/api/files/users/${this.data.id}/${this.data.avatar}?thumb=100x100`;
      console.log(this.data);
      this.avatarUrl = url;
    });
  },
  data() {
    return {
      avatarUrl: "",
    };
  },
};
</script>

<style module lang="scss">
.container {
  width: 100%;
  height: 5em;
  display: flex;
  gap: 10px;
  .avatar {
    width: 5em;
    height: 100%;
    border-radius: 50%;
  }
  .user-info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .name {
      font-weight: 600;
      font-size: 1.1em;
    }
    .message {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>