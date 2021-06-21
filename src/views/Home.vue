<template>
	<div class="my-3" v-if="errors">
		<div
			class="alert alert-danger"
			v-for="(error, index) in errors"
			:key="index"
		>
			{{ error.msg }} 🤦‍♂️
		</div>
	</div>
	<AddTodo />
	<div class="my-2" v-if="user">
		<h4>TODOS: {{ user.name }}</h4>
		<Todo v-for="todo in todos" :key="todo._id" :todo="todo" />
	</div>
	<pre>
        user: {{ user }}
    </pre>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import AddTodo from "../components/AddTodo.vue";
import Todo from "../components/Todo.vue";

export default {
	components: { AddTodo, Todo },
	setup() {
		const store = useStore();

		const user = computed(() => store.state.moduleAuth.user);
		const todos = computed(() => store.state.moduleTodo.todos);
		const errors = computed(() => store.state.moduleTodo.errors);

		onMounted(() => store.dispatch("moduleTodo/getTodos"));

		return {
			user,
			todos,
			errors,
		};
	},
};
</script>