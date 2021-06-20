<template>
	<h1 class="text-center mt-5 text-info">Login</h1>
	<form class="row" @submit.prevent="procesarFormulario">
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese Email"
				v-model="email"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese Password"
				v-model="password"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<button
				class="btn btn-info me-2"
				type="submit"
				:disabled="
					!email.trim() || !password.trim() || password.length < 6
				"
			>
				Acceder
			</button>
			<router-link to="/signup" class="btn btn-outline-dark"
				>¿No tienes cuenta?</router-link
			>
		</div>
		<div class="col-md-6 offset-md-3 mt-3" v-if="errors">
			<div
				class="alert alert-danger"
				v-for="(error, index) in errors"
				:key="index"
			>
				{{ error.msg }}
			</div>
		</div>
	</form>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();
		const email = ref("bluuweb@prueba.com");
		const password = ref("123123");

		const errors = computed(() => store.state.moduleAuth.errors);

		const procesarFormulario = async () => {
			await store.dispatch("moduleAuth/acceder", {
				path: "/login",
				form: {
					email: email.value,
					password: password.value,
				},
			});
		};

		return {
			procesarFormulario,
			email,
			password,
			errors,
		};
	},
};
</script>