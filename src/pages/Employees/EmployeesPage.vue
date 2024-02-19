<template>
  <q-page class="row items-center justify-evenly">
    <ul>
      <li v-for="employee in data?.data" :key="employee?.id">
        {{ employee?.name }} {{ employee?.last_name }}
      </li>
    </ul>
  </q-page>
</template>

<script setup lang="ts">
import { useEmployee } from 'src/composables/useEmployee';

const { data } = useEmployee();
</script>
