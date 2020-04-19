<template>
  <div class="d-flex flex-column h-100 p-2 rounded chat-box">
		<div class="flex-1 d-flex flex-column chat-message-box mb-1">
			<div 
				class="message p-1" 
				v-for="(message,i) of messages" 
				:key="i"
			>
				<div v-if="message.type=='message'"><span>{{message.username}}</span> : {{message.m}}</div>
				<div v-if="message.type=='guessed'" class="guessed"><span>{{message.username}}</span> : {{message.m}}</div>
				<div 
					v-if="message.type=='announcement'"
					class="text-center"
					:class="{ left : message.left, 'join': message.joined, }"
				>
					{{message.m}}
				</div>
				<div 
					v-if="message.type=='correct'"
					class="text-center correct"
				>
				{{message.username===$store.state.user.username ? 'You' : message.username}} guessed the word
				</div>

			</div>
		</div>
    <div>
			<b-form-input 
			placeholder="Type tour guess here..."
			v-model="chatMessage" 
			@keyup.enter.prevent="sendMessage"
			/>
		</div>	
  </div>
</template>

<script>
export default {
	name:'Chatbox',
	data:()=> ({
		chatMessage:'',
		messages:[]
		// {
		// 	username:'overlord',
		// 	m:'hi',
		// 	type:'message'
		// },{
		// 	m:'potato left the game',
		// 	left:true
		// },{
			
		// }
	}),
	methods: {
		sendMessage() {
			if (!this.chatMessage) return

			const roomId = this.$route.params.id
			this.$socket.client.emit('message', {
				roomId,
				message:{
					username:this.$store.state.user.username,
					m: this.chatMessage,
					type:'message'
				}
			});
			this.chatMessage=''
		},
		getRandomColor() {
			const letters = '0123456789ABCDEF';
			let color = '#';
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
	},
	sockets: {
		message(message) {
			this.messages.push(message)
		}
	}
}
</script>

<style>
	.chat-box {
		background:#EEEEEE;
	}
	.chat-message-box {
		flex:1;
		justify-content: flex-end;
		overflow-y:auto;
	}
	.message:nth-child(2n) {
		background: white;
	}
	.left {
		font-weight:bolder;
		color:red;
	}
	.join,.correct {
		font-weight: bold;
		color:green;
	}
	.guessed {
		color:rgb(85, 216, 85);
	}
</style>