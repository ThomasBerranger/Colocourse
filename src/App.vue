<template>
  <nav v-if="user">
    <router-link to="/"><button>Liste</button></router-link>
    <router-link to="/add"><button>Ajouter</button></router-link>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {  
    const auth = getAuth();
    
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.uid;
      }
    });
  }
}
</script>

<style lang="scss">
body {
  background-color: #EAE7DC;
}

.container {
  margin: 1vh;
  background-color: white;
  border-radius: 3px;
}

* {
  font-family: 'Comfortaa', cursive;
  color: #826649;
}

nav {
  text-align: center;
  margin: 2vh 0;
  
  & > a > button {
    background-color: #EAE7DC;
    color: #826649;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 0 10px;
    font-weight: bold;
  }
  
  & > a.router-link-active > button {
    background-color: #826649;
    color: white;
  }
}
</style>
