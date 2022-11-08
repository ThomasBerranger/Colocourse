<template>
  <h1>Ajout de produit</h1>
  <router-link to="/">HOme</router-link>
  <form @submit.prevent="handleSubmit()">
    <label for="name">Nom</label>
    <input v-model="name" type="text" name="name" autocomplete="off" />
    <label for="image-link">Lien vers image</label>
    <input v-model="imageLink" type="image-link" autocomplete="off" />
    <label for="maxQuantity">Quantité maximale</label>
    <input v-model="maxQuantity" type="number" name="maxQuantity">
    <label for="currentQuantity">Quantité actuelle</label>
    <input v-model="currentQuantity" type="number" name="currentQuantity">
    <button>Ajouter</button>
  </form>
</template>

<script>
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      name: '',
      imageLink: '',
      maxQuantity: 0,
      currentQuantity: 0,
    };
  },
  methods: {
    async handleSubmit() {  
      const auth = getAuth();
      let userUid = null;

      await onAuthStateChanged(auth, (user) => {
        userUid = user.uid;
      });

      const product = {
        name: this.name,
        userUid: userUid,
        imageLink: this.imageLink,
        maxQuantity: this.maxQuantity,
        currentQuantity: this.currentQuantity,
      }
      
      await addDoc(collection(db, "products"), product);
      
      this.$router.push('/')
    },
  }
}
</script>

<style>

</style>