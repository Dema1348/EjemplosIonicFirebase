angular.module('feelings-live.services', [])

.factory('roomsFactory', function($firebaseArray,$firebaseObject) {
    refRoomsColors= new Firebase("https://feelings-live.firebaseio.com/roomsColors");
    refPeopleCube= new Firebase("https://feelings-live.firebaseio.com/peopleCube");

    return {
      all:function() {
        return $firebaseArray(refRoomsColors);
      },
      create:function(room) {
        return  $firebaseArray(refRoomsColors).$add(room);
      },
      getRoom:function(key) {
       return $firebaseObject(refRoomsColors.child(key));
      },
      newPeopleCube:function(people) {
        return $firebaseArray(refPeopleCube).$add(people);
      },
      getPeopleCube:function(key) {
       return $firebaseObject(refPeopleCube.child(key));
     },
     allPeople:function(keyRoom) {
      return $firebaseArray(refPeopleCube.orderByChild("room").equalTo(keyRoom));
     }

    }

})

.factory('roomsQuestionsFactory',function($firebaseArray,$firebaseObject) {
   refRoomsQuestions= new Firebase("https://feelings-live.firebaseio.com/roomsQuestion");
   refQuestions= new Firebase("https://feelings-live.firebaseio.com/questions");

   return{
    all:function() {
      return $firebaseArray(refRoomsQuestions);
    },
    create:function(room) {
      return $firebaseArray(refRoomsQuestions).$add(room);
    },
    getRoom:function(key) {
       return $firebaseObject(refRoomsQuestions.child(key));
    },
    newQuestion:function(question) {
      return $firebaseArray(refQuestions).$add(question);
    },
    allQuestions:function(keyRoom) {
      return $firebaseArray(refQuestions.orderByChild("room").equalTo(keyRoom));
    }
   }
})

.factory('roomPhotoFactory',function($firebaseArray,$firebaseObject) {
   refRoomPhoto= new Firebase("https://feelings-live.firebaseio.com/roomPhoto");
  

   return{
    getPhoto:function() {
      return $firebaseObject(refRoomPhoto);
    }
   }
});
