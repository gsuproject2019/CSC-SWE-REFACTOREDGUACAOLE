<template>
<div class="wrap-book-ticket">
    <appHeader />
            <div class="hero common-hero">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="hero-ct">
                        <h1 style="text-align:center; margin-left: 0"> BOOKING</h1>
                        <ul class="breadcumb">
                            <li class="active"><a href="moviegrid.html#">Home</a></li>
                            <li> <span class="ion-ios-arrow-right"></span> BOOK TICKET</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-single">
        <div class="container">
            <div class="row ipad-width">
                <div class="col-md-7 col-sm-12 col-xs-12">

                    <div class="flex-wrap-movielist">
                           <img src="/static/images/uploads/screen.png" alt="">				
                    </div>		
                    <div class="exit-door">
                         <img src="/static/images/uploads/exit-door.png" alt="">
                    </div>
                    <div class="wrap-row" style="margin-top: 100px">
                        <div class="row-a seat-area">
                            <app-seat :disabled="isDisabled(seat.status)" @click.native="targetSeat(seat.seat_id, seat.seat_name, seat.serial)" v-for="seat in currentMovieRoom.listseat.RowA"  :key="seat.seat_id" :class="{ reserved: !seat.status }">{{ seat.seat_name }}</app-seat>
                        </div>
                        <div class="row-b seat-area">
                            <app-seat :disabled="isDisabled(seat.status)" @click.native="targetSeat(seat.seat_id, seat.seat_name, seat.serial)" v-for="seat in currentMovieRoom.listseat.RowB"  :key="seat.seat_id" :class="{ reserved: !seat.status }">{{ seat.seat_name }}</app-seat>
                        </div>
                        <div class="row-c seat-area">
                            <app-seat :disabled="isDisabled(seat.status)" @click.native="targetSeat(seat.seat_id, seat.seat_name, seat.serial)" v-for="seat in currentMovieRoom.listseat.RowC"  :key="seat.seat_id" :class="{ reserved: !seat.status }">{{ seat.seat_name }}</app-seat>
                        </div>
                        <div class="row-d seat-area">
                            <app-seat :disabled="isDisabled(seat.status)" @click.native="targetSeat(seat.seat_id, seat.seat_name, seat.serial)" v-for="seat in currentMovieRoom.listseat.RowD"  :key="seat.seat_id" :class="{ reserved: !seat.status }">{{ seat.seat_name }}</app-seat>
                        </div>
                    </div>
                   
                        <div class="note">
                            <ul>
                                <li>
                                    <button class="btn-free" style="background-color:rgba(72, 72, 78, 0.5)"></button>
                                    <span>Available</span>
                                </li>
                                <li>
                                    <button class="btn-reserved" style="background-color:#b01010e6"></button>
                                    <span>Unavailable</span>
                                </li>
                                <li>
                                    <button class="btn-selected" style="background-color: #85c325e6"></button>
                                    <span>Selected</span>
                                </li>
                            </ul>
                        </div>
                        <div class="reset">
                            <button class="btn-reset" @click="resetSelected">Clear</button>
                        </div>
                </div>
                <div class="col-md-5 col-sm-12 col-xs-12">
                    <div class="sidebar">
                        <div class="searh-form">
                            <h4 class="sb-title">Ticket Information</h4>
                            <form class="form-style-1" @submit.prevent="submitBookTicket">
                                <div class="row">
                                    <div class="col-md-12 form-it">
                                        <div class="col-md-4">
                                            <img :src="currentMovie[0].photoUrl" alt="" style="width:100%">
                                        </div>
                                        <div class="col-md-8">
                                            <router-link tag="a" class="title-movie" :to="{name: 'MovieElements', params: {id: this.$route.query.movie_id}}" style="width:100%;font-weight:bold; cursor:pointer">Movie: {{ currentMovie[0].name }}</router-link>
                                            <p>Theater: {{ currentMovieRoom.theater_name }}</p>
                                            <p>Time : {{ currentMovieRoom.show_time }}'</p>
                                            <p>Price: $10.00</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12 form-it">
                                        <label class="title">Combo & Promotion</label>
                                       <table>
                                           <tr>
                                                <th>Combo</th>
                                                <th>Unit price</th>
                                                <th>Amount</th>
                                                <th>Total</th>
                                           </tr>
                                          <tr>
                                              <td>
                                                  <img src="/static/images/uploads/combo-1.jpg" alt="">
                                                  <p>Combo 1</p>            
                                              </td>                      
                                              <td><span>$8.75</span></td>
                                              <td><input type="number" min="0" max="20" v-model="combo_1" name="combo-1" id="combo-1"></td>   
                                              <td><span>${{ combo_1 * 8.75 | formatCommas }}</span></td>
                                          </tr>
                                         <tr>
                                              <td>
                                                  <img src="/static/images/uploads/combo-2.jpg" alt="">
                                                   <p>Combo 2</p>
                                            </td>
                                                <td><span>$12.50</span></td>
                                              <td><input type="number" min="0" max="20" v-model="combo_2" name="combo-2" id="combo-2"></td>   
                                              <td><span>${{ combo_2 * 12.50 | formatCommas }}</span></td>
                                          </tr>
                                          <tr>
                                              <td>* Ticket 2D</td>
                                              <td>$10.00</td>
                                              <td><input type="text" readonly v-model="seatSelected.length" name="count-ticket" id="count-ticket"></td>
                                              <td>$ {{  this.seatSelected.length * 10.00 | formatCommas }}</td>
                                          </tr>
                                       </table>
                                    </div>
                                    <div class="col-md-12 form-it">
                                        <label class="title">Seat Location: {{ seatSelected.length }}</label>
                                        <div class="seat-selected">
                                            <p v-if="seatSelected.length==0">No seat selected!</p>
                                            <button class="seat" v-for="seat in seatNameSelected" :key="seat">{{ seat }}</button>
                                        </div>
                                    </div>
                                    <div class="col-md-12 form-it">
                                        <label class="title">Total:</label>
                                        <div class="total-pay" style="text-align:center">
                                            <p>${{ totalPay | formatCommas }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-12 ">
                                        <input class="submit" type="submit" value="Confirm seats" style="cursor:pointer">
                                    </div>
                                        <div class="demo-container">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Header from '@/components/layout/public/Header.vue'
import Seat from '@/components/layout/Ticket/Seat.vue'
import { eventBus } from '@/main.js'
    export default {
            data() {
                return {
                    seatSelected : [],
                    seatNameSelected : [],
                    seatSelectedRowA: [],
                    seatSelectedRowB: [],
                    seatSelectedRowC: [],
                    seatSelectedRowD: [],
                    combo_1: 0,
                    combo_2: 0

                }
            },
            computed: {
                currentMovie() {
				var movies = this.$store.getters.movies;
                var currentMovie = movies.filter(movie => movie.movie_id === this.$route.query.movie_id);
				return currentMovie;
                },
                currentMovieRoom() {
                
                    return this.$store.getters.getCurrentMovieRoom;
                },
                totalPay() {
                    if(this.combo_1 >= 0 && this.combo_2 >= 0) {
                        return this.seatSelected.length * 10.00 + this.combo_1 * 8.75 + this.combo_2 * 12.50;
                    } else {
                        return 0;
                    }
                     
                }
            },
        	beforeRouteEnter (to, from, next) {
                next(vm => {
                    vm.fetchAllMovies();
                    vm.fetchCurrentMovieRoom();
		        });
            },
            methods: {
                fetchAllMovies() {
                    this.$store.dispatch("getEveryMovie").then(() => {
                        // console.log(this.$store.getters.reviews)
                    })
                },
                fetchCurrentMovieRoom() {
                    this.$store.dispatch("getMovieRoomByScheduleID", this.$route.query.time_id)
                },
                formatPay(value) {
                     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
                isDisabled(option) {
                    if(option) return false
                    else return true
                },
                targetSeat(seat_id, seat_name, serial) {
                    if(seat_name.indexOf('A') !== -1) {
                        var indexA = this.seatSelectedRowA.indexOf(serial);
                        if(indexA > -1) {
                            this.seatSelectedRowA.splice(indexA, 1);
                        } else {
                            this.seatSelectedRowA.push(serial);
                        }
                    }
                    if(seat_name.indexOf('B') !== -1) {
                        var indexB = this.seatSelectedRowB.indexOf(serial);
                        if(indexB > -1) {
                            this.seatSelectedRowB.splice(indexB, 1);
                        } else {
                            this.seatSelectedRowB.push(serial);
                        }
                    }
                    if(seat_name.indexOf('C') !== -1) {
                        var indexC = this.seatSelectedRowC.indexOf(serial);
                        if(indexC > -1) {
                            this.seatSelectedRowC.splice(indexC, 1);
                        } else {
                            this.seatSelectedRowC.push(serial);
                        }
                    }
                     if(seat_name.indexOf('D') !== -1) {
                        var indexD = this.seatSelectedRowD.indexOf(serial);
                        if(indexD > -1) {
                            this.seatSelectedRowD.splice(indexD, 1);
                        } else {
                            this.seatSelectedRowD.push(serial);
                        }
                    }
                    var index = this.seatSelected.indexOf(seat_id);
                    if(index > -1) {
                        this.seatSelected.splice(index, 1);
                    } 
                    else {
                        this.seatSelected.push(seat_id);
                    }
                    var indexName = this.seatNameSelected.indexOf(seat_name);
                    if(indexName > -1) {
                        this.seatNameSelected.splice(indexName, 1);
                    }
                    else {
                        this.seatNameSelected.push(seat_name);
                    }
                    
                },
                resetSelected() {
                    //console.log(this.currentMovieRoom.listseat.RowA)
                    this.seatSelected = [];
                    this.seatNameSelected = [];
                    this.seatSelectedRowA = [],
                    this.seatSelectedRowB = [],
                    this.seatSelectedRowC = [],
                    this.seatSelectedRowD = [],
                    eventBus.$emit("resetSelected", false);
                },
                submitBookTicket() {
                    if(this.seatSelected.length <= 0) {
                        this.$swal({
                                title: "You Didn't Choose a Seat!",
                                text: 'Please check again!',
                                type: 'warning',
                                timer: 5000
                            })
                    } else {
                        var data = {
                            rowA: this.seatSelectedRowA,
                            rowB: this.seatSelectedRowB,
                            rowC: this.seatSelectedRowC,
                            rowD: this.seatSelectedRowD,                    
                            time_id: this.$route.query.time_id
                        }
                        var dataPurchase = {
                            user_uid: this.$store.getters.user.uid,
                            show_time: this.currentMovieRoom.show_time,
                            movie_name: this.currentMovie[0].name,
                            quantity: this.seatSelected.length,
                            theater_name: this.currentMovieRoom.theater_name,
                            totalPay: this.totalPay
                        }
                    this.$swal({
                        title: 'You want to pay?',
                        text: "Total Amount: $" + this.formatPay(this.totalPay),
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancel',
                        confirmButtonText: 'Yes I want To Pay'
                        }).then((result) => {
                        if (result.value) {
                            console.log(result.value)
                            this.$store.dispatch("submitBookTicket", data)
                            this.$store.dispatch("addPurchaseByUserID", dataPurchase)
                            this.$swal({
                                title: 'Book Successful Tickets!',
                                text: 'Congratulations on Completing the Ticketing Process',
                                type: 'success',
                                timer: 1000
                            })
                            setTimeout(() => {
                                this.$router.go('/movie/'+ this.$route.query.movie_id);
                            }, 1000)
                        }
                        })
                    }
                    
                   
                }
            },
            
            filters: {
                formatCommas(value) {
                     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            components: {
                appSeat : Seat,
                appHeader: Header    
            }
    }
</script>

<style>

    .ticket-box {
       display: block;
    }
    .exit-door {
        text-align: right;
    }
    .exit-door img {
        width: 30px;
        height: 50px;
        position: absolute;
        top: 100px;
        right: 5px;
    }
    .seat-area {
        margin-left: 40px;
        margin-top: 40px;
        text-align: center;
    }
    .seat-area button:nth-child(3),
    .seat-area button:nth-child(7)
     {
        margin-right: 20px;
    }
    .seat-area button {
        background: rgba(72, 72, 78, 0.5);
        color: #eae1e1;
        margin-left: 5px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .seat-area button.selected {
        background: #85c325e6;
    }
    .seat-area button.reserved {
        background: #b01010e6;
        cursor: not-allowed;
    }

    .note {
        margin-top: 50px;
        margin-left: 40px;
        text-align: center;
    }
    .note ul li {
        display: inline-block;
        margin-right: 20px;
        color: #eae1e1;
       
    }
    .note ul li span {
         line-height: 30px;
    }
    .note button {
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 5px;
        margin-right: 5px;
    }
    .reset {
        text-align: center;
    }
    .reset button {
        background: #ff8300d6;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        color: #eae1e1;
        cursor: pointer;
    }
    /* table combo */
    table, tr, th, td {
        color: #eae1e1;
    }
    td {
        text-align: right;
        vertical-align: middle;
        font-size: 11px;
    }
    .form-style-1 label.title {
        color: #bf104fd6;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .seat-selected {
        min-height: 105px;
        border: 2px solid whitesmoke;
        border-radius: 5px;
        padding: 5px;
    }
     .seat-selected p{
        font-size: 14px;
        font-weight: bold;
        text-align:center;
        color: orange;
        vertical-align: middle;
    }
    .seat-selected button{
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: #85c325e6;
        color: #eae1e1;
    }
    .total-pay p {
        background-color: white;
        color: orangered;
        font-size: 20px;
        font-weight: bold;
        padding: 20px;   
        border-radius: 5px;
        cursor: context-menu;
    }
    a.title-movie {
        color: #6565d2;
    }
    a.title-movie:hover {
        color: #2b0d8c;
    }
    /* custom CSS SweetAlert */
</style>