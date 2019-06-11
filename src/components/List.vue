<template>
  <div class="list">
    <h2 class="list__header">
      {{ name }}
    </h2>
    <div class="list__products">
      <Product
        v-for="product in listGoods"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from "./Product";

export default {
  name: "List",
  components: {
    Product
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    listGoods: {
      type: Array,
      default() {
        return [];
      }
    },
    idGroup: {
      type: String,
      default: null
    }
  }
};
</script>
