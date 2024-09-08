<template>
	<div>
        <span @click="changeTheme()" class="cursor-pointer text-primaryGrey">
            <v-menu open-on-hover location="top">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" :color="color" :size="size">{{ darkTheme == 1 ? 'mdi:mdi-white-balance-sunny' : 'mdi:mdi-weather-night' }}</v-icon>
                    <span class="ml-2" v-if="showText">{{ darkTheme == 1 ? "Light" : "Dark" }}</span>
                </template>
                <v-card class="pa-3 text-primaryGrey" rounded="0">{{ darkTheme == 1 ? "Light Theme" : "Dark Theme" }}</v-card>
            </v-menu>
        </span>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import { useTheme } from 'vuetify'
export default {
    data(){
        return {
            theme: useTheme()
        }
    },
    props: {
        // 显示文本值
        showText: {
            type: Boolean,
            default: false
        },
        // 图标大小
        size: {
            type: [Number, String],
            default: 28
        },
        // 主题颜色
        color: {
            type: String,
            default: null
        },
    },
    components: {  },
    created(){

    },
    mounted(){

    },
    computed: {
        ...mapGetters(["darkTheme"])
    },
    watch:{

    },
    methods: {
        // 切换主题
        changeTheme() {
            let newDark = !(this.darkTheme == 1) ? 1 : 0;
            this.$store.dispatch("darkThemeHandler", newDark);
            this.theme.global.name = ((newDark == 1) ? 'dark' : 'light');
        },
    }
}
</script>
<style scoped>

</style>