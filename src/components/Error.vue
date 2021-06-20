<template>
	<div class="alert alert-danger">
		{{ error.msg }}
	</div>
</template>

<script>
export default {
	props: ["error"],
	setup() {},
};
</script>