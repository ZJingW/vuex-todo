import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'  //异步操作

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有的任务列表
    list:[],
    //文本框的内容
    inputValue:'aaa',
    //下一个id
    nextId:5,
    str :'all'

  },
  mutations: {
    initList(state,a){
      state.list = a

    },
    //为store的InputValue赋值
    setInputValue(state,val){
      state.inputValue = val
    },
    addItem(state){
      const obj = {
        id:state.nextId,
        info:state.inputValue.trim(),
        done:false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ""
    },
    removeItem(state,id){
      //根据id查找索引
     const i = state.list.findIndex(x=>x.id===id)
      if(i !== -1){  //找不到返回-1
        state.list.splice(i,1)
      }
    },
    //修改选中的状态
    checkStatus(state,param){
    const i = state.list.findIndex(x=> x.id===param.id)
    if(i !==-1){
      state.list[i].done = param.status
    }
  },
  cleanDown(state){
    state.list=state.list.filter(x =>x.done ===false)
  },
//按钮高亮
  changeStr(state,str){
    state.str = str
  }
  },
  actions: {
    getList(context){
      axios.get('/list.json').then(({data})=>{
       // console.log(data)
        context.commit('initList',data)
      })
    }
  },
  getters:{
    unDone(state){
     return state.list.filter(x=>x.done===false)
      .length
    },
    infoList(state){
      if(state.str ==='all'){
        return state.list
      }
      if(state.str === 'undone'){
        return state.list.filter
        (x=>!x.done)
      }
      if(state.str==='done'){
        return state.list.filter
        (x=>x.done)
      }
      return state.list
    }


  },
  modules: {
  }
})
