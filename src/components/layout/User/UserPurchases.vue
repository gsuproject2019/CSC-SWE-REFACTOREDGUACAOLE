<template>
    <div class="wrap-user-reviews">    
            <ul class="breadcumb">
                <li class="active"><a href="#">Home</a></li>
                <li> <span class="ion-ios-arrow-right"></span>User</li>
                <li> <span class="ion-ios-arrow-right"></span>Purchases</li>
            </ul>
         	<div class="topbar-filter">
					<p>Found <span>{{ UserPurchases.length }} purchases</span> in total</p>
					<label>Sort by:</label>
					<select>
						<option value="range">-- Choose option --</option>
						<option value="saab">-- Choose option 2--</option>
					</select>
				</div>
                <div class="wrap-user-purchases">
                    <table class="purchase">
                        <tr>
                            <th>No.</th>
                            <th colspan="2">Purchase Date</th>
                            <th>Show Time</th>
                            <th>Movie Title</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Total Cost</th>
                        </tr>
                        <tr v-if="UserPurchases.length >0" v-for="(purchase, index) in UserPurchases" :key="index">
                            <td>{{ index + 1 }}</td>  
                            <td colspan="2">{{ purchase.booked_at }}</td>
                            <td>{{ purchase.show_time }}</td>
                            <td>{{ purchase.movie_name }}</td>
                            <td>{{ purchase.theater_name }}</td>
                            <td>{{ purchase.quantity }} * ticket</td>
                            <td>$ {{ purchase.totalPay | formatCommas}}</td>
                        </tr>
                        <tr v-if="UserPurchases.length==0">
                            <td>...</td>
                            <td colspan="2">...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                    </table>
                </div>
				<div class="topbar-filter">
					<label>Purchase per page:</label>
					<select>
						<option value="range">20 Purchases</option>
						<option value="saab">10 Purchases</option>
					</select>
					<div class="pagination2">
						<span>Page 1 of 1:</span>
						<a class="active" href="userrate.html#">1</a>
						<a href="userrate.html#"><i class="ion-arrow-right-b"></i></a>
					</div>
				</div>
    </div>
    
</template>

<script>
import firebase from 'firebase'

    export default {
        data() {
            return {
                // currentUser: this.$store.getters.user,
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.getPurchaseByUserID();
            });
	    },
        computed: {
            currentUser() {
                return this.$store.getters.user;
            },
            UserPurchases() {
                return this.$store.getters.getUserPurchase.sort((a, b) => b.booked_at - a.booked_at);
            }

        },
        watch: {
            currentUser (value) {
                console.log("watch login")
                if(value !== null && value !== undefined) {
                   this.currentUser = value;
                }
            }
        },
        methods: {
            getPurchaseByUserID() {
                this.$store.dispatch("getPurchaseByUserID", this.currentUser.uid)
            }
        },
        filters: {
                formatCommas(value) {
                     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
    }
</script>

<style scoped>
    .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
li, span {
    display: inline-block;
    margin-right: 5px;
    color: #abb7c4
}
li.active a {
    color: #4280bf;
}

.wrap-user-purchases {
    margin-bottom: 50px;
}

table.purchase , tr, th , td {
    color: #6f980ecf;
    vertical-align: middle;
    text-align: center;
    border: 1px solid #405266;
}
th {
    text-align: center;
}
td {
    font-size: 14px;
}
</style>