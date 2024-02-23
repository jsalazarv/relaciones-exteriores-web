<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap"
        >
          <span class="q-ml-sm">Relaciones Exteriores</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.sm"
            round
            dense
            flat
            color="text-grey-7"
            icon="apps"
          >
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item-label header v-if="!$q.screen.gt.md"
            >Relaciones Exteriores</q-item-label
          >
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from 'src/composables/useAuth';
import { useAuthStore } from 'src/stores/authStore';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const { verifyAuthentication } = useAuth();
const authStore = useAuthStore();
const isAuthenticated = ref(false);
const leftDrawerOpen = ref(false);

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Dashboard',
    caption: 'Tablero de control',
    icon: 'dashboard',
    link: 'dashboard',
  },
  {
    title: 'Empleados',
    caption: 'Gestión de empleados',
    icon: 'groups',
    link: 'employees',
  },
];

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const setSessionState = async () => {
  const isAuthenticatedResponse = await verifyAuthentication();

  isAuthenticated.value = isAuthenticatedResponse;
  authStore.setSessionState(isAuthenticatedResponse);
};

onMounted(async () => {
  setSessionState();
});
</script>
