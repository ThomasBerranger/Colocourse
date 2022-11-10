<template>
  <div class="filter-container">
    <button>
      <i v-if="display === 'grid'" @click="display = 'edition'" class="fa-solid fa-plus-minus"></i>
      <i v-else @click="display = 'grid'" class="fa-solid fa-list"></i>
    </button>
    
    <button>
      <i v-if="sortBy === 'quantity' && reverse === false" @click="sortBy = 'quantity'; reverse = true" class="fa-solid fa-arrow-down-short-wide"></i>
      <i v-else-if="sortBy === 'quantity' && reverse === true" @click="sortBy = 'name'; reverse = false" class="fa-solid fa-arrow-down-wide-short"></i>
      <i v-else-if="sortBy === 'name' && reverse === false" @click="sortBy = 'name'; reverse = true" class="fa-solid fa-arrow-down-a-z"></i>
      <i v-else-if="sortBy === 'name' && reverse === true" @click="sortBy = 'quantity'; reverse = false" class="fa-solid fa-arrow-down-z-a"></i>
    </button>
  </div>
  <div :class="display === 'grid' ? 'products-container-3' : 'products-container-2'">
    <Product v-for="product in orderedProducts" :key="product.id" :product="product" :display="display"/>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../firebase/config";
import Product from '@/components/Product.vue';
import { sortByQuantity, sortByName } from '@/methods/sort'

export default {
  name: 'HomeView',
  components: {
    Product
  },
  data() {
    return {
      products: [],
      display: 'grid',
      sortBy: 'quantity',
      reverse: false
    };
  },
  computed: {
    orderedProducts() {
      if (this.sortBy === 'quantity') {
        return sortByQuantity(this.products, this.reverse);
      } else if (this.sortBy === 'name') {
        return sortByName(this.products, this.reverse);
      } else {
        return this.products;
      }
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
.filter-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  & > button {
    background-color: #826649;
    border: none;
    border-radius: 10px 15px 10px 15px;
    padding: 5px 10px 5px 10px;
    
    & > i {
      color: white;
    }
  }
}
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