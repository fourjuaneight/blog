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

<style>
header,
main,
footer {
  grid-template-columns: minmax(1rem, 1fr) minmax(18rem, 100rem) minmax(
      1rem,
      1fr
    );
}

header,
footer {
  grid-template-rows: minmax(1rem, 1fr) min-content minmax(1rem, 1fr);
}
</style>
