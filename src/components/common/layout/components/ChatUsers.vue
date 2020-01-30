<template>
	<div>
		<v-list-item>
			<v-list-item-avatar> <v-img src="@/assets/group.svg"></v-img> </v-list-item-avatar>
			<v-list-item-title class="title">{{ $t('base.label.users') }}</v-list-item-title>
		</v-list-item>
		<v-divider></v-divider>
		<v-list subheader dense>
			<v-subheader>{{ $t('base.label.online-users') }}</v-subheader>
			<v-list-item dense link v-for="item in onlineUsers" :key="item.title" @click="openMessageDialog(item)">
				<v-list-item-avatar> <v-img src="@/assets/person.png"></v-img> </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ item.name }} </v-list-item-title>
				</v-list-item-content>
				<v-icon dense color="green accent-4">chat_bubble</v-icon>
				<div class="unread-message-count" v-if="item.messageCount !== 0">{{ item.messageCount }}</div>
			</v-list-item>
			<v-subheader>{{ $t('base.label.offline-users') }}</v-subheader>
			<v-list-item dense link v-for="item in offlineUsers" :key="item.title" @click="openMessageDialog(item)">
				<v-list-item-avatar> <v-img src="@/assets/person.png"></v-img> </v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
				</v-list-item-content>
				<v-icon dense color="grey">chat_bubble</v-icon>
				<div class="unread-message-count" v-if="item.messageCount !== 0">{{ item.messageCount }}</div>
			</v-list-item>
		</v-list>
		<message-dialog :data="messageDialog" @closeMessageDialog="closeMessageDialog()" />
	</div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import MessageDialog from '@/components/common/layout/components/MessageDialog'
Vue.component('message-dialog', MessageDialog)

export default {
	data: () => ({
		onlineUsers: [],
		offlineUsers: [],
		messageDialog: {
			show: false,
			user: null
		}
	}),
	watch: {
		getUsers: {
			handler() {
				this.onlineUsers = this.getUsers.filter(user => {
					return user.online === true
				})
				this.offlineUsers = this.getUsers.filter(user => {
					return user.online === false
				})
			},
			deep: true
		},
		getUnreadMessageList: {
			handler() {
				this.onlineUsers.filter(user => {
					user.messageCount = this.getUnreadMessageList.filter(message => {
						return message.sender === user.username
					}).length
				})
				this.offlineUsers.filter(user => {
					user.messageCount = this.getUnreadMessageList.filter(message => {
						return message.sender === user.username
					}).length
				})
			},
			deep: true
		}
	},
	computed: {
		...mapGetters(['getUsers', 'getUnreadMessageList'])
	},
	methods: {
		...mapActions(['setRoomToNull', 'setMessageList']),
		openMessageDialog(user) {
			this.messageDialog.user = user
			this.messageDialog.show = true
		},
		closeMessageDialog() {
			this.messageDialog.user = null
			this.messageDialog.show = false
			this.setRoomToNull()
			this.setMessageList([])
		}
	}
}
</script>
<style>
.unread-message-count {
	position: absolute;
	right: 12px;
	margin-top: 4px;
	background-color: red;
	padding-top: 1px;
	padding-left: 4px;
	padding-right: 4px;
	color: white;
	border-radius: 48px;
	font-size: 8px;
}
</style>
