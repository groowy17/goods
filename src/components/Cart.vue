<template>
  <div class="cart">
    <h2 class="cart__header">Корзина</h2>
    <div v-if="!itemsFromCart.length" class="cart__empty">
      Корзина пуста
    </div>
    <div v-else class="cart__list">
      <div class="cart__item" v-for="item in itemsFromCart" :key="item.id">
        <div class="cart__name">{{ item.name }}</div>
        <div class="cart__count">
          <input
            class="cart__input"
            type="number"
            :value="item.count"
            @change="
              handlerChange({
                id: item.id,
                count: parseInt($event.target.value)
              })
            "
          />
        </div>
        <div class="cart__price">
          {{ priceInRubles(item.price, rate) }} руб.&nbsp;
          <span class="cart__desc">/&nbsp;шт.</span>
        </div>
        <div class="cart__buttons">
          <button class="cart__button" @click="removeFromCart(item)">
            &times;
          </button>
        </div>
      </div>
      <div class="cart__total">
        <span class="cart__text">Общая стоимость: </span>
        <span
          :class="{
            cart__total_up: priceUp && oldRate !== 0,
            cart__total_down: priceDown
          }"
        >
          {{ priceInRubles(totalPriceCart, rate) }}&nbsp;руб.
        </span>
      </div>
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
  &__item {
    display: flex;
    flex-flow: row nowrap;
    padding: 10px;
    margin-bottom: 15px;
    align-items: center;
    background-color: #fff;
  }

  &__name {
    width: 50%;
    padding-right: 5px;
    font-size: 0.8em;
  }

  &__count {
    width: 10%;
    padding: 0 5px;
    text-align: center;
  }

  &__input {
    display: inline-block;
    padding: 5px 0 5px 10px;
    width: 35px;
  }

  &__price {
    width: 30%;
    text-align: center;
  }

  &__desc {
    font-size: 0.8em;
    color: #dbdbdb;
  }

  &__buttons {
    width: 10%;
    text-align: right;
  }

  &__button {
    border: 0;
    background-color: tomato;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }

  &__total {
    text-align: right;

    &_up {
      color: tomato;
    }

    &_down {
      color: forestgreen;
    }
  }

  @media screen and (max-width: 600px) {
    &__item {
      display: block;
    }

    &__name {
      width: 100%;
      padding-right: 0;
      padding-bottom: 15px;
    }

    &__count {
      width: 100%;
      text-align: left;
      padding-bottom: 10px;
    }

    &__price {
      width: 100%;
      text-align: left;
    }

    &__buttons {
      text-align: right;
      width: 100%;
    }
  }
}
</style>
