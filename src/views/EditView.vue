<template>
  <div class="product-container">
    <Product :product="{id: id, name: name, imageLink: imageLink, currentQuantity: currentQuantity, maxQuantity: maxQuantity}"/>
  </div>
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
    <button class="edit-button">Modifier</button>
    <button class="delete-button" @click="handleDelete()" type="button"><i class="fa-solid fa-trash"></i></button>
  </form>
</template>

<script>
import Product from "@/components/Product";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default {
  name: "EditView",
  props: {
    id: String
  },
  components: { Product },
  data() {
    return {
      name: "",
      imageLink: "",
      maxQuantity: 0,
      currentQuantity: 0
    };
  },
  async mounted() {
    const docRef = doc(db, "products", this.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.name = docSnap.data().name;
      this.imageLink = docSnap.data().imageLink;
      this.maxQuantity = docSnap.data().maxQuantity;
      this.currentQuantity = docSnap.data().currentQuantity;
    }
    else {
      this.$router.push("/:catchAll(.*)");
    }
  },
  methods: {
    async handleSubmit() {
      const productToEdit = doc(db, "products", this.id);
      await updateDoc(productToEdit, {
        name: this.name,
        imageLink: this.imageLink,
        maxQuantity: this.maxQuantity,
        currentQuantity: this.currentQuantity,
      });
      this.$router.push("/");
    },
    async handleDelete() {
      await deleteDoc(doc(db, "products", this.id));
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  padding: 20px 0;
  display: grid;
  font-size: 7em;
  
  &:after {
    clear: both;
    content: '';
    display: table;
  }
}
form {
  text-align: center;
  padding-bottom: 4vh;
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
  background-color: #593712;
  border: none;
  border-radius: 5px;
  color: white;
  
  &.edit-button, &.delete-button {
    padding: 8px 15px;
  }
  &.edit-button {
    background-color: rgb(111, 179, 97);
  }
  &.delete-button {
    background-color: #fc5c65;
  }

  & > i {
    color: white;
  }
}
</style>