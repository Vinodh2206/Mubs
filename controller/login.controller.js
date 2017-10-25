(function () {
    'use strict';

    var app = angular
        .module('app');
        
         
    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$cookieStore'];
    function LoginController($location, AuthenticationService, FlashService,$cookieStore) {
        var vm = this;
        
        vm.login = login;
        
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
            
        
        function login() {
            vm.dataLoading = true;
            
            if (vm.username.indexOf('@') != -1) {
        AuthenticationService.Login(vm.username, vm.password, function(response) {
            console.log(response);
             if (response.json.response.statuscode == 0 && response.json.response.statusmessage=='Success') {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');
                console.log(response);
                var resp = response;
                var user = resp.json.response.user;
//                $cookieStore.put('user', user);
                console.log(user);
                var displayList = [];
                var sessionIds = [];
                for(var i=0;i<user.length;i++){
                    
                   var jsonData = {};

                    jsonData["groupzcode"] = user[i].groupzcode;
                    jsonData["profileurl"] = user[i].profileurl;
                    jsonData["session_id"] = user[i].session_id;
                    jsonData["displayname"] = user[i].displayname;
                    
                    displayList.push(jsonData);
                    
                    sessionIds.push(user[i].session_id);
                                        
                }
                console.log("displayList",displayList);
                console.log(sessionIds);
                $cookieStore.put('displayList', displayList);
                $cookieStore.put('sessionIds', sessionIds);
                } else {
                        FlashService.Error("Login Fails - Invalid username or password");
                        //FlashService.Error(response.json.response.statusmessage);
                        vm.dataLoading = false;
                    }
                });
                } else {
                    AuthenticationService.adminLogin(vm.username, vm.password, function(response) {
                        if (response.json.response.statuscode == 0) {
                            AuthenticationService.SetCredentials(vm.username, vm.password);
                            $location.path('/admin');
                            console.log(response);
                        } else {
                           
                            FlashService.Error("Login Fails - Invalid username or password");
                            //FlashService.Error(response.json.response.statusmessage);
                            vm.dataLoading = false;
                        }
                    });
                }
            }
    }

}) ();
    
