<template>
  <q-card class="q-pa-md my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Iniciar sesión</div>
      <div class="text-grey-8">
        Inicia sesión a continuación para acceder a tu cuenta
      </div>
    </q-card-section>
    <q-card-section>
      <q-input dense outlined v-model="email" label="Correo electrónico" />
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="password"
        type="password"
        label="Contraseña"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        style="border-radius: 8px"
        color="dark"
        rounded
        size="md"
        label="INICIAR SESIÓN"
        no-caps
        class="full-width"
      ></q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
