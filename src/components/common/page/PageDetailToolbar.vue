<template>
	<v-toolbar dark color="header">
		<v-icon class="mx-2">mdi-pencil</v-icon>
		<v-toolbar-title>{{ title }}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon dark class="mx-1" @click="$emit('save')" ref="add" v-permission="permission + (id === undefined ? ':post' : ':put')"> <v-icon>save</v-icon> </v-btn>
		<v-btn icon dark class="mx-1" @click="$emit('clear')"> <v-icon>format_clear</v-icon> </v-btn>
		<v-btn icon dark class="mx-1" @click="$emit('toggleDialog')">
			<v-icon>{{ expandIcon }}</v-icon>
		</v-btn>
		<v-btn icon dark @click="$emit('close')"> <v-icon>close</v-icon> </v-btn>
	</v-toolbar>
</template>
<script>
import AuthService from '@/plugins/auth/AuthService'

export default {
	props: ['title', 'expandIcon', 'permission', 'id'],
	watch: {
		id: function() {
			this.$refs.add.$el.hidden = !AuthService.checkPermission(this.permission + (this.id === undefined ? ':post' : ':put'))
		}
	}
}
</script>
