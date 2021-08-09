<template>
  <header class="bg-background-dark grid w-full">
    <section
      class="col-start-2 flex items-center justify-between row-start-2 w-full"
    >
      <router-link
        to="/"
        class="focus:text-secondary font-bold font-parkly hover:no-underline hover:text-secondary text-lg text-primary"
      >
        Juan Villela
      </router-link>
      <Nav :dividers="false" slim />
    </section>
  </header>
</template>

<script lang="ts">
import Nav from './nav.vue';

export default {
  name: 'Header',
  components: { Nav },
};
</script>
