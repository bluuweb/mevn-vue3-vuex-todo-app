import router from "../router";
// const BASE_URL = "http://localhost:5000/api/user";
const BASE_URL = "https://api-prueba-200.herokuapp.com/api/user";
import jwt_decode from "jwt-decode";

const moduleAuth = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    errors: null,
  }),
  mutations: {
    setToken(state, payload) {
      if (payload) {
        const user = jwt_decode(payload);
        console.log("user", user);
        state.user = user;
        // localStorage.setItem("token", payload);
      } else {
        state.user = null;
      }
      state.token = payload;
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    async verificarToken({ dispatch, commit }) {
      try {
        const res = await fetch(BASE_URL + "/validar", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const token = await res.json();
        if (token.errors) {
          console.log(token.errors);
          dispatch("cerrarSesion");
          return false;
        } else {
          // console.log("token válido!");
          commit("setToken", localStorage.getItem("token"));
          return true;
        }
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
    async acceder({ commit, dispatch }, data) {
      try {
        const res = await fetch(BASE_URL + data.path, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data.form),
        });

        const user = await res.json();

        if (user.errors) {
          return commit("setErrors", user.errors);
        }

        // commit("setToken", user.token);
        // commit("setToken", "fasdfasdf");
        localStorage.setItem("token", user.token);
        commit("setErrors", null);
        router.push("/");
      } catch (error) {
        console.log("error", error);
        dispatch("cerrarSesion");
      }
    },
    cerrarSesion({ commit }) {
      localStorage.removeItem("token");
      commit("setToken", null);
      router.push("/login");
    },
  },
};

export { moduleAuth };
