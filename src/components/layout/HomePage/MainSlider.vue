<template>

    <div class="slider movie-items">
		
	<div class="container">
		<div class="row">
			<div class="social-link">
				<p>Follow us: </p>
				<a href="https://www.facebook.com"><i class="ion-social-facebook"></i></a>
				<a href="https://www.twitter.com"><i class="ion-social-twitter"></i></a>
				<a href="https://www.instagram.com"><i class="ion-social-instagram"></i></a>
				<a href="https://www.youtube.com"><i class="ion-social-youtube"></i></a>
			</div>
			 <slick
		
        class="slick-multiItemSlider"
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        @breakpoint="handleBreakpoint"
        @destroy="handleDestroy"
        @edge="handleEdge"
        @init="handleInit"
        @reInit="handleReInit"
        @setPosition="handleSetPosition"
        @swipe="handleSwipe"
        @lazyLoaded="handleLazyLoaded"
        @lazyLoadError="handleLazeLoadError">
            	<div class="movie-item" v-for="(movie, index) in movies" :key="index">
	    			<div class="mv-img">
						
	    				<a href="#"><v-lazy-image
    						:src="movie.photoUrl"
    					
							width="285" height="437"
    					/></a>
	    			</div>
	    			<div class="title-in">
	    				<div class="cate">
	    					<span  v-for="(tag, index) in movie.tags" :class="tag" :key="index++"><a href="#">{{tag}}</a></span>
	    				</div>
	    				<h6><router-link tag="a" :to="'movie/'+movie.movie_id">{{movie.name}}</router-link></h6>
	    				<p><i class="ion-android-star"></i><span>{{movie.rating}}</span> /10</p>
	    			</div>
	    		</div>
			</slick>
	    </div>
	</div>
</div>
   
</template>

<script>
import Slick from 'vue-slick';
import VLazyImage from "v-lazy-image";

    export default {
        components: { Slick, VLazyImage },
            data() {
                return { 
                    slickOptions: {
						infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        arrows: true,
                        draggable:true,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        dots: true,
                        responsive: [
                        {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                        },
                        {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                        },
                        {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                        }
                    ]
                    },
                    // placeHolder: true,
                };
			},
		computed : {
			movies() {
				return this.$store.getters.movies;
			}
        },
        

    // All slick methods can be used too, example here
            methods: {
            next() {
                this.$refs.slick.next();
            },

            prev() {
                this.$refs.slick.prev();
            },

            reInit() {

                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },

            // Events listeners
            handleAfterChange(event, slick, currentSlide) {
            },
            handleBeforeChange(event, slick, currentSlide, nextSlide) {
            },
            handleBreakpoint(event, slick, breakpoint) {
            },
            handleDestroy(event, slick) {
            },
            handleEdge(event, slick, direction) {
            },
            handleInit(event, slick) {
            },
            handleReInit(event, slick) {
            },
            handleSetPosition(event, slick) {
            },
            handleSwipe(event, slick, direction) {
            },
            handleLazyLoaded(event, slick, image, imageSource) {
				console.log(imageSource);
            },
            handleLazeLoadError(event, slick, image, imageSource) {
            }
        }
    }
</script>

<style scoped>
 .v-lazy-image {
  filter: blur(10px);
  transition: filter 2s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
