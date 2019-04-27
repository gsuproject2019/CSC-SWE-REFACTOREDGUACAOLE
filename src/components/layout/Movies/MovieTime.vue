<template>
    <!--login form popup-->
   <transition name="modal">
    <div class="modal-mask wrap-schedule">
      <div class="modal-wrapper"  @click="$emit('closeMovieTime')">
        <div class="modal-container" @click.stop>

          <div class="modal-header">
            <slot name="header">
              <h3 style="display:inline;">SHOWTIMES</h3>
            </slot>
             <button class="modal-default-button buttonX" @click="$emit('closeMovieTime')">X</button>
          </div>
          <div class="modal-body body-schedule">
            <slot name="body">                    
                <div class="row">
                  
                    <hr class="line">
                    	<tabs :options="{ useUrlFragment: false }" class="wrap-tab-schedule" @clicked="tabClicked" @changed="tabChanged">
							<tab class="custom-tab" name="Sun." suffix="<br class='badge'>4/21</br>">
                                <ul class="logo" style="text-align: left">
                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>AMC Theatres</span>
                                            </li>
                                            <li v-if="getMovieMondayAMC[0]">
                                                <ul class="ul-time">
                                                     <router-link tag="li" :to="{name: 'BookTicket', query:{movie_id: getMovieMondayAMC[0].movie_id, time_id:show_time.time_id}}" v-for="(show_time, index) in getMovieMondayAMC[0].show_time" :key="index"><button class="btn-time">{{ show_time.time }}</button></router-link>
                                                </ul>
                                            </li>
                                            <li v-else>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                           
                                    </li>

                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>NCG Cinemas</span>
                                            </li>
                                            <li v-if="getMovieMondayNCG[0]">
                                                <ul class="ul-time">
                                                   <router-link tag="li" :to="{name: 'BookTicket', query:{movie_id: getMovieMondayNCG[0].movie_id, time_id:show_time.time_id}}" v-for="(show_time, index) in getMovieMondayNCG[0].show_time" :key="index"><button class="btn-time">{{ show_time.time }}</button></router-link>
                                                </ul>
                                            </li>
                                             <li v-else>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>Regal Cinemas</span>
                                            </li>
                                            <li v-if="getMovieMondayREGAL[0]">
                                                <ul class="ul-time">
                                                     <router-link tag="li" :to="{name: 'BookTicket', query:{movie_id: getMovieMondayREGAL[0].movie_id, time_id:show_time.time_id}}" v-for="(show_time, index) in getMovieMondayREGAL[0].show_time" :key="index"><button class="btn-time">{{ show_time.time }}</button></router-link>
                                                </ul>
                                            </li>
                                             <li v-else>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
							</tab>
							<tab name="Mon." suffix="<br class='badge'>4/22</br>">
								<ul class="logo" style="text-align: left">
                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>AMC Theatres</span>
                                            </li>
                                            <li>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                           
                                    </li>
                      
                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>NCG Cinemas</span>
                                            </li>
                                            <li>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="cine-time">
                                            <li class="list-logo">
                                                <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                <span>Regal Cinemas</span>
                                            </li>
                                            <li>
                                                <p style="text-align: center">No Showtimes Available</p>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
							</tab>
                        <tab name="Tues." suffix="<br class='badge'>4/23</br>">
							<ul class="logo" style="text-align: left">
                                <li>
                                    <ul class="cine-time">
                                        <li class="list-logo">
                                            <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                            <span>AMC Theatres</span>
                                        </li>
                                        <li>
                                            <p style="text-align: center">No Showtimes Available</p>
                                        </li>
                                    </ul>
                           
                        </li>
                      
                        <li>
                            <ul class="cine-time">
                                <li class="list-logo">
                                     <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                     <span>NCG Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                             <ul class="cine-time">
                                <li class="list-logo">
                                     <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                     <span>Regal Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
				</tab>
                <tab name="Wed." suffix="<br class='badge'>4/24</br>">
					<ul class="logo" style="text-align: left">
                        <li>
                            <ul class="cine-time">
                                <li class="list-logo">
                                     <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                     <span>AMC Theatres</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                           
                        </li>
                      
                        <li>
                            <ul class="cine-time">
                                <li class="list-logo">
                                     <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                     <span>NCG Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                             <ul class="cine-time">
                                <li class="list-logo">
                                     <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                     <span>Regal Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                    </ul>	
			</tab>
            <tab name="Thurs." suffix="<br class='badge'>4/25</br>">
                <ul class="logo" style="text-align: left">
                     <li>
                        <ul class="cine-time">
                            <li class="list-logo">
                                <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                <span>AMC Theatres</span>
                            </li>
                            <li>
                                <p style="text-align: center">No Showtimes Available</p>
                            </li>
                        </ul>
                                            
                    </li>
                                        
                        <li>
                            <ul class="cine-time">
                                <li class="list-logo">
                                    <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                    <span>NCG Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul class="cine-time">
                                <li class="list-logo">
                                    <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                    <span>Regal Cinemas</span>
                                </li>
                                <li>
                                    <p style="text-align: center">No Showtimes Available</p>
                                </li>
                            </ul>
                        </li>
                            </ul>	
										</tab>
                                        <tab name="Fri." suffix="<br class='badge'>4/26</br>">
                                                                <ul class="logo" style="text-align: left">
                                            <li>
                                                <ul class="cine-time">
                                                    <li class="list-logo">
                                                        <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                        <span>AMC Theatres</span>
                                                    </li>
                                                      <li>
                                                        <p style="text-align: center">No Showtimes Available</p>
                                                    </li>
                                                </ul>
                                            
                                            </li>
                                        
                                            <li>
                                                <ul class="cine-time">
                                                    <li class="list-logo">
                                                        <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                        <span>NCG Cinemas</span>
                                                    </li>
                                                    <li>
                                                        <p style="text-align: center">No Showtimes Available</p>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <ul class="cine-time">
                                                    <li class="list-logo">
                                                        <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                        <span>Regal Cinemas</span>
                                                    </li>
                                                    <li>
                                                        <p style="text-align: center">No Showtimes Available</p>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
										</tab>
                                    <tab name="Sat." suffix="<br class='badge'>4/27</br>">
                                                                    <ul class="logo" style="text-align: left">
                                                <li>
                                                    <ul class="cine-time">
                                                        <li class="list-logo">
                                                            <img src="/static/images/uploads/amc.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                            <span>AMC Theatres</span>
                                                        </li>
                                                        <li>
                                                            <p style="text-align: center">No Showtimes Available</p>
                                                        </li>
                                                    </ul>
                                                
                                                </li>
                                            
                                                <li>
                                                    <ul class="cine-time">
                                                        <li class="list-logo">
                                                            <img src="/static/images/uploads/ncg.jpg" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                            <span>NCG Cinemas</span>
                                                        </li>
                                                         <li>
                                                            <p style="text-align: center">No Showtimes Available</p>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul class="cine-time">
                                                        <li class="list-logo">
                                                            <img src="/static/images/uploads/regal.png" style="width:60px;height:60px;border-radius:50%;cursor:pointer;" alt="">
                                                            <span>Regal Cinemas</span>
                                                        </li>
                                                        <li>
                                                            <p style="text-align: center">No Showtimes Available</p>
                                                        </li>
                                                    </ul>
                                                </li>
                                                </ul>	
					    </tab>

    				</tabs>
                     
                </div>
            </slot>
          </div>
            <div class="modal-footer">
                <button @click="$emit('closeMovieTime')" class="button2">
                      Close
                </button>
            </div>

        </div>
      </div>
    </div>
  </transition> 
    <!--end of login form popup-->

    <!-- modal vue -->


    <!-- end modal vue -->

</template>

<script>

    export default {
        computed: {
            getMovieMondayAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'monday', 'amc');},
            getMovieMondayNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'monday', 'ncg');},
            getMovieMondayREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'monday', 'regal');},
            getMovieTuesdayAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'tuesday', 'amc');},
            getMovieTuesdayNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'tuesday', 'ncg');},
            getMovieTuesdayREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'tuesday', 'regal');},
            getMovieWedAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'wed', 'amc');},
            getMovieWedNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'wed', 'ncg');},
            getMovieWedREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'wed', 'regal');},
            getMovieThuAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'thu', 'amc');},
            getMovieThuNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'thu', 'ncg');},
            getMovieThuREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'thu', 'regal');},
            getMovieFriAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'fri', 'amc');},
            getMovieFriNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'fri', 'ncg');},
            getMovieFriREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'fri', 'regal');},
            getMovieSatAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sat', 'amc');},
            getMovieSatNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sat', 'ncg');},
            getMovieSatREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sat', 'regal');},
            getMovieSunAMC() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sun', 'amc');},
            getMovieSunNCG() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sun', 'ncg');},
            getMovieSunREGAL() {return this.$store.getters.getMovieTime(this.$route.params.id, 'sun', 'regal');}

        },
        methods: {
            tabClicked (selectedTab) {
            },
            tabChanged (selectedTab) {
            },
            
        }
    }
</script>

<style scoped>

.wrap-schedule p {
    margin-bottom: 0;
    
}
ul.date li {
    display: inline-block;
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
}
ul.date li {
    border-bottom: 2px solid gray; 
}
ul.date li p {
 color: #a0b3d5;
 font-weight: bold;
}
ul.date li:hover {
   /* border: 2px solid white;
   border-radius: 5px; */
    border-bottom: 2px solid #ff005a;
}
ul.date li.active {
     border-bottom: 2px solid #ff005a;
}
hr.line {
    border-top: 2px solid #ff005a;
}
ul.logo {
    margin-top: 50px;
}
/* ul.logo li {
    margin-bottom: 30px;
} */

ul.cine-time {
    margin-bottom: 30px;
}
ul.cine-time li{
    display: inline-block;
}
ul.cine-time li p{
    margin-left: 90px;
   color: #d12121;
   font-weight: bold;
   text-transform: uppercase;
   font-size: 16px;
}
ul.cine-time li.list-logo{
    min-width: 180px;
}
ul.cine-time li.list-logo span{
   color: #42b983;
   font-weight: bold;
}
ul.ul-time {
    margin-left: 100px;
}
ul.ul-time li {
    margin-right: 20px !important;
}

ul.ul-time li button{
    color: aliceblue;
    font-size: 20px;
    font-weight: bold;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background: #09071299;
    cursor: pointer;
} 
ul.ul-time li button:hover{
    color: aliceblue;
    width: 100px;
    height: 45px;
    border-radius: 5px;
    background: #5bbd2099;
    cursor: pointer;
} 
.modal-mask {

  position: fixed;
z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.modal-container {
   
    color: white;
  width: 669px;
  position: fixed-top;
  margin: 0px auto;
  padding: 20px 30px;
   background: url(/static/img/slider-bg.ae23a17.jpg) center no-repeat;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 7px rgba(223, 211, 211, 0.33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-footer {
    text-align: center;
}
.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* CSS FOR VUE TAB */
	.tabs-component.wrap-tab-schedule ul.tabs-component-tabs {
		/* border: solid 1px #ddd; */
		border-radius: 6px;
		margin-bottom: 5px;
        margin-left: 38px; 
        
		}
		@media (min-width: 700px) {
		.tabs-component.wrap-tab-schedule ul.tabs-component-tabs {
			border: 0;
			align-items: stretch;
			display: flex;
			justify-content: flex-start;
			margin-bottom: 5px;
            margin-left: 38px;
		}
		}
		
		.wrap-schedule .tabs-component-tab {
		color: #999;
		font-size: 14px;
		font-weight: 600;
		margin-right: 0;
		list-style: none;
		}
		
		/* .tabs-component-tab:not(:last-child) {
		border-bottom: dotted 1px #ddd;
		} */
		
		.wrap-schedule .tabs-component-tab-a:hover {
		color: #919963;
		}
		.wrap-schedule .tabs-component-tab.is-active a {
		color: #dcf836 !important;
		}
		
		.wrap-schedule .tabs-component-tab.is-disabled * {
		color: #cdcdcd;
		cursor: not-allowed !important;
		}
		
		@media (min-width: 700px) {
		.wrap-schedule .tabs-component-tab {
			background-color: transparent;
			border-radius: 3px 3px 0 0;
			margin-right: .5em;
			transform: translateY(2px);
			transition: transform .3s ease;
		}
		
		.wrap-schedule .tabs-component-tab.is-active {
			z-index: 2;
			transform: translateY(0);
		}
		}
		
		.wrap-schedule .tabs-component-tab-a {
		align-items: center;
		color: inherit;
		display: flex;
		padding: .75em 1em;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 14px;
		font-family:  "Noto Sans", sans-serif;
		font-weight: bold;
		}
		
		.wrap-schedule .tabs-component-panels {
            padding: 0 !important;
		}
		
		@media (min-width: 700px) {
		.wrap-schedule .tabs-component-panels {
			border-top-left-radius: 0;
			background-color:transparent;
			/* border: solid 1px #405266; */
			border-radius: 0 6px 6px 6px;
			box-shadow: 0 0 10px rgba(0, 0, 0, .05);
			padding: 0.5em 2em;
			margin-top: 30px;
		}
		}
		.wrap-schedule .tabs-component .movie-items .movie-item .mv-img{
		position: relative;
		margin-right: 0 !important;
		border-radius: 5px;
	}
		.wrap-schedule .tabs-component-tab.is-active a {
			color: #dcf836 !important;
			border-bottom: 3px solid #dcf836;
	}
		.wrap-schedule .tabs-component-tab {
			padding-top : 19px;
		}
</style>
