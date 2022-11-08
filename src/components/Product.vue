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

      <p class="pie-label">{{ product.name }}</p>

  </router-link>
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  computed: {
    quantityPercentage() {
      return Math.round((this.product.currentQuantity / this.product.maxQuantity) * 100);
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

p.pie-label {
  margin-top: 3px;
  text-align: center;
  font-size: 15px;
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
</style>