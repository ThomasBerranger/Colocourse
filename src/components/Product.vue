<template>
  <router-link :to="{ name: 'edit', params: { id: product.id } }">
    
    <div :class="'pie-wrapper progress-'+quantityPercentage">
      <img class="img" :src="product.imageLink" :alt="product.name">
      <div class="pie">
        <div class="left-side half-circle"></div>
        <div class="right-side half-circle"></div>
      </div>
      <div class="shadow"></div>
    </div>
    
    <div class="pie-label">
      <p>{{ product.name }}</p>
    </div>
    
  </router-link>
  
  <div class="button-container" v-if="display == 'edition'">
    <button @click="changeQuantity(product, product.currentQuantity + 1)"><i class="fa-solid fa-plus"></i></button>
    <button @click="changeQuantity(product, product.currentQuantity - 1)"><i class="fa-solid fa-minus"></i></button>
  </div>
</template>

<script>
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default {
  name: 'Product',
  props: {
    product: Object,
    display: String
  },
  computed: {
    quantityPercentage() {
      return Math.round((this.product.currentQuantity / this.product.maxQuantity) * 100);
    }
  },
  methods: {
    async changeQuantity(product, changedCurrentQuantity) {
      if (changedCurrentQuantity >= 0 && changedCurrentQuantity <= product.maxQuantity) {
        const productToEdit = doc(db, 'products', product.id);

        await updateDoc(productToEdit, { currentQuantity: changedCurrentQuantity });

        product.currentQuantity = changedCurrentQuantity;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #8E8D8A;
}

div.pie-wrapper div {
  box-sizing: border-box;
}

.pie-wrapper {
  height: 1em;
  width: 1em;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  
  .products-container-2 > a > & {
    left: 40%;
  }
  
  .pie {
    height: 100%;
    width: 100%;
    clip: rect(0, 1em, 1em, 0.5em);
    left: 0;
    position: absolute;
    top: 0;
    
    .half-circle {
      height: 100%;
      width: 100%;
      border: (0.1em) solid #3498db;
      border-radius: 50%;
      clip: rect(0, 0.5em, 1em, 0);
      left: 0;
      position: absolute;
      top: 0;
    }
  }
  
  .shadow {
    height: 100%;
    width: 100%;
    border: 0.1em solid #fc5c65;
    border-radius: 50%;
  }
  
  @for $i from 1 through 100 { 
    &.progress-#{$i} {      
      .pie {
        .half-circle {
          border-color: rgb(111, 179, 97);
        }
        
        .left-side {
          transform: rotate($i * 3.6deg);
        }
        
        @if $i <= 50 {
          .right-side {
            display: none;
          }
        } @else {
          clip: rect(auto, auto, auto, auto);
          
          .right-side {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}

.img {
  z-index: -1;
  position: absolute;
  height: 65px;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

div.pie-label {
  text-align: center;
  font-size: 20px;

  .products-container-2 >a > & {
    width: 85%;
  }
  
  & > p {
    margin: 10px 0;
  }
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  padding: 15px 0 40px 0;

  & > button {
    background-color:  #D8C3A5;
    border: none;
    border-radius: 3px;
    height: 40px;
    
    & > i {
      color: #593712;
    }
  }
}
</style>