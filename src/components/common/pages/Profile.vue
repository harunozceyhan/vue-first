<template>
	<v-container fluid>
		<div>{{ $t('hello.text') }} Profile !</div>
	</v-container>
</template>

<script>
export default {
	name: 'Dashboard'
}
</script>
<i18n>
tr:
    hello: 
        text: "Merhaba"
en:
    hello:
        text:  "Hello"
</i18n>
