<template>
  <div class="product">
    <div class="product__name">
      {{ product.name }}
      <span class="product__count">({{ product.count }})</span>
    </div>
    <div class="product__price">{{ priceInRubles }}</div>
    <div class="product__buttons">
      <button @click="addToCard(product)" class="product__button">Add</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getPriceInRubles } from "../utils";

export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState(["rate"]),
    priceInRubles() {
      return getPriceInRubles(this.product.price, this.rate);
    }
  },
  methods: {
    ...mapActions(["addToCard"])
  }
};
</script>

<style lang="scss">
.product {
  width: 250px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;

  &__count {
    margin: 0 3px;
  }
}
</style>
