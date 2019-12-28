<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar> <v-img src="@/assets/logo.png"></v-img> </v-list-item-avatar>
				<v-list-item-title class="title">Kullanıcılar</v-list-item-title>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list subheader dense>
			<v-subheader>Online Users</v-subheader>
			<v-list-item dense link v-for="item in items" :key="item.title">
				<v-list-item-avatar> <v-img :src="item.avatar"></v-img> </v-list-item-avatar>
				<v-list-item-content> <v-list-item-title v-text="item.title"></v-list-item-title> </v-list-item-content>
				<v-icon dense :color="item.active ? 'green accent-4' : 'grey'">chat_bubble</v-icon>
			</v-list-item>
		</v-list>
		<v-list subheader dense>
			<v-subheader>Offline Users</v-subheader>
			<v-list-item dense link v-for="item in items2" :key="item.title">
				<v-list-item-avatar> <v-img :src="item.avatar"></v-img> </v-list-item-avatar>
				<v-list-item-content> <v-list-item-title v-text="item.title"></v-list-item-title> </v-list-item-content>
				<v-icon dense :color="item.active ? 'green accent-4' : 'grey'">chat_bubble</v-icon>
			</v-list-item>
		</v-list>
	</div>
</template>
<script>
export default {
	data: () => ({
		items: [
			{ active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
			{ active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
			{ active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
			{ active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
		],
		items2: [{ title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }]
	})
}
</script>
