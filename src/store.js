import Vue from "vue";
import Vuex from "vuex";
import { names } from "./api/names";
import jsonData from "./api/data.json";
import { DEFAULT_RATE_CURRENCY } from "./utils/constants";
import { getRandomRate } from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rate: DEFAULT_RATE_CURRENCY,
    oldRate: 0,
    interval: "",
    groups: [],
    goods: [],
    cart: []
  },
  getters: {
    listGoods: state => id => {
      return state.goods.filter(item => item.group == id);
    },

    itemsFromCart: state => {
      return state.cart.map(item => {
        const product = state.goods.find(product => product.id === item.id);

        return {
          id: item.id,
          count: item.count,
          name: product.name,
          price: product.price
        };
      });
    },

    totalPriceCart: (state, getters) => {
      return getters.itemsFromCart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.count;
      }, 0);
    }
  },

  mutations: {
    updateRate(state) {
      state.rate = getRandomRate();
    },

    updateOldTotal(state) {
      state.oldRate = state.rate;
    },

    setGroups(state) {
      let groups = [];
      let dataGoods = jsonData.Value.Goods;
      let obj = {};

      for (let i = 0; i < dataGoods.length; i++) {
        let str = dataGoods[i].G;
        obj[str] = true;
      }

      let arr = Object.keys(obj);

      for (let i = 0; i < arr.length; i++) {
        groups.push({
          id: arr[i],
          name: names[arr[i]].G
        });
      }

      state.groups = groups;
    },

    setGoods(state) {
      let goods = [];
      let dataGoods = jsonData.Value.Goods;
      for (let i = 0; i < dataGoods.length; i++) {
        goods.push({
          id: dataGoods[i].T,
          price: dataGoods[i].C,
          group: dataGoods[i].G,
          count: dataGoods[i].P,
          name: names[dataGoods[i].G].B[dataGoods[i].T].N
        });
      }

      state.goods = goods;
    },

    addToCart(state, { id, productCount }) {
      state.cart.push({
        id,
        count: 1,
        productCount
      });
    },

    removeFromCart(state, { id }) {
      state.cart = state.cart.filter(item => item.id !== id);
    },

    incCartCount(state, id) {
      const cartItem = state.cart.find(item => item.id === id);
      cartItem.count++;
    },

    decProductCount(state, id) {
      const product = state.goods.find(item => item.id === id);
      product.count--;
    },

    changeCartCount(state, { id, count }) {
      const cartItem = state.cart.find(item => item.id === id);
      cartItem.count = count;
    },

    changeProductCount(state, { id, count }) {
      const product = state.goods.find(item => item.id === id);
      product.count = count;
    }
  },
  actions: {
    start({ commit, state }) {
      state.interval = setInterval(() => {
        commit("updateOldTotal");
        commit("updateRate");
      }, 15e3);
    },

    stop({ state }) {
      clearInterval(state.interval);
    },

    setGroups({ commit }) {
      commit("setGroups");
    },

    setGoods({ commit }) {
      commit("setGoods");
    },

    addToCard({ state, commit }, product) {
      if (product.count > 0) {
        const cartItem = state.cart.find(item => item.id === product.id);
        if (!cartItem) {
          commit("addToCart", { id: product.id, productCount: product.count });
        } else {
          commit("incCartCount", cartItem.id);
        }
        commit("decProductCount", product.id);
      }
    },

    changeCount({ state, commit }, { id, count }) {
      const cartItem = state.cart.find(item => item.id === id);
      if (cartItem.productCount >= count) {
        commit("changeCartCount", { id, count });
        commit("changeProductCount", {
          id,
          count: cartItem.productCount - count
        });
      } else {
        commit("changeCartCount", { id, count: cartItem.productCount });
        commit("changeProductCount", { id, count: 0 });
      }
    },

    removeFromCart({ state, commit }, cartItem) {
      const productFromCart = state.cart.find(item => item.id === cartItem.id);

      commit("removeFromCart", { id: cartItem.id });
      commit("changeProductCount", {
        id: cartItem.id,
        count: productFromCart.productCount
      });
    }
  }
});
