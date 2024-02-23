import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: {
      isAuthenticated: false,
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
