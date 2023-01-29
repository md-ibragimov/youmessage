<template>
  <header :class="$style.header">
    <NuxtLink :class="$style['logo-wrapper']" to="/">
      <div :class="$style.logo"></div>
    </NuxtLink>
    <input type="text" placeholder="Search users" :class="$style.search" />
  </header>
</template>

<script>
export default {};
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
  .search {
    width: 130px;
    border: none;
    border-radius: 1em;
    padding: .5em;
    outline: none;
    transition: .2s;
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
</style>