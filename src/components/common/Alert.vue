<template>
	<div>
		<v-snackbar v-model="getAlert.show" :bottom="true" :color="getAlert.type" :timeout="getAlert.timeout">
			<v-progress-linear v-if="getAlert.show" buffer-value="50" stream color="white" absolute bottom background-opacity="0.6"></v-progress-linear>
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
