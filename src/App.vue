<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" v-on:click="greeting()" />
		<HelloWorld :msg="'Welcome to Your Vue.js App' + asd" />
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import Vue from 'vue'

export default {
	name: 'app',
	data() {
		return {
			asd: ['asd', '123']
		}
	},
	components: {
		HelloWorld
	},
	methods: {
		greeting() {
			this.asd.push('qwe')
			// Vue.set(this.asd, 0, '222')
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
