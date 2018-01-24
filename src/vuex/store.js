import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	silderVal:0,//滑动值
}

//Mutations修改状态
const mutations={
	// Update_DataNumChoiceCode(state,params){
	// 	state.DataNumChoiceCode = params.DataNumChoiceCode;
	// }
}

export default new Vuex.Store({
    state,mutations
})
