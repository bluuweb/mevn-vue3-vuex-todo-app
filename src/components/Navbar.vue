<template>
	<nav class="navbar navbar-dark bg-dark">
		<div class="container">
			<router-link to="/" class="navbar-brand">API</router-link>
			<div>
				<router-link v-if="!user" class="btn btn-info me-2" to="/login">
					Login
				</router-link>
				<router-link v-if="!user" class="btn btn-info" to="/signup">
					Signup
				</router-link>
				<button v-if="user" @click="logout" class="btn btn-danger">
					Logout
				</button>
			</div>
		</div>
	</nav>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();
		const user = computed(() => store.state.moduleAuth.user);
		const logout = () => {
			store.dispatch("moduleAuth/cerrarSesion");
		};
		return {
			logout,
			user,
		};
	},
};
</script>