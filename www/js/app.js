// Ionic feelings-live App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('feelings-live', ['ionic', 
                                 'ionic.utils',
                                 'feelings-live.controllers', 
                                 'feelings-live.services',
                                 'feelings-live.directives',
                                 'firebase',
                                 'ngAnimate',
                                 'ngCordova',
                                 'angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.rooms', {
    url: '/rooms',
    views: {
      'tab-rooms': {
        templateUrl: 'templates/tab-rooms.html',
        controller: 'RoomsCtrl'
      }
    }
  })

  .state('tab.room-detail', {
    url: '/rooms/:roomId',
    cache: false,
    views: {
      'tab-rooms': {
        templateUrl: 'templates/room-detail.html',
        controller: 'RoomDetailCtrl'
      }
    }
  })

  .state('tab.questions', {
      url: '/questions',
      views: {
        'tab-questions': {
          templateUrl: 'templates/tab-rooms-questions.html',
          controller: 'RoomsQuestionsCtrl'
        }
      }
    })

  .state('tab.question-detail', {
    url: '/roomQuestions/:roomQuestionID',
    cache: false,
    views: {
      'tab-questions': {
        templateUrl: 'templates/question-detail.html',
        controller: 'RoomQuestionDetailCtrl'
      }
    }
  })


  .state('tab.photo', {
    url: '/photo',
    views: {
      'tab-photo': {
        templateUrl: 'templates/tab-photo.html',
        controller: 'PhotoCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/rooms');

});
