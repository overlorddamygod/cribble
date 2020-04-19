<template>
  <div class="h-100 d-flex flex-column">
    <b-row class="w-100 top d-flex align-items-center">
      <b-col cols="2">Time {{`${turn.username}'s turn`}} Round: {{round}}</b-col>
      <b-col cols="9" class="text-center"><span class="options">{{optionWord}}</span></b-col>
      <b-col cols="1">
        <button 
          type="button" 
          class="btn btn-danger"
          @click="$router.push({name: 'Home'})"
        >Leave
        </button>
      </b-col>
    </b-row>
    <b-row class="box h-100">
      <b-col cols="1" class="d-flex flex-column">
        <div 
          v-for="player in players"
          :key="player.playerId"
          class="d-flex"
        >
          <div>
            <b-avatar :title="a"/>
            <p>
              {{player.username}}
            </p>
          </div>
          <div>
            <span v-if="player.playerId==turn.id"><img src="https://img.icons8.com/cute-clipart/64/000000/pencil.png"/></span>
          </div>
          
        </div>

      </b-col>
      <b-col cols="7" class="rel">
        <button @click="startGame" v-if="!started">Start</button>
        <b-form-input 
          placeholder="Enter the word"
          v-model="word" 
          @keyup.enter.prevent="sendWord"
          v-if="turn.id==id"
        />
        <Whiteboard 
          :roomId="roomId"
          :image64="image64"
          :myTurn="turn.id==id"
        />
      </b-col>
      <b-col cols="4" class="h-100">
        <ChatBox/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChatBox from '../components/ChatBox'
import Whiteboard from '../components/Whiteboard'

export default {
  name: 'Home',
  components: {
    ChatBox,
    Whiteboard
  },
  data:()=>({
    id:'',
    word:'',
    optionWord:'',
    players:[],
    roomId:'',
    image64:'',
    turn:'',
    round:1,
    started:false,
    timeUp:false
  }),
  created() {
    this.roomId = this.$route.params.id
    this.$socket.client.emit('join',{
      roomId:this.roomId,
      username:this.$store.state.user.username
    })
    this.$socket.client.emit('getPlayers',this.roomId)
  },
  methods: {
    startGame() {
      this.$socket.client.emit('start',this.roomId);
    },
    sendWord() {
      if (!this.word) return 
      this.$socket.client.emit('sendWord',{
        roomId:this.$route.params.id,
        word:this.word
      })
    },

  },
  sockets: {
    noRoom() {
      this.$router.push({name: 'Home'});
    },
    players(players) {
      this.players = Object.keys(players).map(function (key) { return players[key]; });
    },
    playerDisconnected(player) {
      this.players = this.players.filter(({playerId})=> playerId != player.playerId)
    },
    optionWord(word) {
      if(this.turn.id ==this.id) {
        this.optionWord = word.word
      } else {
        this.optionWord = word.optionWord
      }
    },
    timeUp(players) {
      this.optionWord=''
      console.log(players)
    },
    start(player) {
      this.turn = player
      // console.log(player,'turn')
    },
    rounds(round) {
      this.round = round
    },
    started() {
      this.started=true
    },
    myId(id) {
      this.id = id
    }
    // image(image64) {
    //   this.image64=image64
    // }
  }
}
</script>

<style scoped>
.top {
  height:13%;
  /* justify-content: center; */
}
.options {
  letter-spacing: 1rem;
  font-size:2rem
}
.rel{
  position: relative;
}

</style>