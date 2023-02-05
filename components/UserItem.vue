<template>
  <div :class="$style.container">
    <NuxtLink :to="`/users/${data.id}`" :class="$style.name" target="_blank">
      <img width="80" height="80" :src="avatarUrl" :class="$style.avatar" />
    </NuxtLink>
    <div :class="$style['user-info']">
      <div :class="$style['name-wrapper']">
        <NuxtLink
          :to="`/users/${data.id}`"
          :class="$style.name"
          target="_blank"
        >
          {{ data.firstName }} {{ data.lastName }}
        </NuxtLink>
        <div
          v-if="data.verified"
          title="Verified user"
          :class="$style.verified"
        ></div>
      </div>
      <a :class="$style.message" href="#">Send message</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    this.$nextTick(() => {
      const url = `${useRuntimeConfig().public.DATABASE_URL}/api/files/users/${
        this.data.id
      }/${this.data.avatar}?thumb=80x80`;
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
    .name-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.5em;
      .verified {
        width: 1.2em;
        height: 1.2em;
        background: url("~/assets/verified.svg") no-repeat no-repeat center;
        background-size: contain;
        cursor: pointer;
      }
      .name {
        font-weight: 600;
        font-size: 1.1em;
        color: #000;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
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