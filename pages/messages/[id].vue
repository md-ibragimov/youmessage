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
      <div :class="$style['message-content']">
        <ClipLoader v-if="!messages" :class="$style.loader" />
        <span v-else-if="!messages.length">No messages yet :)</span>
      </div>
      <div :class="$style['input-wrapper']">
        <form
          @submit.prevent="sendMessage"
          :class="$style['send-message-form']"
        >
          <input
            placeholder="write a message"
            type="text"
            :class="$style['message-area']"
            v-model="input"
          />
          <button :disabled="!input.length" type="submit" :class="$style.send">
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  components: { ClipLoader },
  methods: {
    sendMessage() {
      if (input.length) {
      }
    },
  },
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
          const url = `${
            useRuntimeConfig().public.DATABASE_URL
          }/api/files/users/${response.id}/${response.avatar}?thumb=80x80`;
          this.avatarUrl = url;
          useHead({ title: `${response.firstName} ${response.lastName}` });
          pb.collection("messages").getFirstListItem(``);
        })
        .catch(() => navigateTo("/messages"));
    });
  },
  data() {
    return {
      user: null,
      avatarUrl: null,
      input: "",
      messages: null,
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    .message-content {
      width: 100%;
      height: calc(100% - 6em);
      overflow-y: auto;
      .loader {
        margin-top: 5em;
      }
    }
    .input-wrapper {
      width: 100%;
      height: 3em;
      border-top: 2px solid teal;
      .send-message-form {
        width: 100%;
        height: 100%;
        display: flex;
        column-gap: 1em;
        padding: 0.25em 1em;
        justify-content: space-between;
        .message-area {
          width: 100%;
          outline: none;
          border: 2px solid teal;
          padding: 0 0.25em;
          font-size: 1.2em;
          font-weight: 600;
        }
        .send {
          background-color: #fff;
          border: 2px solid teal;
          cursor: pointer;
          &:hover {
            background-color: azure;
          }
        }
      }
    }
  }
  @media (max-width: 750px) {
    width: 98%;
  }
}
</style>