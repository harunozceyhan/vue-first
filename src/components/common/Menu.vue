<template>
	<div>
		<v-divider></v-divider>
		<v-list dense :nav="true">
			<v-list-item color="secondary" link>
				<v-list-item-icon :style="mini ? { 'margin-right': '0' } : { 'margin-right': '20px' }"> <v-icon color="success">home</v-icon> </v-list-item-icon>
				<v-list-item-title>Ana Sayfa</v-list-item-title>
			</v-list-item>

			<v-list-group append-icon="" color="secondary">
				<template v-slot:activator>
					<v-list-item-icon :style="mini ? { 'margin-right': '0' } : { 'margin-right': '20px' }"> <v-icon color="info">account_circle</v-icon> </v-list-item-icon>
					<v-list-item-title>Parametre İşlemleri</v-list-item-title>
				</template>

				<v-list-group sub-group prepend-icon="chat" color="secondary" v-model="subactive1" @click="subactive2 = false">
					<template v-slot:activator>
						<v-list-item-title>Sipariş Parametre İşlemleri</v-list-item-title>
					</template>
					<v-list-item v-for="(admin, i) in admins" :key="i" link color="secondary" :to="{ path: admin[2] }" :replace="true">
						<v-list-item-icon> <v-icon v-text="admin[1]"></v-icon> </v-list-item-icon>
						<v-list-item-title v-text="admin[0]"></v-list-item-title>
					</v-list-item>
				</v-list-group>

				<v-list-group sub-group prepend-icon="mdi-home" color="secondary" v-model="subactive2" @click="subactive1 = false">
					<template v-slot:activator>
						<v-list-item-title>Stok Parametre İşlemleri</v-list-item-title>
					</template>
					<v-list-item v-for="(crud, i) in cruds" :key="i" link color="secondary" :to="{ path: crud[2] }" :replace="true">
						<v-list-item-icon> <v-icon v-text="crud[1]"></v-icon> </v-list-item-icon>
						<v-list-item-title v-text="crud[0]"></v-list-item-title>
					</v-list-item>
				</v-list-group>
			</v-list-group>

			<v-list-group no-action append-icon="" color="secondary">
				<template v-slot:activator>
					<v-list-item-icon :style="mini ? { 'margin-right': '0' } : { 'margin-right': '20px' }"> <v-icon color="warning">voice_chat</v-icon> </v-list-item-icon>
					<v-list-item-title>Kullanıcı İşlemleri</v-list-item-title>
				</template>
				<v-list-item v-for="(crud, i) in cruds" :key="i" link color="secondary" :to="{ path: crud[2] }" :replace="true">
					<v-list-item-icon> <v-icon v-text="crud[1]"></v-icon> </v-list-item-icon>
					<v-list-item-title v-text="crud[0]"></v-list-item-title>
				</v-list-item>
			</v-list-group>
		</v-list>
	</div>
</template>

<script>
export default {
	props: ['mini'],
	data: () => ({
		subactive1: false,
		subactive2: false,
		admins: [
			['Makina Parametre İşlemleri', 'settings', 'hello'],
			['Makina Grup Parametre İşlemleri', 'device_hub', 'hello2']
		],
		cruds: [['Create', 'add', 'hello2']]
	})
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
