<template>
    <div class="wordboard d-flex flex-column justify-content-center align-items-center">
        <div v-if="myTurn" class="innerboard d-flex flex-column align-items-center">
            <h1 class="title">Choose Word</h1>
            <div class="words d-flex align-items-center">
                <div v-for="word in words" 
                    :key="word" 
                    class="word"
                    @click="sendWord(word)"
                >
                    {{word}}
                </div>
            </div>
        </div>
        <div v-else class="innerboard d-flex flex-column align-items-center justify-content-center">
            <h2>{{turnOf.username}} is choosing a word</h2>
        </div>
    </div>
</template>

<script>
export default {
    data:()=>({
        words:[]
    }),
    props:[
        'myTurn',
        'turnOf'
    ],
    methods: {
        sendWord(word) {
            this.$socket.client.emit('sendWord',{
                roomId:this.$route.params.id,
                word
            })
        }
    },
    sockets: {
        words(word) {
            this.words=word
        }
    }
}
</script>

<style scoped>
.wordboard {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index:3;
      top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background:rgba(0, 0, 0, 0.7);    
  color:white
}

.innerboard {
    height: 50%;
    width:70%;
}
.words {
    width:100%;
    flex:1;
    justify-content: space-evenly;
}
.word {
    /* border:1px solid red; */
    padding:0.5rem 2rem;
    border-radius:5px;
    color:black;
    cursor:pointer;
    background: rgb(158, 158, 25);
    transition: all 0.3s ease-in-out;
}
.word:hover {
    transform: scale(1.2);
}
</style>