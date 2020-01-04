<template>
	<div>
		<v-list>
			<v-list-item>
				<v-list-item-avatar> <v-img src="@/assets/settings.svg" color="info"></v-img> </v-list-item-avatar>
				<v-list-item-title class="title">{{ $t('base.label.settings') }}</v-list-item-title>
			</v-list-item>
		</v-list>
		<v-divider></v-divider>
		<v-list subheader dense>
			<v-subheader>{{ $t('base.label.language') }}</v-subheader>
			<v-list-item>
				<v-list-item-action style="min-width: 100%"><v-select v-model="language" @change="onLanguageChanged" dense hide-details="" item-color="secondary" color="secondary" :items="languages" :label="$t('base.label.select-language')" return-object outlined></v-select></v-list-item-action>
			</v-list-item>
			<v-subheader>{{ $t('base.label.view') }}</v-subheader>
			<v-list-item
				@click="
					darkMode = !darkMode
					setTheme()
				"
			>
				<v-list-item-title>{{ $t('base.label.dark-mode') }}</v-list-item-title>
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
			<v-list-item
				@click="
					rtl = !rtl
					setRtl()
				"
			>
				<v-list-item-title>{{ $t('base.label.rtl') }}</v-list-item-title>
				<v-list-item-action>
					<v-switch
						v-model="rtl"
						class="ma-2"
						dense
						@click="
							rtl = !rtl
							setRtl()
						"
					></v-switch>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-footer color="accent" :absolute="true" style="bottom: 64px">
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
		rtl: null,
		language: { id: 'tr', text: 'Türkçe' },
		languages: [
			{ id: 'tr', text: 'Türkçe' },
			{ id: 'en', text: 'English' }
		]
	}),
	mounted() {
		this.language = localStorage.language === undefined ? { id: 'tr', text: 'Türkçe' } : localStorage.language === 'tr' ? { id: 'tr', text: 'Türkçe' } : { id: 'en', text: 'English' }
		this.darkMode = localStorage.dark === undefined ? false : localStorage.dark === 'true' ? true : false
		this.rtl = localStorage.rtl === undefined ? false : localStorage.rtl === 'true' ? true : false
		this.setTheme()
		this.setRtl()
		this.setLanguage()
	},
	methods: {
		setTheme() {
			this.$vuetify.theme.dark = this.darkMode
			localStorage.dark = this.darkMode
		},
		setRtl() {
			this.$vuetify.rtl = this.rtl
			localStorage.rtl = this.rtl
		},
		setLanguage() {
			localStorage.language = this.language.id
			this.$i18n.locale = this.language.id
		},
		onLanguageChanged() {
			this.setLanguage()
		}
	}
}
</script>
