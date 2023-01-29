import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

export const useUserInfo = defineStore('userData', {
  state: () => ({
    user: {}
  }),
  actions: {
    setUser(data) {
      this.user = data;
    },
    signOut() {
      const pb = new PocketBase(useRuntimeConfig().public.DATABASE_URL);
      this.user = {}
      pb.authStore.clear();
      navigateTo("/signin");
    }
  }
})