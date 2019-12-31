<template>
	<div>
		<v-snackbar v-model="getAlert.show" :bottom="true" :color="getAlert.type" :multi-line="true" :timeout="getAlert.timeout">
			{{ getAlert.text }}
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
