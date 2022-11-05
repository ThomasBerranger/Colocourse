<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a @click.prevent="handleLogout()" href="#">Déconnexion</a>
  </nav>
  <router-view/>
</template>

<script>
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export default {
  methods: {
    handleLogout() {
      signOut(auth);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
