<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar> <v-img src="@/assets/group.svg"></v-img> </v-list-item-avatar>
				<v-list-item-title class="title">{{ $t('base.label.users') }}</v-list-item-title>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list subheader dense>
			<v-subheader>{{ $t('base.label.online-users') }}</v-subheader>
			<v-list-item dense link v-for="item in onlineUsers" :key="item.title">
				<v-list-item-avatar> <v-img src="@/assets/person.png"></v-img> </v-list-item-avatar>
				<v-list-item-content> <v-list-item-title v-text="item.name"></v-list-item-title> </v-list-item-content>
				<v-icon dense color="green accent-4">chat_bubble</v-icon>
			</v-list-item>
		</v-list>
		<v-list subheader dense>
			<v-subheader>{{ $t('base.label.offline-users') }}</v-subheader>
			<v-list-item dense link v-for="item in offlineUsers" :key="item.title">
				<v-list-item-avatar> <v-img src="@/assets/person.png"></v-img> </v-list-item-avatar>
				<v-list-item-content> <v-list-item-title v-text="item.name"></v-list-item-title> </v-list-item-content>
				<v-icon dense color="grey">chat_bubble</v-icon>
			</v-list-item>
		</v-list>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['getUsers']),
		onlineUsers() {
			return this.getUsers.filter(user => {
				return user.online === true
			})
		},
		offlineUsers() {
			return this.getUsers.filter(user => {
				return user.online === false
			})
		}
	}
}
</script>
