<template>
  <div v-if="user" :class="$style.container">
    <div :class="$style.userinfo">
      <div :class="$style['user-wrapper']">
        <img :src="avatarUrl" alt="user avatar" :class="$style.avatar" />
        <span :class="$style.name"
          >{{ user.firstName }} {{ user.lastName }}</span
        >
        <div
          :class="$style.verification"
          title="user is verified"
          v-if="user.verified"
        ></div>
      </div>
      <div :class="$style['navigate-button']">
        <button>Send message</button>
        <button>Add to friends</button>
      </div>
      <div :class="$style.background" />
    </div>
    <div
      title="user bio"
      v-if="user.bio && user.bio.length"
      :class="$style.bio"
    >
      <div :class="$style['bio-icon']"></div>
      <span>{{ user.bio }}</span>
    </div>

    <new-post
      :posts="user.posts"
      v-if="authUser.id === this.$route.params.id"
      @pushPost="pushPost"
    />
    <div v-if="posts.length" :class="$style['posts-wrapper']">
      <h2>Posts:</h2>
      <post-item :data="post" :key="post.id" v-for="post in posts" />
    </div>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import PostItem from "~/components/PostItem.vue";
import NewPost from "~/components/NewPost.vue";
import moment from "moment";
import { toggle } from "~/mixins/userRedirect";

export default {
  mixins: [toggle],
  components: { PostItem, NewPost },
  watch: {
    posts: {
      handler() {
        this.posts = this.posts.sort((a, b) => {
          return moment(b.updated).diff(a.updated);
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      authUser: null,
      user: null,
      avatarUrl: "",
      posts: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      useHead({ title: "Loading..." });
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      this.authUser = pb.authStore.model;
      pb.collection("users")
        .getOne(this.$route.params.id)
        .then((response) => {
          useHead({ title: `${response.firstName} ${response.lastName}` });
          this.user = response;
          this.avatarUrl = `${
            useRuntimeConfig().public.DATABASE_URL
          }/api/files/users/${response.id}/${response.avatar}?thumb=100x100`;
          response.posts.forEach((element) => {
            pb.collection("allposts")
              .getOne(element)
              .then((resp) => {
                this.posts.push(resp);
              });
          });
        });
    });
  },
  methods: {
    pushPost(value) {
      this.posts.push(value);
      console.log(value, this.posts);
    },
  },
};
</script>

<style module lang="scss" >
.container {
  width: 750px;
  height: calc(100% - 3em);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
  @media (max-width: 750px) {
    width: 98%;
  }
  .userinfo {
    width: 100%;
    height: 10em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 1em 0.5em;
    .user-wrapper {
      width: auto;
      height: 100%;
      display: flex;
      align-items: flex-end;
      .avatar {
        width: 8em;
        height: 100%;
        border-radius: 50%;
        border: 4px solid rgb(216, 216, 216);
      }
      .name {
        font-size: 1.1em;
        font-weight: 600;
      }
      .verification {
        width: 1.1em;
        height: 1.1em;
        background: url("~/assets/verified.svg") no-repeat no-repeat center;
        background-size: contain;
        margin-left: 1em;
      }
    }

    .navigate-button {
      width: auto;
      height: 100%;
      display: flex;
      align-items: flex-end;
      gap: 0.5em;
    }
    .background {
      width: 100%;
      height: 50%;
      position: absolute;
      background-color: rgb(216, 216, 216);
      bottom: 0;
      right: 0;
      z-index: -1;
      border-radius: 1em;
    }
  }
  .bio {
    width: 100%;
    height: auto;
    background-color: rgb(216, 216, 216);
    padding: 1em;
    border-radius: 1em;
    .bio-icon {
      width: 1.2em;
      height: 1.2em;
      background: url("~/assets/info.svg") no-repeat no-repeat center;
      background-size: contain;
    }
  }
  .posts-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}
</style>