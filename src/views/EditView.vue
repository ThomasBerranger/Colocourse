<template>
  <div class="product-container">
    <Product :product="{id: id, name: name, imageLink: imageLink, currentQuantity: currentQuantity, maxQuantity: maxQuantity}"/>
  </div>
  <form @submit.prevent="handleSubmit()">
    <label for="name">Nom</label>
    <input v-model="name" type="text" name="name" autocomplete="off" />
    <label for="image-link">Lien vers image</label>
    <input v-model="imageLink" type="image-link" autocomplete="off" />
    <label for="maxQuantity">Quantité maximale</label>
    <input v-model="maxQuantity" type="number" name="maxQuantity">
    <label for="currentQuantity">Quantité actuelle</label>
    <input v-model="currentQuantity" type="number" name="currentQuantity">
    <button>Modifier</button>
    <button @click="handleDelete()" type="button">Supprimer</button>
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
</style>