<template>
	<div>
		<v-card-actions class="justify-center">
			<v-icon size="384" color="error">error_outline</v-icon>
		</v-card-actions>
		<v-card-actions class="justify-center text-center">
			<v-sheet dark class="auth-alert" color="error" max-width="920">
				<div class="title">{{ $t('base.label.authentication-error') }}</div>
			</v-sheet>
		</v-card-actions>
	</div>
</template>

<script>
export default {
	name: 'OidcCallbackError'
}
</script>
<style scoped>
.auth-alert {
	margin: 24px;
	padding: 24px;
}
</style>
