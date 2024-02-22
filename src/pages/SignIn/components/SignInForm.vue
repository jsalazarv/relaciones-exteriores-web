<template>
  <q-card class="q-pa-md my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Iniciar sesión</div>
      <div class="text-grey-8">
        Inicia sesión a continuación para acceder a tu cuenta
      </div>
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        outlined
        v-model="email"
        label="Correo electrónico"
        :disable="login.isPending.value"
      />
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="password"
        type="password"
        label="Contraseña"
        :disable="login.isPending.value"
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
        :loading="login.isPending.value"
        :disable="login.isPending.value"
        @click="onSubmit"
      ></q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSignIn } from 'src/composables/useAuth';
import { useRouter } from 'vue-router';

const { login } = useSignIn();
const router = useRouter();

const email = ref('');
const password = ref('');

const onSubmit = () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  login.mutate(formData, {
    onSuccess: () => {
      console.log('[LOGIN SUCCESS]');
      router.push({ name: 'dashboard' });
    },
    onError: (error) => {
      console.log('[LOGIN ERROR]', error);
      router.push({ name: 'login' });
    },
  });
};
</script>

<style>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
