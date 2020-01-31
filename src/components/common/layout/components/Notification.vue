<template>
	<div>
		<v-list two-line subheader>
			<v-subheader>{{ $t('base.label.notifications') }}</v-subheader>
			<v-list-item v-for="item in getNotifications" :key="item.title" link dense>
				<v-list-item-avatar><v-icon :class="item.read === false ? 'red' : 'grey' + ' lighten-1 white--text'" dark>new_releases</v-icon></v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>
					<v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon> <v-icon color="grey lighten-1">close</v-icon> </v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['getNotifications'])
	}
}
</script>
