<template>
  <div :class="$style.container"></div>
</template>

<script>
import PocketBase from "pocketbase";

export default {
  mounted() {
    this.$nextTick(() => {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      useHead({ title: "Messages" });
      pb.collection("users").subscribe(pb.authStore.model.id, (data) => {
        console.log(data.record)
      })
    });
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