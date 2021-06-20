<template>
	<form @submit.prevent="procesarFormulario" class="input-group my-2">
		<input
			type="text"
			class="form-control"
			v-model="text"
			placeholder="Ingrese Todo"
		/>
		<button
			class="btn btn-outline-dark"
			type="sumbit"
			:disabled="!text.trim()"
		>
			Agregar
		</button>
	</form>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const text = ref("");
		const store = useStore();

		const procesarFormulario = () => {
			store.dispatch("moduleTodo/addTodo", text.value);
			text.value = "";
		};

		return {
			text,
			procesarFormulario,
		};
	},
};
</script>