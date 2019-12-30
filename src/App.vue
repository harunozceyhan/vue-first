<template>
	<!-- App.vue -->
	<v-app style="height: 100%">
		<v-app-bar app clipped-left clipped-right color="primary" dark>
			<v-app-bar-nav-icon @click="miniDrawer = !miniDrawer"></v-app-bar-nav-icon>
			<div style="width: 260px"><v-img src="@/assets/smart_trans.png" max-width="220" max-height="50" style="margin-left: 16px"></v-img></div>
			<v-autocomplete label="Ara..." v-model="selected" dense color="secondary" :clearable="true" append-icon="" :open-on-clear="true" cache-items class="mx-4" flat hide-details solo-inverted :items="components"></v-autocomplete>
			<v-spacer></v-spacer>

			<div style="width: 300px;" @click="changeTheme()">
				<v-list-item dense two-line link style="height: 64px;">
					<v-list-item-avatar> <v-img src="https://randomuser.me/api/portraits/men/95.jpg"></v-img> </v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>Harun Özceyhan</v-list-item-title>
						<v-list-item-subtitle>harunozceyhan@gmail.com</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</div>

			<v-menu v-model="menu" :close-on-content-click="false" :nudge-width="400" offset-y>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-badge v-model="show" color="red" right overlap>
							<template v-slot:badge>
								<span>{{ getObj.value }}</span>
							</template>
							<v-icon>notifications</v-icon>
						</v-badge>
					</v-btn>
				</template>
				<v-card>
					<Notification />
				</v-card>
			</v-menu>
			<v-btn icon v-on:click="chatDrawer = !chatDrawer">
				<v-badge v-model="show" color="green" right overlap>
					<template v-slot:badge dense>
						<span>{{ getUser.notification }}</span>
					</template>
					<v-icon>group</v-icon>
				</v-badge>
			</v-btn>
			<v-btn icon v-on:click="settingsDrawer = !settingsDrawer">
				<v-icon>settings</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer :mini-variant.sync="miniDrawer" app permanent :clipped="true" width="320" mini-variant-width="60">
			<Menu :mini="miniDrawer" />
		</v-navigation-drawer>

		<v-content style="height: 100%">
			<router-view style="overflow-y: auto; height: 100%"></router-view>
		</v-content>

		<v-navigation-drawer app v-model="settingsDrawer" temporary right :clipped="true">
			<Settings />
		</v-navigation-drawer>

		<v-navigation-drawer app v-model="chatDrawer" temporary right :clipped="true">
			<ChatUsers />
		</v-navigation-drawer>
	</v-app>
</template>

<script>
import Menu from './components/common/Menu'
import Notification from './components/common/Notification'
import ChatUsers from './components/common/ChatUsers'
import Settings from './components/common/Settings'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'App',

	components: { Menu, Notification, ChatUsers, Settings },

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
		...mapGetters({
			getObj: 'getObj',
			getUser: 'getUser'
		})
	},
	methods: {
		...mapActions({
			setValueOfObj: 'setValueOfObj',
			addValueToObjValue: 'addValueToObjValue',
			setUsernameOfObj: 'setUsernameOfObj'
		}),
		changeTheme() {
			this.setValueOfObj(10)
			this.setUsernameOfObj('admin')
		}
	}
}
</script>
<style>
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
	z-index: 5;
	margin-top: 64px;
}
</style>
