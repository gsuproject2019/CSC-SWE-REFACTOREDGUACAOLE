<template>
    <div class="wrap-content">
            <appHeader />
            <appMainSlider />
            <appMovieContent />
    </div>

</template>

<script>

import Header from '@/components/layout/public/Header.vue'
import MainSlider from '@/components/layout/HomePage/MainSlider.vue'
import Login from '@/components/layout/public/Login.vue'
import SignUp from '@/components/layout/public/SignUp.vue'
import MovieContent from '@/components/layout/HomePage/MovieContent.vue'

    export default {
        computed : {
            movies() {
                return this.$store.getters.movies;
            }
        }, 
        created() {
            console.log('created');
           this.fetchAllMovies();
           
        },
 
        methods: {
            fetchAllMovies() {
                this.$store.dispatch("getEveryMovie").then(() => {
                })
            }
        },
        components: {
            appHeader : Header,
            appMainSlider: MainSlider,
            appLogin : Login,
            appSignUp : SignUp,
            appMovieContent : MovieContent,
           
        }
    }
</script>

<style>

</style>
    