<template>
	<div class="container">
		<Navbar />
		<div class="mt-3">
			<router-view />
		</div>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
	components: { Navbar },
	setup() {},
};
</script>
