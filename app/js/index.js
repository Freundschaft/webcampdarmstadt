/*function myFunction() {
 var str = document.getElementById('demoinput').value;
 var res = str.toUpperCase();
 document.getElementById("demooutput1").innerHTML = res;
 document.getElementById("demooutput2").innerHTML = 'original value: ' + str;
 }*/

var app = angular.module('webCampDemo', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
//
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('uppercase', {
      url: "/uppercase",
      templateUrl: "pages/uppercase.html",
      controller: 'upperCaseCtrl'
    })
    .state('lowercase', {
      url: "/lowercase",
      templateUrl: "pages/lowercase.html",
      controller: 'lowerCaseCtrl'
    })
    .state('drivers', {
      url: "/drivers",
      templateUrl: "pages/drivers.html",
      controller: 'driversCtrl'
    })
    .state('driverdetails', {
      url: "/driverdetails/:id",
      templateUrl: "pages/driver-details.html",
      controller: 'driversDetailCtrl',
      resolve: {

        // Example using function with simple return value.
        // Since it's not a promise, it resolves immediately.
        driver: function ($stateParams, $http) {
          return $http({method: 'GET', url: '/api/drivers/' + $stateParams.id})
            .then(function (response) {
              return response.data;
            });
        }
      }
    });
});
app.service('Drivers', function ($http) {
  this.getAll = function () {
    return $http.get('/api/drivers')
      .then(function (response) {
        return response.data;
      });
  };
  this.createNew = function (driver) {
    return $http.post('/api/drivers', driver)
      .then(function (response) {
        return response.data;
      });
  };
  this.deleteDriver = function (driver) {
    return $http.delete('/api/drivers/' + driver._id)
      .then(function (response) {
        return response.data;
      });
  }
})
;
app.directive('taxiDriver', function (Drivers, $rootScope, $state) {
  return {
    restrict: 'E',
    scope: {
      driverInfo: '=info'
    },
    templateUrl: 'pages/directives/taxi-driver.html',
    controller: function ($scope) {
      $scope.deleteDriver = function (driver) {
        Drivers.deleteDriver(driver).
          then(function (result) {
            $rootScope.$broadcast('refreshDrivers');
          })
      };
      $scope.showDriverDetails = function (driver) {
        $state.go('driverdetails', {id: driver._id});
      };
    }
  };
});
app.controller('driversDetailCtrl', function ($rootScope, $scope, driver, $http) {
  $scope.driver = driver;
});
app.controller('driversCtrl', function ($rootScope, $scope, Drivers, $http) {
  Drivers.getAll()
    .then(function (drivers) {
      $scope.drivers = drivers;
    });

  $rootScope.$on('refreshDrivers', function () {
    Drivers.getAll()
      .then(function (drivers) {
        $scope.drivers = drivers;
      });
  });

  $scope.addNewDriver = function () {
    Drivers.createNew({firstName: $scope.newDriver.firstName, lastName: $scope.newDriver.lastName})
      .then(function (driver) {
        Drivers.getAll()
          .then(function (drivers) {
            $scope.drivers = drivers;
          });
      })
  };

  $scope.deleteDriver = function (driver) {
    alert(driver);
  };
});
app.controller('upperCaseCtrl', function ($scope, Drivers) {
  $scope.drivers = Drivers.getAll();
  $scope.result = '';
  $scope.upperCaseResult = $scope.result.toUpperCase();
  $scope.convertToUpperCase = function () {
    $scope.upperCaseResult = $scope.result.toUpperCase();
  }
});

app.controller('lowerCaseCtrl', function ($scope) {
  $scope.result = 'hello lowercase';
  $scope.lowerCaseResult = $scope.result.toLowerCase();
  $scope.convertToLowerCase = function () {
    $scope.lowerCaseResult = $scope.result.toLowerCase()
  };
});