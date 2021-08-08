<template>
  <footer class="flex flex-col items-center justify-center w-full">
    <section class="my-2 w-full">
      <ul class="flex flex-wrap items-center justify-center list-none">
        <li class="m-0">
          <router-link to="/about">About</router-link>
        </li>
        <li class="mx-2 my-0">
          <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
        </li>
        <li class="m-0">
          <router-link to="/uses">Uses</router-link>
        </li>
        <li class="mx-2 my-0">
          <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
        </li>
        <li class="m-0">
          <router-link to="/archive">Archive</router-link>
        </li>
        <li class="mx-2 my-0">
          <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
        </li>
        <li class="m-0">
          <router-link to="/lists">Lists</router-link>
        </li>
        <li class="mx-2 my-0">
          <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
        </li>
        <li class="m-0">
          <a href="/rss">RSS</a>
        </li>
      </ul>
    </section>
    <section class="my-2 w-full">
      <ul class="flex flex-wrap items-center justify-center list-none">
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

const date = new Date();

export default {
  name: 'Footer',
  data: () => ({ copyYear: getYear(date) }),
};
</script>
