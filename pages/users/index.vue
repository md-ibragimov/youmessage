<template>
  <div :class="$style.container">
    <ClipLoader v-if="isLoading" />
    <div v-else :class="$style.content">
      <user-item :data="item" :key="item.id" v-for="item in users" />
    </div>
    <custom-paginate :getUsers="getUsers" :pageCount="pageCount" />
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import CustomPaginate from "~/components/CustomPagination.vue";
import UserItem from "~/components/UserItem.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  components: { CustomPaginate, UserItem, ClipLoader },
  data() {
    return {
      isLoading: false,
      users: [],
      pageCount: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      useHead({title: "YouMessage"})
      this.getUsers(1);
    });
  },
  methods: {
    getUsers(num) {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      this.isLoading = true;
      pb.collection("users")
        .getList(1, 15, {
          page: num,
        })
        .then((response) => {
          this.isLoading = false;
          this.pageCount = response.totalPages;
          this.users = response.items;
        });
    },
  },
};
</script>

<style module lang="scss">
.container {
  width: 750px;
  height: calc(100% - 3em);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2em 0;
  @media (max-width: 750px) {
    width: 98%;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>