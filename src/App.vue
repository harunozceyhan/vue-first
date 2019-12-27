<template>
	<!-- App.vue -->

	<v-app>
		<v-app-bar app color="primary" dark>
			<v-app-bar-nav-icon @click="miniDrawer = !miniDrawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Page title</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-autocomplete label="Ara..." v-model="selected" dense color="secondary" :clearable="true" append-icon="" :open-on-clear="true" cache-items class="mx-4" flat hide-details solo-inverted :items="components"></v-autocomplete>

			<v-btn icon v-on:click="changeTheme()">
				<v-icon>favorite</v-icon>
			</v-btn>

			<v-btn icon v-on:click="rightDrawer = !rightDrawer">
				<v-icon>settings</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer :mini-variant.sync="miniDrawer" app permanent>
			<v-list-item>
				<v-list-item-avatar>
					<v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>John Leider</v-list-item-title>
					<v-list-item-subtitle>johnleider@gmail.com</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense :nav="true" :rounded="true">
				<v-list-item @click="changeTheme()" color="secondary">
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>

					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>

				<v-list-group prepend-icon="account_circle" color="secondary">
					<template v-slot:activator>
						<v-list-item-title>Users</v-list-item-title>
					</template>

					<v-list-group no-action sub-group color="secondary">
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>Admin</v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item v-for="(admin, i) in admins" :key="i" link color="secondary">
							<v-list-item-title v-text="admin[0]"></v-list-item-title>
							<v-list-item-icon>
								<v-icon v-text="admin[1]"></v-icon>
							</v-list-item-icon>
						</v-list-item>
					</v-list-group>

					<v-list-group sub-group no-action color="secondary">
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>Actions</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item v-for="(crud, i) in cruds" :key="i" link color="secondary">
							<v-list-item-title v-text="crud[0]"></v-list-item-title>
							<v-list-item-action>
								<v-icon v-text="crud[1]"></v-icon>
							</v-list-item-action>
						</v-list-item>
					</v-list-group>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>

		<!-- Sizes your content based upon application components -->
		<v-content>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-content>

		<v-navigation-drawer v-model="rightDrawer" absolute temporary right> </v-navigation-drawer>

		<!--<v-footer app color="accent">
			<v-spacer></v-spacer>
			<div v-on:click="changeTheme()" class="white--text caption">Smartiys &copy; {{ new Date().getFullYear() }}</div>
		</v-footer> -->
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
		items: [
			{ title: 'Home', icon: 'mdi-home-city' },
			{ title: 'My Account', icon: 'mdi-account' },
			{ title: 'Users', icon: 'mdi-account-group-outline' }
		],
		admins: [
			['Management', 'people_outline'],
			['Settings', 'settings']
		],
		cruds: [
			['Create', 'add'],
			['Read', 'insert_drive_file'],
			['Update', 'update'],
			['Delete', 'delete']
		]
	}),
	methods: {
		changeTheme() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark
		}
	}
}
</script>
