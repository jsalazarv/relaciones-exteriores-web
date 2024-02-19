<template>
  <q-item clickable tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
});

const router = useRouter();

const navigateTo = () => {
  if (props.link.startsWith('http')) {
    return window.open(props.link, '_blank');
  }
  router.push({ name: props.link });
};
</script>
