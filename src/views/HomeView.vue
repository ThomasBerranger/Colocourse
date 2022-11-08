<template>
  <nav>
    <router-link to="/add">Ajouter</router-link> |
    <a @click.prevent="handleLogout()" href="#">Déconnexion</a>
  </nav>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export default {
  name: 'HomeView',
  methods: {
    handleLogout() {
      signOut(auth);
      
      this.$router.push('/login');
    }
  }
};
</script>
