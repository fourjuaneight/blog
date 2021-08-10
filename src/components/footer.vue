<script lang="ts">
import { getYear } from 'date-fns';

import Nav from './nav.vue';

const date = new Date();

export default {
  name: 'Footer',
  components: { Nav },
  data: () => ({ copyYear: getYear(date) }),
};
</script>

<template>
  <footer class="grid w-full">
    <section
      class="col-start-2 flex flex-col items-center justify-center row-start-2 w-full"
    >
      <Nav dividers :slim="false" />
      <ul
        class="auto-cols-auto gap-x-3 grid grid-rows-1 items-center list-none my-2"
      >
        <li class="m-0 row-start-1">
          <p class="text-base">&copy; 2017-{{ copyYear }} Juan Villela</p>
        </li>
        <li class="m-0 row-start-1">
          <p class="text-meta text-base" aria-hidden="true">~</p>
        </li>
        <li class="m-0 row-start-1">
          <a
            class="text-base"
            href="https://github.com/fourjuaneight/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </li>
      </ul>
    </section>
  </footer>
</template>
