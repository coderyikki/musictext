import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        name:null,
        songs:null,
        url:null,
        pic:"https://p2.music.126.net/mIUtHBPTJ52H78_FhHzcWg==/19188676928210304.jpg",
        comment:null,
        isPlay:null,
    },
    mutations:{
        updateinfo(state,payload){
            state.name = payload.name;
            state.songs = payload.songs;
        },
        updateUrl(state,payload){
            state.url = payload.url;
        },
        updatePic(state,payload){
            state.pic = payload.pic;
        },
        updateComment(state,payload){
            state.comment = payload.comment;
        },
        updatemusicControl(state,payload){
            state.isPlay = payload.isPlay;
        }
    },
    actions:{
        
    },
    getters:{

    },
    modules:{

    }
})

export default store