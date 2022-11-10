<template>
  <form @submit.prevent="handleSubmit()">
    <h1>Connexion</h1>
    <div>
      <label>Email</label>
      <input v-model="login" type="text" required>
    </div>
    <div>
      <label>Mot de passe</label>
      <input v-model="password" type="password" required>
    </div>
    <button>Connexion</button>
    <p v-if="error">{{ error }}</p>
    <router-link to="/register">Créer un compte</router-link>
  </form>
</template>

<script>
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  data() {
    return {
      login: '',
      password: '',
      error: null
    }
  },
  async beforeCreate() {  
    const auth = getAuth();
    
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.push('/');
      }
    });
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await signInWithEmailAndPassword(auth, this.login, this.password);
        
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
  border-color: #826649;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px;
}

button {
  width: 100%;
  color: white;
  background-color: #826649;
  border: none;
  border-radius: 2px;
  padding: 1.5vh 0;
  margin-bottom: 3vh;
}
</style>