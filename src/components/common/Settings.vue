<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar> <v-img src="@/assets/settings.svg" color="info"></v-img> </v-list-item-avatar>
				<v-list-item-title class="title">Ayarlar</v-list-item-title>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list subheader dense>
			<v-subheader>Dil</v-subheader>
			<v-list-item>
				<v-list-item-action style="margin-right: 0"><v-select dense hide-details="" item-color="secondary" color="secondary" :items="languages" label="Dil Seçiniz" outlined></v-select></v-list-item-action>
			</v-list-item>
			<v-subheader>Görünüm</v-subheader>
			<v-list-item
				@click="
					darkMode = !darkMode
					setTheme()
				"
			>
				<v-list-item-title>Karanlık Mod</v-list-item-title>
				<v-list-item-action>
					<v-switch
						v-model="darkMode"
						class="ma-2"
						dense
						@click="
							darkMode = !darkMode
							setTheme()
						"
					></v-switch>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-footer color="accent" :absolute="true">
			<v-spacer></v-spacer>
			<div class="white--text caption">
				<span class="mr-12">Smartiys &copy; {{ new Date().getFullYear() }}</span> <span class="ml-10">v1.0.5</span>
			</div>
		</v-footer>
	</div>
</template>
<script>
export default {
	data: () => ({
		darkMode: null,
		items: [
			{ active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
			{ active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
			{ active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
			{ active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
		],
		items2: [{ title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }],
		languages: ['Türkçe', 'English']
	}),

	mounted() {
		this.darkMode = localStorage.dark === 'undefined' ? false : localStorage.dark === 'true' ? true : false
		this.setTheme()
	},
	methods: {
		setTheme() {
			this.$vuetify.theme.dark = this.darkMode
			localStorage.dark = this.darkMode
		}
	}
}
</script>
