<template>
  <div class="product">
    <div class="product__name">
      {{ product.name }}
    </div>
    <div class="product__price">{{ priceInRubles }} р.</div>
    <div class="product__count">
      {{ product.count }}
    </div>
    <div class="product__footer">
      <button @click="addToCard(product)" class="product__button">
        В корзину
      </button>
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
  display: flex;
  background-color: #fff;
  margin: 0 0 15px 0;
  padding: 10px;
  align-items: center;
  flex-flow: row nowrap;

  &__name {
    width: 50%;
    font-size: 0.8rem;
    padding-right: 10px;
  }

  &__count {
    width: 10%;
    text-align: center;
  }

  &__price {
    width: 20%;
    text-align: center;
  }

  &__footer {
    text-align: right;
    width: 20%;
  }

  &__button {
    cursor: pointer;
    border: 2px solid #333;
    padding: 5px 10px;
    font-size: 0.8em;
    font-weight: 500;

    &:hover,
    &:focus {
      background-color: #ffd93e;
      transition: all 0.3s;
    }
  }

  @media screen and (max-width: 600px) {
    display: block;

    &__name {
      width: 100%;
      padding-right: 0;
      padding-bottom: 15px;
    }

    &__count {
      width: 100%;
      text-align: right;
      padding-bottom: 10px;
    }

    &__price {
      width: 100%;
      text-align: left;
    }

    &__footer {
      text-align: right;
      width: 100%;
    }
  }
}
</style>
