<template>
  <div class="cart">
    <pre>
      {{ itemsFromCart }}
    </pre>
    <div class="cart__item" v-for="item in itemsFromCart" :key="item.id">
      <div class="cart__name">{{ item.name }}</div>
      <div class="cart__count">
        <input
          class="cart__input"
          type="number"
          :value="item.count"
          @change="
            handlerChange({ id: item.id, count: parseInt($event.target.value) })
          "
        />
      </div>
      <div class="cart__price">{{ priceInRubles(item.price, rate) }}</div>
      <div class="cart__buttons">
        <button class="cart__button" @click="removeFromCart(item)">
          Удалить
        </button>
      </div>
    </div>
    <div
      class="cart__total"
      :class="{
        cart__total_up: priceUp,
        cart__total_down: priceDown
      }"
    >
      {{ priceInRubles(totalPriceCart, rate) }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getPriceInRubles } from "../utils";

export default {
  name: "Cart",
  computed: {
    ...mapState(["cart", "rate", "oldRate"]),
    ...mapGetters(["itemsFromCart", "totalPriceCart"]),
    priceUp() {
      return this.priceInRubles(this.totalPriceCart, this.rate) >
        this.priceInRubles(this.totalPriceCart, this.oldRate)
        ? true
        : false;
    },
    priceDown() {
      return this.priceInRubles(this.totalPriceCart, this.rate) <
        this.priceInRubles(this.totalPriceCart, this.oldRate)
        ? true
        : false;
    }
  },
  methods: {
    ...mapActions(["changeCount", "removeFromCart"]),
    handlerChange({ id, count }) {
      this.changeCount({ id, count });
      this.$forceUpdate();
    },
    priceInRubles(price, rate) {
      return getPriceInRubles(price, rate);
    }
  }
};
</script>

<style lang="scss">
.cart {
  &__total {
    &_up {
      color: tomato;
    }

    &_down {
      color: forestgreen;
    }
  }
}
</style>
