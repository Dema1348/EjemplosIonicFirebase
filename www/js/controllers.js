
angular.module('feelings-live.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('RoomsCtrl', function($scope,roomsFactory) {

  $scope.rooms=roomsFactory.all()
  $scope.rooms.$loaded().then(function(rooms) {
    console.log(rooms);
  });

  $scope.create=function(room) {
    room.timeCreate= Firebase.ServerValue.TIMESTAMP;
    roomsFactory.create(room);

  };
})

.controller('RoomDetailCtrl',function($scope,$stateParams,$localstorage,roomsFactory) {
 
  $scope.isJoin=true;
  var key=$stateParams.roomId;
   $scope.room=roomsFactory.getRoom(key);
    $scope.room.$loaded().then(function(room) {
      //Is join in the room?
      if(typeof $localstorage.get(room.$id, false) == 'string'){
        $scope.user=roomsFactory.getPeopleCube($localstorage.get(room.$id))
        $scope.user.$loaded().then(function(x) {     
          if(x.$value===null){
             $localstorage.remove(key);
             $scope.isJoin=false;
          }
          else{
             $scope.isJoin=true;
          }
        })
      }else{
         $scope.isJoin=false;
      }
  })

  $scope.people=roomsFactory.allPeople(key)
  $scope.people.$loaded().then(function(people) {
    console.log(people)
  });
    

  $scope.join=function () {
    var people={};
    people.timeCreate=Firebase.ServerValue.TIMESTAMP;
    people.score=0;
    people.room=key;
    roomsFactory.newPeopleCube(people).then(function(ref) {
      var id = ref.key();
      $localstorage.set(key, id);
      $scope.isJoin=true;
      $scope.user=roomsFactory.getPeopleCube(id)
        $scope.user.$loaded().then(function(x) {
        })

    });

  }

  $scope.up=function() {
    if($scope.user.score<51){
      $scope.user.score++;
      $scope.user.$save();
    }
  };
  
  $scope.down=function() {
    if($scope.user.score>-50){
      $scope.user.score--;
      $scope.user.$save();
    }
  };

  $scope.change=function() {
    $scope.user.$save();
  };
})

.controller('RoomsQuestionsCtrl', function($scope, roomsQuestionsFactory) {
  $scope.roomQuestions=roomsQuestionsFactory.all()
  $scope.roomQuestions.$loaded().then(function(roomQuestions) {
    console.log("loaded");
  });


   $scope.create=function(room) {
    room.timeCreate= Firebase.ServerValue.TIMESTAMP;
    roomsQuestionsFactory.create(room);

  };

})

.controller('RoomQuestionDetailCtrl', function($scope,$stateParams,$localstorage,roomsQuestionsFactory,$timeout,$ionicPopup) {
  
   var key=$stateParams.roomQuestionID;
   $scope.roomQuestion=roomsQuestionsFactory.getRoom(key);
    $scope.roomQuestion.$loaded().then(function(roomQuestion) {
      console.log(roomQuestion);
  })

  $scope.create=function(question) {
    question.timeCreate= Firebase.ServerValue.TIMESTAMP;
    question.score=0;
    question.room=key;
    roomsQuestionsFactory.newQuestion(question);
  };

  $scope.questions=roomsQuestionsFactory.allQuestions(key)
  $scope.questions.$loaded().then(function(questions) {
    console.log(questions);
  });


  var swipeEuphoria=false;
  $scope.down=function(question) {
    if(!swipeEuphoria){
      if(question.score>0){
        question.score--;
        $scope.questions.$save(question).then(function() {
           swipeEuphoria=true;
           euphoriaOff ()
        })
      }
    }
    else{
      alertEuphoria();
    }
  };


  $scope.up=function(question) {
    if(!swipeEuphoria){
      question.score++;
      $scope.questions.$save(question).then(function() {
         swipeEuphoria=true;
         euphoriaOff ()
      })
    }
    else{
      alertEuphoria();
    }
  };

function euphoriaOff () {
  $timeout(function () {
    swipeEuphoria=false;
  }, 10000)
  
};

function alertEuphoria () {
  var alertPopup = $ionicPopup.alert({
     title: 'Prevent to euphoria mode!',
     template: 'Hold on! Wait a moment for a new vote!'
   });

}




 
  
})

.controller('PhotoCtrl', function($scope,roomPhotoFactory,$cordovaCamera,$ionicModal) {

  $scope.photo=roomPhotoFactory.getPhoto();
  $scope.photo.$loaded().then(function(photo) {
    console.log(photo);
  })

  $scope.newPhoto={};
  $scope.getPhoto= function() {  
  var options= {
      quality: 50,
      encodingType: Camera.EncodingType.JPEG,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

  $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.mensajeImage="Se ha cargado la imagen correctamente.";

        $scope.newPhoto.url=imageData;
      },function(err) {
        $scope.mensajeImage="Se ha ocurrido un error al cargar la imagen.";
      });
    
  };

  $scope.upload=function() {
    $scope.photo.url=$scope.newPhoto.url;
    $scope.photo.name=$scope.newPhoto.name || "No title";
    $scope.photo.timeCreate=Firebase.ServerValue.TIMESTAMP;
    $scope.photo.$save();
     $scope.newPhoto={};
  };

  $ionicModal.fromTemplateUrl('image-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
        $scope.image=this.photo.url;
        $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });



});
