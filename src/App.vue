<template>
  <div class="app">
    <Box />
    <Cart />
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
.app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
</style>
