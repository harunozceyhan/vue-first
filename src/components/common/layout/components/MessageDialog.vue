<template>
	<v-container fluid v-if="data.show">
		<v-dialog v-model="data.show" max-width="720" persistent>
			<v-card>
				<v-toolbar dark color="header">
					<v-icon class="mx-2">chat_bubble</v-icon>
					<v-toolbar-title>{{ data.user.name }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="$emit('closeMessageDialog')"> <v-icon>close</v-icon> </v-btn>
				</v-toolbar>
				<v-card-text class="pa-3">
					<v-card>
						<v-card-text class="pa-0">
							<div id="message-list" class="message-list">
								<template v-for="message in getMessageList">
									<div class="message-outer" :key="message.id">
										<div :class="message.sender === oidcUser.preferred_username ? 'message-inner-right accent' : 'message-inner-left info'" class="px-3 my-2">{{ message.content }}</div>
									</div>
								</template>
							</div>
						</v-card-text>
					</v-card>
					<v-text-field v-model="content" class="mt-3" :label="$t('base.label.message')" outlined dense hide-details append-icon="send" @click:append="sendMessage" @keyup.enter="sendMessage"></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'sub-form',
	props: ['data'],
	data: () => ({
		content: ''
	}),
	computed: {
		...mapGetters(['oidcUser', 'getRoomId', 'getMessageList'])
	},
	watch: {
		data: {
			handler() {
				if (this.data.show) {
					this.content = ''
					this.$socket.emit('createOrGetRoom', [this.oidcUser.preferred_username, this.data.user.username])
				}
			},
			deep: true
		}
	},
	methods: {
		...mapActions(['setSuccessAlert', 'addMessageToMessageList']),
		sendMessage() {
			if (this.content !== '') {
				this.$socket.emit('createMessage', { roomId: this.getRoomId, sender: this.oidcUser.preferred_username, receiver: this.data.user.username, content: this.content })
				this.content = ''
			}
		}
	}
}
</script>
<style>
.message-outer {
	width: 100%;
	float: left;
}
.message-inner-left {
	float: left;
	padding: 4px;
	color: white;
	border-radius: 8px;
	max-width: 480px;
}
.message-inner-right {
	float: right;
	padding: 4px;
	color: white;
	border-radius: 8px;
	max-width: 480px;
}
.message-list {
	height: 360px;
	max-height: 360px;
	overflow-y: auto;
	padding: 4px;
}
</style>
