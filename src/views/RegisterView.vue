<template>
  <form @submit.prevent="handleSubmit()">
    <input v-model="login" type="text" required placeholder="identifiant">
    <input v-model="password" type="text" required placeholder="mot de passe">
    <button>Connexion</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      login: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await createUserWithEmailAndPassword(auth, this.login, this.password);
        
        if (!res) {
          throw new Error('Arg! Il y a un pépin.');
        }
        
        this.error = null;
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>

<style>

</style>