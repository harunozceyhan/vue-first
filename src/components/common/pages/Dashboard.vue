<template>
	<v-container fluid>
		<div>{{ $t('hello.text') }} Dashboard !</div>
		<div>Services: {{ getServices }}</div>
		<div>Roles: {{ getRoles }}</div>
		<div>Permissions: {{ getPermissions }}</div>
		<div>{{ getServicesExists('sbo-service') }}</div>
		<div>{{ getServicesExists('stok-service') }}</div>
		<div>{{ getPermissionExists('siparis:get', 'sbo-service') }}</div>
		<div>{{ getPermissionExists('stok:get', 'sbo-service') }}</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	computed: {
		...mapGetters(['getServices', 'getRoles', 'getPermissions', 'getPermissionExists', 'getServicesExists'])
	}
}
</script>
<i18n>
tr:
    hello: 
        text: "Merhaba"
en:
    hello:
        text:  "Hello"
</i18n>
