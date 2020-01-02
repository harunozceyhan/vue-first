<template>
	<!-- App.vue -->
	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="primary" dark>
			<v-app-bar-nav-icon @click="miniDrawer = !miniDrawer"></v-app-bar-nav-icon>

			<div style="width: 260px">
				<router-link :to="{ path: '/dashboard' }" replace><v-img src="@/assets/smart_trans.png" max-width="220" max-height="50" style="margin-left: 16px"></v-img></router-link>
			</div>

			<v-autocomplete label="Ara..." v-model="selected" dense color="secondary" :clearable="true" append-icon="" :open-on-clear="true" cache-items class="mx-4" flat hide-details solo-inverted :items="components"></v-autocomplete>

			<v-spacer></v-spacer>

			<div style="min-width: 100px; width: 300px" v-if="oidcIsAuthenticated">
				<router-link :to="{ path: '/profile' }" replace>
					<v-list-item dense two-line link style="height: 64px;">
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
						<v-badge v-model="show" color="warning" right overlap>
							<template v-slot:badge>
								<span>1</span>
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
				<v-badge v-model="show" color="green" right overlap>
					<template v-slot:badge dense>
						<span>2</span>
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
			<router-view style="overflow-y: auto; height: 100%"></router-view>
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
import Jwt from '@/plugins/common/jwt'

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
		components: ['Sipariş Parametre İşlemleri - Makina Parametre İşlemleri', 'Sipariş Parametre İşlemleri - Makina Grup Parametre İşlemleri', 'Kullanıcı İşlemleri - Create'],
		chatDrawer: false,
		settingsDrawer: false,
		miniDrawer: false,
		selected: null,
		show: true,
		menu: false
	}),
	computed: {
		...mapGetters(['oidcIsAuthenticated', 'oidcUser'])
	},
	methods: {
		...mapActions(['signOutOidc', 'setServices', 'setRoles', 'setPermissions']),
		userLoaded(user) {
			const parsedJwt = Jwt.parseJwt(user.detail.access_token)
			this.setServices(parsedJwt.aud)
			this.setRoles(parsedJwt.realm_access === undefined ? [] : parsedJwt.realm_access.roles)
			this.setPermissions(parsedJwt)
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
