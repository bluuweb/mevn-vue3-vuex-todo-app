<template>
	<div class="my-2 alert alert-dark">
		<p>{{ todo }}</p>
		<router-link class="btn btn-warning me-2" :to="`/edit/${todo._id}`"
			>Editar</router-link
		>
		<button class="btn btn-danger" @click="eliminar(todo._id)">
			Eliminar
		</button>
	</div>
</template>

<script>
import { useStore } from "vuex";
export default {
	props: ["todo"],
	setup() {
		const store = useStore();

		const eliminar = (id) => {
			store.dispatch("moduleTodo/removeTodo", id);
		};

		return {
			eliminar,
		};
	},
};
</script>