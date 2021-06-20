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
	<form @submit.prevent="procesarFormulario" v-if="todo">
		<pre>todo: {{ todo }}</pre>
		<input type="text" class="form-control my-2" v-model="todo.text" />
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				id="flexSwitchCheckDefault"
				v-model="todo.done"
			/>
			<label class="form-check-label" for="flexSwitchCheckDefault">{{
				todo.done
			}}</label>
		</div>
		<button class="btn btn-warning me-2" type="submit">
			Guardar cambios
		</button>
		<router-link class="btn btn-info" to="/">Volver</router-link>
	</form>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
export default {
	setup() {
		const route = useRoute();
		const store = useStore();
		const todo = ref({});

		const errors = computed(() => store.state.moduleTodo.errors);

		onMounted(async () => {
			todo.value = await store.dispatch(
				"moduleTodo/fetchTodo",
				route.params.id
			);
			console.log("todo.value", todo.value);
		});

		const procesarFormulario = () => {
			store.dispatch("moduleTodo/editTodo", todo.value);
		};

		return {
			todo,
			errors,
			procesarFormulario,
		};
	},
};
</script>