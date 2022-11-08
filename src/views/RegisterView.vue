<template>
  <form @submit.prevent="handleSubmit()">
    <h1>Inscription</h1>
    <div>
      <label>Email</label>
      <input v-model="login" type="text" required>
    </div>
    <div>
      <label>Mot de passe</label>
      <input v-model="password" type="password" required>
    </div>
    <button>Créer le compte</button>
    <p v-if="error">{{ error }}</p>
    <router-link to="/login">Se connecter</router-link>
  </form>
</template>

<script>
import { auth } from '@/firebase/config';
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
        
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
}
</script>

<style scoped>
form {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5vh 5vw;
  text-align: center;
}

h1 {
  text-align: center;
}

form > div {
  text-align: left;
  margin: 3vh 0;
}

input {
  border-color: #593712;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px;
}

button {
  width: 100%;
  color: white;
  background-color: #593712;
  border: none;
  border-radius: 2px;
  padding: 1.5vh 0;
  margin-bottom: 3vh;
}
</style>