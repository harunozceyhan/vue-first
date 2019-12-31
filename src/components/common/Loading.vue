<template>
	<div>
		<v-dialog v-model="getLoading" persistent width="500">
			<v-card>
				<v-card-title>Please Wait...</v-card-title>
				<v-card-text> Please stand by while request and response </v-card-text>
				<v-progress-linear indeterminate height="6" color="secondary"></v-progress-linear>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			getLoading: 'getLoading'
		})
	}
}
</script>
