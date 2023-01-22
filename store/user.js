import { defineStore } from 'pinia';
import PocketBase from "pocketbase";

export const useUserInfo = defineStore('userData', {
  state: () => ({
    isAuth: false
  }),
  actions: {
    handleAuth(state) {
      this.isAuth = state;
    }
  }
})