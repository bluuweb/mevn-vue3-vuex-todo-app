import router from "../router";

// const BASE_URL = "http://localhost:5000/api/todo";
const BASE_URL = "https://api-prueba-200.herokuapp.com/api/todo";
const moduleTodo = {
  namespaced: true,
  state: () => ({
    todos: [],
    errors: [],
  }),
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter((item) => item._id !== id);
    },
    editTodo(state, todo) {
      state.todos = state.todos.map((item) => {
        if (item._id === todo._id) {
          return todo;
        }
        return item;
      });
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    async addTodo({ commit }, text) {
      try {
        const res = await fetch(BASE_URL + "/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ text }),
        });
        const api = await res.json();
        console.log(api);
        if (api.errors) {
          return commit("setErrors", api.errors);
        }
        commit("addTodo", api.todo);
        commit("setErrors", null);
      } catch (error) {
        console.log(error);
      }
    },
    async editTodo({ commit }, todo) {
      try {
        const res = await fetch(BASE_URL + "/" + todo._id, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(todo),
        });
        const api = await res.json();
        console.log(api);
        if (api.errors) {
          return commit("setErrors", api.errors);
        }
        commit("editTodo", api.todoUpdate);
        commit("setErrors", null);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async getTodos({ commit }) {
      try {
        const res = await fetch(BASE_URL + "/", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const api = await res.json();
        if (api.errors) {
          return commit("setErrors", api.errors);
        }

        commit("setTodos", api.todos);
        commit("setErrors", null);
      } catch (error) {
        console.log(error);
      }
    },
    async removeTodo({ commit }, id) {
      try {
        const res = await fetch(BASE_URL + "/" + id, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const api = await res.json();
        if (api.errors) {
          return commit("setErrors", api.errors);
        }
        commit("removeTodo", id);
        commit("setErrors", null);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTodo({ commit }, id) {
      try {
        const res = await fetch(BASE_URL + "/id/" + id, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const api = await res.json();
        console.log(api);
        if (api.errors) {
          return commit("setErrors", api.errors);
        }

        commit("setErrors", null);
        return api.todo;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export { moduleTodo };
