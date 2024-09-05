<template>
	<div>
        <!-- 登录按钮 -->
        <span v-if="token == null">
            <v-btn color="primary" prepend-icon="mdi-github" class="text-none" variant="flat" flat :loading="signInLoading" @click="signInWithGitHub" rel="Sign in with GitHub">Sign in with GitHub</v-btn>
        </span>
        <!-- 用户头像菜单 -->
        <span v-else>
            <v-avatar icon size="small" class="cursor-pointer">
                <v-icon v-if="!user.avatar_url" color="primary" aria-label="account-circle-outline" icon="mdi:mdi-account-circle-outline" size="36"></v-icon>
                <v-img v-if="user.avatar_url" :src="user.avatar_url" cover height="36"></v-img>
                <v-menu activator="parent" width="250" transition="slide-y-transition" open-on-hover>
                    <v-list>
                        <v-list-item>
                            <a :href="`https://github.com/${user.login}`" target="_blank" :rel="user.login" class="text-white-reverse text-decoration-none">
                                <v-list-item-title>
                                    <v-icon icon="mdi:mdi-account-outline" aria-label="mdi-account-outline" class="mr-3"></v-icon>
                                    <span>{{ user.name }} ({{ '@' + user.login }})</span>
                                </v-list-item-title>
                            </a>
                        </v-list-item>
                        <v-divider></v-divider>
                        <!-- 退出 -->
                        <v-list-item>
                            <v-list-item-title class="cursor-pointer" @click="logout">
                                <v-icon icon="mdi:mdi-logout-variant" aria-label="logout-variant"></v-icon>
                                <a class="ml-3">Log Out</a>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-avatar>
        </span>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
    data(){
        return {
            // GitHub 授权回调码
            githubCallbackCode: this.$route.query.code,
            // 当前 URL
            currentUrl: window.location.href,
            // 登录加载中
            signInLoading: false,
        }
    },
    components: {  },
    created(){
        
    },
    mounted(){
        this.$nextTick(() => {
            if (this.token) {
                // 查询用户
                this.getUser();
            }
            // 必须延迟才能获取到参数
            setTimeout(() => {
                if (this.$route.query.code) {
                    this.githubCallbackCode = this.$route.query.code;
                    this.authorizing();
                }
            }, 10);
        });
    },
    computed: {
        ...mapGetters(['token', 'user'])
    },
    watch:{
        $route: {
            handler(n, o) {
                this.currentUrl = window.location.href;
            },
            immediate: true
        },
    },
    methods: {
        // 登录
        signInWithGitHub() {
            // 移除链接最后的 /
            if (this.currentUrl != null && this.currentUrl.substring(this.currentUrl.length - 1, this.currentUrl.length) == '/') {
                this.currentUrl = this.currentUrl.substring(0, this.currentUrl.length - 1);
            }
            console.log(this.currentUrl);
            // 重定向到 GitHub 授权页面
            window.location.href = 'https://github.com/login/oauth/authorize?client_id=Iv23liumB35CcpJjLDHn&redirect_uri=' + this.currentUrl;
        },
        // 授权
        async authorizing() {
            console.log('Authorizing OAuth apps...');
            // 加载中
            this.signInLoading = true;
            let body = {
                "client_id": "Iv23liumB35CcpJjLDHn",
                "client_secret": "806801d3a51b59316ba6c8f20d14c654f7afaf79",
                "code": this.githubCallbackCode
            };
            // Authorizing OAuth apps - https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
            let res = await axios({
                method: "post",
                url: '/github/login/oauth/access_token',
                headers: {
                    'Accept': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
                data: body
            });
            // 加载完成
            this.signInLoading = false;
            let data = res.data;
            if (data.error_description != null) {
                // 移除参数
                this.$router.replace({ query: { } });
                alert(data.error_description);
            } else {
                this.$store.dispatch("tokenHandler", data.access_token);
                this.$store.dispatch("githubTokenHandler", data);
                // 查询用户
                this.getUser();
            }
        },
        // 查询用户
        async getUser() {
            // 加载中
            this.signInLoading = true;
            // 移除参数
            this.$router.replace({ query: { } });
            // Get the authenticated user - https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
            let res = await axios({
                method: "get",
                url: '/github-api/user',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': 'Bearer ' + this.token,
                    'X-GitHub-Api-Version': '2022-11-28',
                }
            });
            // 加载完成
            this.signInLoading = false;
            let data = res.data;
            if (data.error_description != null) {
                alert(data.error_description);
            } else {
                this.$store.dispatch("userHandler", data);
            }
        },
        // 退出登录
        logout(){
            this.$store.commit("tokenHandler", null);
            this.$store.commit("githubTokenHandler", null);
            this.$store.commit("userHandler", null);
            this.$router.push("/");
            setTimeout(() => location.reload(), 100);
        },
    }
}
</script>
<style scoped>

</style>