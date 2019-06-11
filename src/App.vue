<template>
  <div class="app">
    <div class="app__goods">
      <Box />
    </div>
    <div class="app__cart">
      <Cart />
    </div>
  </div>
</template>

<script>
import Box from "./components/Box";
import Cart from "./components/Cart";

export default {
  name: "app",
  components: {
    Box,
    Cart
  }
};
</script>

<style lang="scss">
body {
  background-color: #f2f2f2;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
}
.app {
  display: flex;
  flex-flow: row nowrap;

  &__goods {
    width: 50%;
    margin: 0 15px;
  }

  &__cart {
    width: 50%;
    margin-right: 15px;
  }

  @media screen and (max-width: 1024px) {
    display: block;

    &__cart,
    &__goods {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>
