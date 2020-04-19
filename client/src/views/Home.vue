<template>
  <b-row class="box">
    <input v-model="username" type="text"/>
    <button 
    type="button" 
    class="btn btn-success"
    @click="createGame"
    >Create
    </button>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    // ChatBox
  },
  data:()=>({
    username:''
  }),
  watch: {
    username:function (user){      
      this.$store.dispatch('user/changeUser',user)
    }
  },
  methods: {
    ...mapActions('user',['changeUser']),
    createGame() {
      this.$socket.client.emit('createGame',{
        username:this.$store.state.user.username
      })
    },
  },
  sockets:{
    gameCreated(roomId) {
      this.$router.push({name: 'game', params: {id:roomId}});
    }
  }
}
</script>

<style scoped>
</style>