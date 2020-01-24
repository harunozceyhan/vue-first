<template>
	<!-- App.vue -->
	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="app" dark>
			<v-app-bar-nav-icon @click="miniDrawer = !miniDrawer"></v-app-bar-nav-icon>

			<div style="width: 260px">
				<router-link :to="{ path: '/dashboard' }" replace><v-img src="@/assets/smart_trans.png" max-width="220" max-height="50" style="margin-left: 16px"></v-img></router-link>
			</div>

			<v-autocomplete v-model="selectedMenuItem" :label="$t('base.label.search') + '...'" dense color="secondary" append-icon="" prepend-inner-icon="search" :clearable="true" :open-on-clear="true" cache-items class="mx-4" flat hide-details solo-inverted return-object :items="menuItems" :filter="searchMenuFilter" :no-data-text="$t('base.label.no-data-text') + '...'">
				<template v-slot:selection="{ attr, on, item, selected }">
					<v-chip v-bind="attr" :input-value="selected" color="white" class="primary--text" v-on="on">
						<v-icon left>{{ item.icon }}</v-icon>
						<span v-text="item.text"></span>
					</v-chip>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-icon>
						<v-icon color="secondary">{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-title>{{ item.text }}</v-list-item-title>
				</template>
			</v-autocomplete>

			<v-spacer></v-spacer>
			<div style="min-width: 100px; width: 300px" v-if="oidcIsAuthenticated">
				<router-link :to="{ path: '/profile' }" replace style="text-decoration: none;">
					<v-list-item dense link two-line style="height: 64px;">
						<v-list-item-avatar> <v-img src="@/assets/user.png"></v-img> </v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>{{ oidcUser.name }}</v-list-item-title>
							<v-list-item-subtitle>{{ oidcUser.email }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</router-link>
			</div>

			<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="400" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-badge v-model="show" :color="getUnreadNotificationCount === 0 ? 'transparent' : 'warning'" right overlap>
							<template v-slot:badge>
								<span v-if="getUnreadNotificationCount !== 0">{{ getUnreadNotificationCount }}</span>
							</template>
							<v-icon>notifications</v-icon>
						</v-badge>
					</v-btn>
				</template>
				<v-card>
					<s-notification />
				</v-card>
			</v-menu>

			<v-btn icon v-on:click="chatDrawer = !chatDrawer">
				<v-badge v-model="show" :color="getOnlineUserCount === 0 ? 'transparent' : 'green'" right overlap>
					<template v-slot:badge dense>
						<span v-if="getOnlineUserCount !== 0">{{ getOnlineUserCount }}</span>
					</template>
					<v-icon>group</v-icon>
				</v-badge>
			</v-btn>

			<v-btn icon v-on:click="settingsDrawer = !settingsDrawer">
				<v-icon>settings</v-icon>
			</v-btn>

			<v-btn icon v-on:click="signOutOidc">
				<v-icon>mdi-logout-variant</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer :mini-variant.sync="miniDrawer" app permanent :clipped="true" width="320" mini-variant-width="60">
			<left-menu :mini="miniDrawer" />
		</v-navigation-drawer>

		<v-content style="height: 100%">
			<router-view style="overflow-y: auto; height: 100%" id="router-view"></router-view>
		</v-content>

		<v-navigation-drawer app v-model="settingsDrawer" temporary right :clipped="true">
			<s-settings />
		</v-navigation-drawer>

		<v-navigation-drawer app v-model="chatDrawer" temporary right :clipped="true">
			<chat-users />
		</v-navigation-drawer>

		<s-alert />
		<s-loading />
	</v-app>
</template>

<script>
import Menu from './components/common/layout/Menu'
import Notification from './components/common/layout/Notification'
import ChatUsers from './components/common/layout/ChatUsers'
import Settings from './components/common/layout/Settings'
import Alert from './components/common/layout/Alert'
import Loading from './components/common/layout/Loading'
import { mapGetters, mapActions } from 'vuex'
import menuItems from '@/plugins/router/menu'

export default {
	name: 'App',

	components: {
		'left-menu': Menu,
		's-notification': Notification,
		'chat-users': ChatUsers,
		's-settings': Settings,
		's-loading': Loading,
		's-alert': Alert
	},

	data: () => ({
		selectedMenuItem: null,
		chatDrawer: false,
		settingsDrawer: false,
		miniDrawer: false,
		selected: null,
		show: true,
		menu: false
	}),
	watch: {
		selectedMenuItem(val) {
			if (val != undefined) {
				this.$router.push({ path: val.path })
			}
		},
		$route(to) {
			if (this.selectedMenuItem != null && '/' + this.selectedMenuItem.path != to.path) {
				this.selectedMenuItem = null
			}
		}
	},
	computed: {
		...mapGetters(['oidcIsAuthenticated', 'oidcUser', 'getUnreadNotificationCount', 'getOnlineUserCount', 'getPermissions']),
		menuItems() {
			let searchItems = []
			menuItems.filter(menuItem => {
				if (menuItem.container) {
					menuItem.children.filter(childMenuItem => {
						if (childMenuItem.container) {
							childMenuItem.children.filter(childCMenuItem => {
								searchItems.push({ text: this.$t(childCMenuItem.label), path: childCMenuItem.path, icon: childCMenuItem.icon, tags: childCMenuItem.tags })
							})
						} else {
							searchItems.push({ text: this.$t(childMenuItem.label), path: childMenuItem.path, icon: childMenuItem.icon, tags: childMenuItem.tags })
						}
					})
				} else {
					searchItems.push({ text: this.$t(menuItem.label), path: menuItem.path, icon: menuItem.icon, tags: menuItem.tags })
				}
			})
			return searchItems
		}
	},
	methods: {
		...mapActions(['signOutOidc', 'setServices', 'setRoles', 'setPermissions', 'setUsers']),
		userLoaded(user) {
			const parsedJwt = this.$parseJwt(user.detail.access_token)
			this.setServices(parsedJwt.aud)
			this.setRoles(parsedJwt.realm_access === undefined ? [] : parsedJwt.realm_access.roles)
			this.setPermissions(parsedJwt)
			this.setUsers(user.detail.access_token)
		},
		searchMenuFilter(item, queryText, itemText) {
			const query = queryText.toLowerCase()
			return itemText.toLowerCase().indexOf(query) > -1 || item.tags.toLowerCase().indexOf(query) > -1
		}
	},
	mounted() {
		window.addEventListener('vuexoidc:userLoaded', this.userLoaded)
	},
	destroyed() {
		window.removeEventListener('vuexoidc:userLoaded', this.userLoaded)
	}
}
</script>
<style>
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
	z-index: 5;
	margin-top: 64px;
}
</style>
