<script lang="ts">
export default {
  name: 'Nav',
  props: {
    dividers: {
      type: Boolean,
      required: true,
    },
    slim: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <ul
    class="auto-cols-min gap-x-3 grid grid-rows-1 items-center list-none"
    :class="slim ? 'm-0' : 'my-2'"
  >
    <li class="m-0 row-start-1">
      <router-link to="/about">About</router-link>
    </li>
    <li class="m-0 row-start-1" v-if="dividers">
      <p class="text-meta text-base" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0 row-start-1">
      <router-link to="/archive">Archive</router-link>
    </li>
    <li class="m-0 row-start-1" v-if="dividers">
      <p class="text-meta text-base" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0 row-start-1">
      <router-link to="/lists">Lists</router-link>
    </li>
    <li class="m-0 row-start-1" v-if="dividers">
      <p class="text-meta text-base" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0 row-start-1" v-if="!slim">
      <a href="/rss">RSS</a>
    </li>
  </ul>
</template>
