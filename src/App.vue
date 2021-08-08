<template>
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script lang="ts">
import Footer from './components/footer.vue';

export default {
  name: 'App',
  components: { Footer },
};
</script>
