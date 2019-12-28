<template>
	<div>
		<v-list two-line subheader dense>
			<v-subheader>Notifications</v-subheader>
			<v-list-item v-for="item in notifications" :key="item.title" link>
				<v-list-item-avatar><v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon></v-list-item-avatar>
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
export default {
	data: () => ({
		notifications: [
			{ icon: 'new_releases', iconClass: 'red lighten-1 white--text', title: ' Yeni Güncellemeler', subtitle: 'Stok Takibi Eklendi.' },
			{ icon: 'new_releases', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
			{ icon: 'new_releases', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
		]
	})
}
</script>
