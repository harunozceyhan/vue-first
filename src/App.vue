<template>
	<!-- App.vue -->

	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="primary" dark>
			<v-img src="http://smartiys.com.tr/images/logo.png" max-width="300" max-height="50" flex></v-img>
			<v-app-bar-nav-icon @click="miniDrawer = !miniDrawer"></v-app-bar-nav-icon>
			<v-autocomplete label="Ara..." v-model="selected" dense color="secondary" :clearable="true" append-icon="" :open-on-clear="true" cache-items class="mx-4" flat hide-details solo-inverted :items="components"></v-autocomplete>
			<v-spacer></v-spacer>
			<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="400" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-badge v-model="show" color="red" right overlap>
							<template v-slot:badge>
								<span>1</span>
							</template>
							<v-icon>notifications</v-icon>
						</v-badge>
					</v-btn>
				</template>

				<v-card>
					<v-list two-line subheader>
						<v-subheader>Notifications</v-subheader>

						<v-list-item v-for="item in notifications" :key="item.title" link>
							<v-list-item-avatar><v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon></v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-text="item.title"></v-list-item-title>
								<v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon> <v-icon color="grey lighten-1">mdi-close</v-icon> </v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>
			<v-btn icon v-on:click="rightDrawer = !rightDrawer">
				<v-icon>settings</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer :mini-variant.sync="miniDrawer" app permanent :clipped="true" width="320">
			<v-list-item>
				<v-list-item-avatar> <v-img src="https://randomuser.me/api/portraits/men/95.jpg"></v-img> </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>John Leider</v-list-item-title>
					<v-list-item-subtitle>johnleider@gmail.com</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense :nav="true">
				<v-list-item @click="changeTheme()" color="secondary">
					<v-list-item-icon> <v-icon>mdi-home</v-icon> </v-list-item-icon>
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>

				<v-list-group prepend-icon="account_circle" append-icon="" color="secondary">
					<template v-slot:activator>
						<v-list-item-title>Parametre İşlemleri</v-list-item-title>
					</template>

					<v-list-group sub-group prepend-icon="chat" color="secondary">
						<template v-slot:activator>
							<v-list-item-title>Sipariş Parametre İşlemleri</v-list-item-title>
						</template>
						<v-list-item v-for="(admin, i) in admins" :key="i" link color="secondary" :to="{ path: '/hello' }" :replace="true">
							<v-list-item-icon> <v-icon v-text="admin[1]"></v-icon> </v-list-item-icon>
							<v-list-item-title v-text="admin[0]"></v-list-item-title>
						</v-list-item>
					</v-list-group>

					<v-list-group sub-group prepend-icon="mdi-home" color="secondary">
						<template v-slot:activator>
							<v-list-item-title>Stok Parametre İşlemleri</v-list-item-title>
						</template>
						<v-list-item v-for="(crud, i) in cruds" :key="i" link color="secondary" :to="{ path: '/hello2' }" :replace="true">
							<v-list-item-icon> <v-icon v-text="crud[1]"></v-icon> </v-list-item-icon>
							<v-list-item-title v-text="crud[0]"></v-list-item-title>
						</v-list-item>
					</v-list-group>
				</v-list-group>

				<v-list-group no-action prepend-icon="voice_chat" append-icon="" color="secondary">
					<template v-slot:activator>
						<v-list-item-title>Profile</v-list-item-title>
					</template>
					<v-list-item v-for="(admin, i) in admins" :key="i" link color="secondary" @mousedown.right="rightMouse()">
						<v-list-item-icon> <v-icon v-text="admin[1]"></v-icon> </v-list-item-icon>
						<v-list-item-title v-text="admin[0]"></v-list-item-title>
					</v-list-item>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>

		<v-content style="height: 100%">
			<router-view style="overflow-y: auto; height: 100%"></router-view>
		</v-content>

		<v-navigation-drawer app v-model="rightDrawer" temporary right>
			<v-footer color="accent" :absolute="true">
				<v-spacer></v-spacer>
				<div v-on:click="changeTheme()" class="white--text caption">Smartiys &copy; {{ new Date().getFullYear() }}</div>
			</v-footer>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	components: {},

	data: () => ({
		components: ['Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields'],
		rightDrawer: false,
		miniDrawer: false,
		selected: null,
		show: true,
		admins: [['Settings', 'settings']],
		cruds: [['Create', 'add']],
		menu: false,
		notifications: [
			{ icon: 'new_releases', iconClass: 'red lighten-1 white--text', title: ' Yeni Güncellemeler', subtitle: 'Stok Takibi Eklendi.' },
			{ icon: 'new_releases', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
			{ icon: 'new_releases', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
		]
	}),
	methods: {
		changeTheme() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark
		},
		rightMouse() {}
	}
}
</script>
<style>
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > div > .v-list-item {
	padding-left: 20px;
}
.v-list-group--sub-group.v-list-group--active .v-list-item__icon.v-list-group__header__prepend-icon .v-icon {
	-webkit-transform: rotate(0deg);
	transform: rotate(0);
}
</style>
