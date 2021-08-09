<template>
  <ul
    class="flex flex-wrap items-center justify-center list-none"
    :class="slim ? 'm-0' : 'my-2'"
  >
    <li class="m-0">
      <router-link to="/about">About</router-link>
    </li>
    <li class="mx-2 my-0" v-if="dividers">
      <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0" v-if="!slim">
      <router-link to="/uses">Uses</router-link>
    </li>
    <li class="mx-2 my-0" v-if="dividers">
      <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0">
      <router-link to="/archive">Archive</router-link>
    </li>
    <li class="mx-2 my-0" v-if="dividers">
      <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0">
      <router-link to="/lists">Lists</router-link>
    </li>
    <li class="mx-2 my-0" v-if="dividers">
      <p class="text-meta text-xs" aria-hidden="true">&#8226;</p>
    </li>
    <li class="m-0" v-if="!slim">
      <a href="/rss">RSS</a>
    </li>
  </ul>
</template>

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
