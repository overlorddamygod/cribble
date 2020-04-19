const state = {
    roomId:'',
    username:''
}
const mutations = {
    changeUsername (state,username) {
        state.username=username
    },
    joinRoom (state,roomId) {
        state.roomId=roomId
    }
}
const actions ={
    changeUser ({commit},username) {
        commit('changeUsername',username)
    },
    joinRoom({commit},roomId) {
        commit('joinRoom',roomId)
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
}