import store from '@/store'

const state = () => ({
	// 语言环境
	locale: 'en-US',
	// 黑色主题，1是true，0是false
	darkTheme: 1,
    // 认证令牌
	token: null,
    // GitHub 令牌对象
	githubToken: null,
	// 用户对象
	user: {},
})

const getters = {
	locale: state => {
		let locale = localStorage.getItem('merkle-tree-converter-locale');
		if (locale != null) {
			state.locale = locale;
		} else {
			localStorage.setItem('merkle-tree-converter-locale', 'en-US');
			state.locale = 'en-US';
		}
		return state.locale;
	},
	darkTheme: state => {
		let darkTheme = localStorage.getItem('merkle-tree-converter-darkTheme');
		if (darkTheme != null) {
			state.darkTheme = darkTheme;
		} else {
			// 默认设置为黑暗主题
            darkTheme = 1;
			localStorage.setItem('merkle-tree-converter-darkTheme', darkTheme);
			state.darkTheme = darkTheme;
		}
		return state.darkTheme;
	},
    token: state => {
		if (state.token) {
			return state.token;
		}
		state.token = localStorage.getItem('merkle-tree-converter-token');
		return state.token;
	},
    githubToken: state => {
		if (state.githubToken) {
			return state.githubToken;
		}
		state.githubToken = JSON.parse(localStorage.getItem('merkle-tree-converter-githubToken'));
		return state.githubToken;
	},
	user: state => {
		if (state.user) {
			return state.user;
		}
		state.user = JSON.parse(localStorage.getItem('merkle-tree-converter-user'));
		return state.user;
	},
}

const actions = {
	localeHandler(context, payload){
		context.commit('localeHandler', payload);
	},
	darkThemeHandler(context, payload){
		context.commit('darkThemeHandler', payload);
	},
    tokenHandler(context, payload){
		context.commit('tokenHandler', payload);
	},
    githubTokenHandler(context, payload){
		context.commit('githubTokenHandler', payload);
	},
	userHandler(context, payload){
		context.commit('userHandler', payload);
	},
}

const mutations = {
	localeHandler(state, locale){
		localStorage.setItem("merkle-tree-converter-locale", locale);
		state.locale = locale;
	},
	darkThemeHandler(state, darkTheme){
		localStorage.setItem("merkle-tree-converter-darkTheme", darkTheme);
		state.darkTheme = darkTheme;
	},
    tokenHandler(state, token){
		if(token == null){
            // 删除 token
			localStorage.removeItem('merkle-tree-converter-token');
            // 删除用户信息
            localStorage.removeItem('merkle-tree-converter-user');
		} else {
			localStorage.setItem('merkle-tree-converter-token', token);
		}
		state.token = token;
	},
    githubTokenHandler(state, githubToken){
		localStorage.setItem('merkle-tree-converter-githubToken', JSON.stringify(githubToken));
		state.githubToken = githubToken;
	},
	userHandler(state, user){
		localStorage.setItem('merkle-tree-converter-user', JSON.stringify(user));
		state.user = user;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}