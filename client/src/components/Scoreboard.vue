<template>
    <div class="scoreboard d-flex flex-column justify-content-center align-items-center">
        <div class="innerboard d-flex flex-column align-items-center">
            <h1 class="title">Scoreboard</h1>
            <b-row class="points">
                <b-col v-for="player in players" :key="player.id" cols="4" class ="d-flex flex-column justify-content-center align-items-center">
                    <b-avatar text="" />
                    <div>
                        {{player.username}}
                    </div>
                    Points : {{player.points}}
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'players'
    ]
}
</script>

<style scoped>
.scoreboard {
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
    width:60%;
}
.points {
    width:100%;
    flex:1;
    justify-content: space-evenly;
}
</style>