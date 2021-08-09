<template>
  <footer class="grid w-full">
    <section
      class="col-start-2 flex flex-col items-center justify-center row-start-2 w-full"
    >
      <Nav dividers :slim="false" />
      <ul class="flex flex-wrap items-center justify-center list-none my-2">
        <li class="m-0">
          <p class="text-sm">&copy; 2017-{{ copyYear }} Juan Villela</p>
        </li>
        <li class="mx-2 my-0">
          <p class="text-meta text-sm" aria-hidden="true">~</p>
        </li>
        <li class="m-0">
          <a
            class="text-sm"
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
