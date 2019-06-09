<template>
  <div class="box">
    <List
      v-for="(item, index) in groups"
      :key="index"
      :name="item.name"
      :listGoods="getListGoods(item.id)"
      :idGroup="item.id"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import List from "./List";

export default {
  name: "Box",
  components: {
    List
  },
  computed: {
    ...mapState(["groups"])
  },
  methods: {
    ...mapActions(["start", "stop", "setGroups", "setGoods"]),

    getListGoods(id) {
      return this.$store.getters.listGoods(id);
    }
  },
  created() {
    this.setGroups();
    this.setGoods();
  },
  mounted() {
    this.start();
  },
  beforeDestroy() {
    this.stop();
  }
};
</script>
