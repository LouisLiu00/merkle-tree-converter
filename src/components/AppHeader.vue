<template>
    <v-app-bar elevation="6">
        <template v-slot:prepend>
            <a href="/" target="_self">
                <v-btn icon>
                    <v-avatar image="@/assets/logo/logo.svg"></v-avatar>
                </v-btn>
            </a>
        </template>
        <v-app-bar-title class="font-weight-black">
            <span>MerkleTree</span>
            <span class="text-primary">Converter</span>
        </v-app-bar-title>
        <template v-slot:append>
            <Profile class="mr-5"></Profile>
            <Theme size="32" class="mr-2"></Theme>
        </template>
    </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
import Profile from "@/components/Profile.vue";
import Theme from "@/components/Theme.vue";
export default {
    data(){
        return {

        }
    },
    components: { Profile, Theme },
    created(){

    },
    mounted(){

    },
    computed: {
        ...mapGetters(['token'])
    },
    watch:{

    },
    methods: {

    }
}
</script>
<style>

</style>
