<template>
	<h1 class="text-center mt-5 text-info">Signup</h1>
	<form class="row" @submit.prevent="procesarFormulario">
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese Nombre"
				v-model="name"
			/>
		</div>
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
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Repita Password"
				v-model="repassword"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<button
				class="btn btn-info me-2"
				type="submit"
				:disabled="
					repassword !== password ||
					!password.trim() ||
					password.length < 6
				"
			>
				Crear cuenta
			</button>
			<router-link to="/login" class="btn btn-outline-dark"
				>¿Ya tienes cuenta?</router-link
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const email = ref("");
		const name = ref("");
		const password = ref("");
		const repassword = ref("");

		const store = useStore();

		const errors = computed(() => store.state.moduleAuth.errors);

		const procesarFormulario = async () => {
			await store.dispatch("moduleAuth/acceder", {
				path: "/signup",
				form: {
					email: email.value,
					password: password.value,
					name: name.value,
				},
			});
		};

		return {
			name,
			email,
			password,
			repassword,
			procesarFormulario,
			errors,
		};
	},
};
</script>