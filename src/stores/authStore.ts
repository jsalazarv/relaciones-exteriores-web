import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: {
      isAuthenticated: Cookies.get('token') ? true : false,
    },
  }),
  actions: {
    setSessionState(session: boolean) {
      this.session.isAuthenticated = session;
    },
  },
  getters: {
    isAuthenticated: (state) => {
      return !!state.session.isAuthenticated;
    },
  },
});
