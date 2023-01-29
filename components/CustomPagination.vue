<template>
  <paginate
    :page-count="pageCount"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :click-handler="getUsers"
  >
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
  components: { Paginate },
  props: ["pageCount", "getUsers"],
};
</script>

<style>
.pagination {
  width: max-content;
  height: 1.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  user-select: none;
}
.page-item {
  height: 100%;
  cursor: pointer;
  border: 1px solid;
  display: flex;
  align-items: center;
}
.page-link {
  display: block;
  width: max-auto;
  color: #000;
  padding: 0 0.5em;
}
.disabled {
  cursor: default;
}
.active {
  background-color: #000;
}
.active .page-link {
  color: #fff;
}
</style>