import { mapGetters } from "vuex";
import { useTheme } from 'vuetify'

// 参考https://cn.vuejs.org/guide/reusability/plugins.html
export default {
	install: (app, options) => {
		// 注入组件选项
		app.mixin({
		    created: function () {
                // 初始化自适应屏幕
                this.initResponsive();
                // 设置主题
		        this.setTheme();
		    },
		    computed:{
	            ...mapGetters(['responsive', 'darkTheme'])
	      	},
		    methods: {
		    	// 定义加载数据的函数
				// 设置主题
		    	setTheme(){
                    // 主题对象
                    const theme = useTheme()
                    // 当前的黑暗主题设置
                    let currentDark = (this.darkTheme == 1) ? 1 : 0;
                    // 从地址栏获取的主题
				    let targetTheme = this.$route.query.theme;
                    // 不为空则需要切换主题
                    if(targetTheme) {
                        // 切换为白色主题
                        if (targetTheme == 'light') {
                            this.$store.dispatch('darkThemeHandler', 0);
                            theme.global.name.value = 'light';
                        }
                        // 切换为黑色主题
                        if (targetTheme == 'dark') {
                            this.$store.dispatch('darkThemeHandler', 1);
                            theme.global.name.value = 'dark';
                        }
                        // 其余状态不切换
                        // 切换完成后刷新页面去除参数
                        const newQuery = { ...this.$route.query };
                        // 删除theme参数
                        delete newQuery.theme;
                        // 再路由到新的参数
                        this.$router.push({ path: this.$route.path, query: newQuery } );
                    } else {
                        // 如果没有目标主题，则设置缓存主题
                        theme.global.name.value = currentDark ? 'dark' : 'light';
                    }
				},
                // 初始化自适应屏幕
		    	initResponsive(){
					var ua = navigator.userAgent,
			        isWindowsPhone = /(?:Windows Phone)/.test(ua),
			        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			        isAndroid = /(?:Android)/.test(ua),
					isFireFox = /(?:Firefox)/.test(ua),
					isIPad = (ua.indexOf("iPad") > 0),  
					isChrome = /(?:Chrome|CriOS)/.test(ua), 
					// isSmallScreen = (windows.screen.width <= 1336 && windows.screen.width > 736),  
					isSmallScreen = (document.body.clientWidth <= 1440),  
					isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
					isPhone = /(?:iPhone)/.test(ua) && !isTablet,
					isPC = !isPhone && !isAndroid && !isSymbian && !isSmallScreen;
                    let res = 'mobile';
			        if ((isAndroid || isPhone) && document.body.clientWidth < 960 ) {
				    	res = 'mobile';
				    } else if ((isTablet || isIPad)) {
                        res = 'pad';
				    } else if(isPC || isSmallScreen) {
                        res = 'pc';
				    } else {
                        res = 'mobile';
					}
                    this.$store.dispatch('responsiveHandler', res);
			    },
		  	}
		})
	}
}
