<template>
  <nav>
    <router-link to="/add">Ajouter</router-link> |
    <a @click.prevent="handleLogout()" href="#">Déconnexion</a> |
    <i v-if="display === 'grid'" @click="display = 'edition'" class="fa-solid fa-plus-minus"></i>
    <i v-else @click="display = 'grid'" class="fa-solid fa-user"></i>
  </nav>
  <br><br>
  <div :class="display === 'grid' ? 'products-container-3' : 'products-container-2'">
    <Product v-for="product in products" :key="product.id" :product="product" :display="display"/>
  </div>
  <!-- <i class="fa-2x fa-solid fa-arrow-down-a-z"></i>
  <i class="fa-2x fa-solid fa-arrow-down-z-a"></i>
  <i class="fa-2x fa-solid fa-arrow-down-short-wide"></i>
  <i class="fa-2x fa-solid fa-arrow-down-wide-short"></i> -->
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
      products: null,
      display: 'grid'
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
.products-container{
  &-3 {
    display: grid;
    grid-template-columns: 33.3333% 33.3333% 33.3333%;
    font-size: 7em;
    
    &:after {
      clear: both;
      content: '';
      display: table;
    }
  }
  &-2 {
    display: grid;
    grid-template-columns: 45% 5% 45% 5%;
    font-size: 7em;
    
    &:after {
      clear: both;
      content: '';
      display: table;
    }
  }
}
</style>