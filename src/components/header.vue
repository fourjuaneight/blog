<script lang="ts">
import Nav from './nav.vue';

export default {
  name: 'Header',
  components: { Nav },
};
</script>

<template>
  <header
    class="bg-background-dark border-0 border-b border-solid border-tertiary grid w-full"
  >
    <section
      class="col-start-2 flex items-center justify-between row-start-2 w-full"
    >
      <router-link
        to="/"
        class="focus:no-underline focus:text-secondary font-bold font-captainEdward hover:no-underline hover:text-secondary text-xl text-primary"
      >
        Juan Villela
      </router-link>
      <Nav :dividers="false" slim />
    </section>
  </header>
</template>
