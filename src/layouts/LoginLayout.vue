<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useAuth } from 'src/composables/useAuth';
import { useRouter } from 'vue-router';

const { verifyAuthentication } = useAuth();
const router = useRouter();

onBeforeMount(async () => {
  const result = await verifyAuthentication();

  if (result) {
    router.replace({ name: 'dashboard' });
  }
});
</script>
