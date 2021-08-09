<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script lang="ts">
import Footer from './components/footer.vue';
import Header from './components/header.vue';

export default {
  name: 'App',
  components: { Footer, Header },
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
  grid-template-rows: minmax(0.5rem, 1fr) min-content minmax(0.5rem, 1fr);
}
</style>
