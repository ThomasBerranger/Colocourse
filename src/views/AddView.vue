<template>
  <form @submit.prevent="handleSubmit()">
    <input v-model="name" class="large-input" type="text" name="name" autocomplete="off" placeholder="Nom" />
    <br>
    <br>
    <input v-model="imageLink" class="large-input" type="image-link" autocomplete="off" placeholder="Lien vers image"/>
    <br>
    <br>
    <label for="maxQuantity">Quantité maximale :</label>
    <div class="quantity-container">
      <button @click="maxQuantity -= 1" type="button"><i class="fa-solid fa-minus"></i></button>
      <input v-model="maxQuantity" class="small-input" type="number" name="maxQuantity">
      <button @click="maxQuantity += 1" type="button"><i class="fa-solid fa-plus"></i></button>
    </div>
    <br><br>
    <label for="currentQuantity">Quantité actuelle :</label>
    <div class="quantity-container">
      <button @click="currentQuantity -= 1" type="button"><i class="fa-solid fa-minus"></i></button>
      <input v-model="currentQuantity" class="small-input" type="number" name="currentQuantity">
      <button @click="currentQuantity += 1" type="button"><i class="fa-solid fa-plus"></i></button>
    </div>
    <br><br>
    <button class="add-button">Ajouter</button>
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

<style lang="scss" scoped>
form {
  text-align: center;
  padding: 4vh 0;
}
.quantity-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
input {
  padding: 5px;
  text-align: center;
  border-radius: 3px;
  border-top: none;
  border-right: none;
  border-left: none;
  &.large-input {
    width: 60%;
  }
  &.small-input {
    width: 20%;
  }
}
button {
  margin: 0 5px;
  padding: 0 5px;
  background-color: #826649;
  border: none;
  border-radius: 5px;
  color: white;
  
  &.add-button {
    padding: 8px 15px;
    background-color: rgb(111, 179, 97);
  }
  
  & > i {
    color: white;
  }
}
</style>