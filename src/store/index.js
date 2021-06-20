import { createStore } from "vuex";
import { moduleAuth } from "./moduleAuth";
import { moduleTodo } from "./moduleTodo";

export default createStore({
  state: {},
  modules: {
    moduleAuth,
    moduleTodo,
  },
});
