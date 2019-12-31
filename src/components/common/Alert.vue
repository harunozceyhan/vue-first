<template>
	<div>
		<v-snackbar v-model="getAlert.show" bottom :color="getAlert.type" :timeout="getAlert.timeout">
			<div class="alert-text">{{ getAlert.text }}</div>
			<v-btn dark text @click="hideAlert()">
				<v-icon>cancel</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters({
			getAlert: 'getAlert'
		})
	},
	methods: {
		...mapActions({
			hideAlert: 'hideAlert'
		})
	}
}
</script>
