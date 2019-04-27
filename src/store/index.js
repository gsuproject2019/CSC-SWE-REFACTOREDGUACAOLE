import Vue from 'vue'
import Vuex from 'vuex'
import db from '../components/firebaseInit.js'
import firebase from 'firebase'

Vue.use(Vuex)

var dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

export const store = new Vuex.Store({
    state: {
      userLogin: null,
      users: [],
      userDetail : null,
      movies: [],
      reviews: null,
      currentReviews: [],
      movieTimes: null,
      currentMovieRoom : {
        time_id : "",
        listseat : {
          RowA: []
        },
        user_uid: "",
        theater_name: "",
        show_time: ""
      },
      UserPurchase : []
    },
    mutations: {
      setUser (state, payload) {
        state.userLogin = payload
      },
      setUsers (state, payload) {
        state.users = payload;
      },
      setUserDetail (state, payload) {
        state.userDetail = payload;
      },
      setMovies (state, payload) {
        state.movies = payload;
      },
      setReviews (state, payload) {
        state.reviews = payload
      },
      setCurrentReviews (state, payload) {
        state.currentReviews = payload
      },
      setMovieTimes (state, payload) {
        state.movieTimes = payload;
      },
      setCurrentMovieRoom (state, payload) {
        state.currentMovieRoom = payload;
      },
      setUserPurchase (state, payload) {
        state.UserPurchase = payload;
      }
    },
    actions: {
      getEveryUser ({commit}) {
        let result = [];
        // )
        db.collection('Users').get().then
        (querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.data);
              
            const data = {
              'id' : doc.id,
              'user_uid': doc.data().user_uid,
              'name': doc.data().name,
              'role': doc.data().role
            }
            result.push(data)
          })
          commit('setUsers', result);

        })
        .catch(
          error => {
            console.log(error);
          }
        )
        
      },
      getUserID ({commit}, payload) {
        let data;
        db.collection('Users').where('user_uid', '==', payload).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data = {
              'user_uid': doc.data().user_uid,
              'name': doc.data().name,
              'role': doc.data().role
            }
          })
          commit('setUserDetail', data);
           // console.log(data);
          
        })
        return data;
      },
      updateUser ({commit}, payload) {
        var cancel = firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
                user.updateAccount({
                  displayName: payload.displayName,
                  photoURL: payload.photoUrl
        }).then(() => {
            let userUpdate = {
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
              uid: user.uid
            }
            commit("setUser", userUpdate);
            localStorage.removeItem('current-user');
            localStorage.setItem("current-user", JSON.stringify(userUpdate));
        })
        .then(() => {  
          db.collection("Reviews").where('user_uid', '==', user.uid).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              db.collection("Reviews").doc(doc.id).update({user_avatar: user.photoURL});
            })
            
          })
        })
        .catch(err => {
          console.log(err);
        })
          } else {
            // No user is signed in.
          }
      });
      cancel();
    
      },
      getEveryMovie({commit}) {
        let result = [];
        // )
        db.collection('Movies').orderBy("movie_id").get().then
        (querySnapshot => {
          querySnapshot.forEach(doc => {  
            //console.log(doc.data())
            const data = {
              movie_id : doc.data().movie_id,
              name: doc.data().name,
              backgroundUrl: doc.data().backgroundUrl,
              overView : doc.data().overView,
              media: doc.data().media,
              cast: doc.data().cast,
              director: doc.data().director,
              producer: doc.data().producer,
              photoUrl: doc.data().photoUrl,
              rating: doc.data().rating,
              tags: doc.data().tags,
              year: doc.data().year,
              trailerID: doc.data().trailerID,
              releaseDate: doc.data().releaseDate,
              runTime: doc.data().runTime,
              MMPRating: doc.data().MMPRating
            }
            result.push(data)
          })
          commit('setMovies', result);

        })
        .catch(
          error => {
            console.log(error);
          }
        )
      },
      postReview({commit}, payload) {
        //console.log(payload);
        // Add a new document with a generated id.
        db.collection("Reviews").add({
          user_uid: payload.user_uid,
          user_email: payload.user_email, 
          user_avatar: payload.user_avatar,
          type: payload.type,
          media_id: payload.media_id,
          media_photo: payload.media_photo,
          media_name: payload.media_name,
          media_year: payload.media_year,
          title: payload.title,
          content: payload.content,
          rating: payload.rating,
        })
        .then((review) => {
              db.collection("Reviews").doc(review.id).update({created_at: firebase.firestore.FieldValue.serverTimestamp()})
              .then(() => {
                db.collection("Reviews").doc(review.id).get().then(doc => {
                  const data = {
                    user_uid: doc.data().user_uid,
                    user_avatar: doc.data().user_avatar,
                    user_email: doc.data().user_email,
                    type: doc.data().type,
                    media_id: doc.data().media_id,
                    media_photo: doc.data().media_photo,
                    media_name: doc.data().media_name,
                    media_year: doc.data().media_year,
                    title: doc.data().title,
                    content: doc.data().content,
                    rating: doc.data().rating,
                    created_at: doc.data().created_at.toDate().toLocaleDateString("en-US", dateFormat)
                  }
                  this.state.currentReviews.unshift(data)
                })
               
              });
        })
       
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      },
      getEveryReview({commit}) {
        let result = [];
        db.collection("Reviews").orderBy("created_at","desc")
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
              //console.log(doc.data());
                 const data = {
                  user_uid: doc.data().user_uid,
                  user_avatar: doc.data().user_avatar,
                  user_email: doc.data().user_email,
                  type: doc.data().type,
                  media_id: doc.data().media_id,
                  media_photo: doc.data().media_photo,
                  media_name: doc.data().media_name,
                  media_year: doc.data().media_year,
                  title: doc.data().title,
                  content: doc.data().content,
                  rating: doc.data().rating,
                  created_at: doc.data().created_at.toDate().toLocaleDateString("en-US", dateFormat)
                 }
                 result.push(data);
              });
              
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
          commit("setReviews", result)
      },
      getCurrentReviews({commit}, payload) {
        let result = [];
        db.collection("Reviews").orderBy("created_at","desc")
          .where("media_id", "==", payload.id).where("type", "==", payload.type)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
              //console.log(doc.data());
                 const data = {
                  user_uid: doc.data().user_uid,
                  user_avatar: doc.data().user_avatar,
                  user_email: doc.data().user_email,
                  type: doc.data().type,
                  media_id: doc.data().media_id,
                  title: doc.data().title,
                  content: doc.data().content,
                  rating: doc.data().rating,
                  created_at: doc.data().created_at.toDate().toLocaleDateString("en-US", dateFormat)
                 }
                 result.push(data);
              });
              // console.log(result);
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });
          commit("setCurrentReviews", result)
      },
      getEveryMoviechedule({commit}) {
        let result = [];
        db.collection('MovieTime').get().then
        (querySnapshot => {
          querySnapshot.forEach(doc => { 
            //console.log(doc.data());
             
            const data = {
              cine_id : doc.data().cine_id,  
              theater_name :  doc.data().theater_name,
              date_show :  doc.data().date_show,
              movie_id :  doc.data().movie_id,
              time_id :  doc.data().time_id,
              show_time :  doc.data().show_time,
            }
            result.push(data);
          })
          console.log(result);
          commit('setMovieTimes', result);

        })
        .catch(
          error => {
            console.log(error);
          }
        )
      },
      getMovieRoomByScheduleID ({commit}, payload) {
        let data;
        db.collection('MovieRoom').where('time_id', '==', payload).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
           console.log(doc.data());
            
            data = {
              'time_id': doc.data().time_id,
              'listseat': doc.data().ListSeat,
              'user_uid': doc.data().user_uid,
              'theater_name': doc.data().theater_name,
              'show_time': doc.data().show_time
            }
          })
          commit('setCurrentMovieRoom', data);
         // console.log(doc.data());
          
        })
      },
      submitBookTicket({commit}, payload) {
          db.collection("MovieRoom").where("time_id", "==", payload.time_id).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              payload.rowA.forEach(seat_name => {
                var path = `ListSeat.RowA.${seat_name}.status`
                var objectUpdate = {};
                objectUpdate[path] = false;
  
                  db.collection("MovieRoom").doc(doc.id).update(objectUpdate)
              })
              payload.rowB.forEach(seat_name => {
                var path = `ListSeat.RowB.${seat_name}.status`
                var objectUpdate = {};
                objectUpdate[path] = false;
  
                  db.collection("MovieRoom").doc(doc.id).update(objectUpdate)
              })
              payload.rowC.forEach(seat_name => {
                var path = `ListSeat.RowC.${seat_name}.status`
                var objectUpdate = {};
                objectUpdate[path] = false;
  
                  db.collection("MovieRoom").doc(doc.id).update(objectUpdate)
              })
              payload.rowD.forEach(seat_name => {
                var path = `ListSeat.RowD.${seat_name}.status`
                var objectUpdate = {};
                objectUpdate[path] = false;
  
                  db.collection("MovieRoom").doc(doc.id).update(objectUpdate)
              })
            })
          })
      },
      addPurchaseByUserID({commit}, payload) {
        db.collection("Purchases").add({
          user_uid: payload.user_uid,
          movie_name: payload.movie_name,
          show_time: payload.show_time,
          quantity: payload.quantity,
          theater_name: payload.theater_name,
          totalPay: payload.totalPay,
        })
        .then((purchase) => {
              db.collection("Purchases").doc(purchase.id).update({booked_at: firebase.firestore.FieldValue.serverTimestamp()})
      })
    },
    getPurchaseByUserID({commit}, payload) {
      let result = [];
      db.collection("Purchases").where('user_uid', '==', payload).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'user_uid': doc.data().user_uid,
            'movie_name': doc.data().movie_name,
            'show_time': doc.data().show_time,
            'quantity': doc.data().quantity,
            'theater_name': doc.data().theater_name,
            'totalPay': doc.data().totalPay,
            'booked_at': doc.data().booked_at.toDate().toLocaleDateString("en-US", dateFormat)
          }
          result.push(data)
        })
        console.log(result);
        commit('setUserPurchase', result);
        
      })
    },
  },
    getters: {
      user (state) {
        return state.userLogin
      },
      users (state) {
        return state.users
      },
      userDetails (state) {
        return state.userDetail 
      },
      movies (state) {
        return state.movies
      },
      reviews (state) {
        return state.reviews
      },
      currentReviews (state) {
        return state.currentReviews;
      },
      updateVisibleReviews: (state, getters) => (payload) => {
        return getters.currentReviews
          .slice(payload.currentPage * payload.pageSize, (payload.currentPage * payload.pageSize) + payload.pageSize)
      },
      movieTimes (state) {
        return state.movieTimes;
      },
      getMovieTime: (state, getters) => (id, date, cine) => {
        return getters.movieTimes
        .filter(movieTime => movieTime.movie_id === id 
                  && movieTime.date_show === date
                  && movieTime.theater_name === cine
                  );
      },
      getCurrentMovieRoom(state) {
        return state.currentMovieRoom;
      },
      getUserPurchase(state) {
        return state.UserPurchase;
      }
    }
  })
  