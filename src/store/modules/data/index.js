const state = () => ({
	// 自适应屏幕: pc/mobile
	responsive: null,
})

const getters = {
	responsive: state => state.responsive,
}

const actions = {
	responsiveHandler(context, payload){
		context.commit('responsiveHandler', payload);
	},
}

const mutations = {
	responsiveHandler(state, responsive){
		state.responsive = responsive;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}