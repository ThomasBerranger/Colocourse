<template>
  <nav>
    <router-link to="/add">Ajouter</router-link> |
    <a @click.prevent="handleLogout()" href="#">Déconnexion</a>
  </nav>
  <br><br>
  <div class="charts-container">
    <Product v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<script>
import { auth } from '@/firebase/config';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../firebase/config";
import Product from '@/components/Product.vue';

export default {
  name: 'HomeView',
  components: {
    Product
  },
  data() {
    return {
      products: null
    };
  },
  methods: {
    handleLogout() {
      signOut(auth);
      
      this.$router.push('/login');
    }
  },
  async mounted() {  
    const auth = getAuth();
    let userUid = null;
    
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        userUid = user.uid;
      }
    });
    
    const querySnapshot = await getDocs(query(collection(db, "products"), where('userUid', '==', userUid)));
    
    this.products = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
  }
};
</script>

<style lang="scss" scoped>
.charts-container {
  display: grid;
  grid-template-columns: 33.3333% 33.3333% 33.3333%;
  font-size: 7em;
  
  &:after {
    clear: both;
    content: '';
    display: table;
  }
}
</style>