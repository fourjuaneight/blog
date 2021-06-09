<template>
  <footer>
    <section>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <router-link to="/uses">Uses</router-link>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <router-link to="/archive">Archive</router-link>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <router-link to="/lists">Lists</router-link>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <a href="/rss">RSS</a>
        </li>
      </ul>
    </section>
    <section>
      <ul>
        <li>
          <p>&copy; 2017-{{ copyYear }} Juan Villela</p>
        </li>
        <li>
          <p>&#8226;</p>
        </li>
        <li>
          <a
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

<style></style>
