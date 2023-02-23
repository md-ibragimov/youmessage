<template>
  <div :class="$style.container"></div>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  data() {
    return {
      allMessage: null,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      useHead({ title: "Messages" });
      const mess = await this.getAllChats();
      console.log(mess);
    });
  },
  methods: {
    getAllChats() {
      try {
        const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
        return pb.collection("chats").getFullList(1000, {
          sort: "created",
          expand: "users",
          filter: `users ~ '${pb.authStore.model.id}'`,
        });
      } catch {
        console.error;
      }
    },
    handleArray(array) {
      return array.map((el) => {
        return el.expand.users.filter((el) => {
          if (el.id !== pb.authStore.model.id) {
            return el;
          }
        })[0];
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
  @media (max-width: 750px) {
    width: 98%;
  }
}
</style>