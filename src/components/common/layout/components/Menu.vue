<template>
	<div>
		<v-divider></v-divider>
		<v-list dense :nav="true">
			<div v-for="(menu, menuIndex) in menuItems" :key="menuIndex">
				<v-list-group no-action append-icon="" color="secondary" v-if="menu.container">
					<template v-slot:activator>
						<v-list-item-icon :style="mini ? { 'margin-right': '0' } : { 'margin-right': '20px' }">
							<v-icon :color="menu.color">{{ menu.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ $t(menu.label) }}</v-list-item-title>
					</template>

					<div v-for="(menuChild, menuChildIndex) in menu.children" :key="menuChildIndex">
						<v-list-group sub-group :prepend-icon="menuChild.icon" color="secondary" v-if="menuChild.container" v-model="menuChild.active" @click="onMenuItemClick(menu, menuChild)">
							<template v-slot:activator>
								<v-list-item-title>{{ $t(menuChild.label) }}</v-list-item-title>
							</template>
							<v-list-item v-for="(menuSubChild, menuSubChildIndex) in menuChild.children" :key="menuSubChildIndex" link color="secondary" :to="{ path: menuSubChild.path }" :replace="true">
								<v-list-item-icon> <v-icon v-text="menuSubChild.icon"></v-icon> </v-list-item-icon>
								<v-list-item-title v-text="$t(menuSubChild.label)"></v-list-item-title>
							</v-list-item>
						</v-list-group>
						<v-list-item color="secondary" :to="{ path: menuChild.path }" :replace="true" v-if="!menuChild.container && !mini" style="padding-left: 24px" @click="onMenuItemClick(menu, menuChild)">
							<v-list-item-icon style="margin-right: 16px">
								<v-icon>{{ menuChild.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-title v-text="$t(menuChild.label)"></v-list-item-title>
						</v-list-item>
					</div>
				</v-list-group>

				<v-list-item color="secondary" :to="{ path: menu.path }" :replace="true" v-if="!menu.container">
					<v-list-item-icon :style="mini ? { 'margin-right': '0' } : { 'margin-right': '20px' }">
						<v-icon :color="menu.color">{{ menu.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-title v-text="$t(menu.label)"></v-list-item-title>
				</v-list-item>
			</div>
		</v-list>
	</div>
</template>

<script>
import menuItems from '@/plugins/router/menu'

export default {
	props: ['mini'],
	data: () => ({
		menuItems: menuItems
	}),
	methods: {
		onMenuItemClick(menu, menuChild) {
			menu.children.filter(menuItem => {
				if (menuItem.label != menuChild.label) menuItem.active = false
			})
		}
	}
}
</script>
<style>
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > div > .v-list-item {
	padding-left: 20px !important;
}
.v-list-group--sub-group.v-list-group--active .v-list-item__icon.v-list-group__header__prepend-icon .v-icon {
	-webkit-transform: rotate(0deg) !important;
	transform: rotate(0) !important;
}
</style>
