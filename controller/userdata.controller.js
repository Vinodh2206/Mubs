(function() {
    'use strict';

    angular.module('app')
    
    .controller('UserDataController', function($rootScope, $scope, $window, $http, $q, UserService, FlashService, $cookieStore,$timeout,$sce,$compile) {

    
        var assignrolesArray =[];
        $scope.groupzid = "";

          $scope.drawMap = false;
                $scope.showGraph = false;
        $scope.showTable = false;
         var roleInfo = [];
          $scope.checkedStatus= false;
        
      var menu=1;
				$scope.isSelected=function(val){
					return menu==val;
				}
        
				$scope.selectMenu=function(val){
					return menu=val;
				}
       
            //Graph start
        function plot3dGraph(rxd_data, xAxisCategories, title, xLabel, yLabel) {
            // Set up the chart
            console.log('data is')
            console.log(rxd_data)
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'graphContainer',
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Graph for ' + title
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                series: rxd_data,
                yAxis: {
                    title: {
                        text: yLabel
                    }
                },
                xAxis: [{ 
                    categories: xAxisCategories,
                    title: {
                        text: xLabel
                    }
                }],
            });
        }
        //Graph ends

        $scope.showDashboard = true;
         $scope.showListAccount = false;
        $scope.displayProfile = false;
        $scope.model = {
            'dropDownData': [],
            'birthdays': []
        };


        var displaynames = $cookieStore.get('displayList');

        console.log($rootScope.displayList);
        console.log("displaynames:::::::::::::::", displaynames);
        $scope.status = {
            isopen: false
        };

        $scope.toggled = function(open) {
            $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.geography = [];
        $scope.model.dropDownData = [];
        $scope.model.selectedvalue = [];
        $scope.model.membername = [];
        $scope.model.countries = [];
        $scope.model.states = [];
        $scope.model.cities = [];
        $scope.model.segments = '';
        $scope.model.centers = [];
        $scope.model.roles = [];
        $scope.model.birthdays = [];
        $scope.selectedcountry = '';
        $scope.selectedstate = '';
        $scope.selectedcity = '';
        $scope.selectedcenter = '';
        $scope.centers = [];
        $scope.setCentersgroupzcode = [];
        $scope.selectedrole = [];
        $scope.groupzlist = [];
        $scope.model.axisValue = [];
        $scope.target = [];
        $scope.actual = [];
        $scope.divisions = [];
        $scope.model.yaxisMaxValue = [];
        $scope.storeAccount =[];
        $scope.model.assignRoles = [];

        $scope.model.selectedvalue.length = 0;
        $scope.model.membername.length = 0;
      

        $scope.initializeMethods = function() {

            $scope.getDisplayList = function() {
                for (var i = 0; i < displaynames.length; i++) {
                    $scope.model.dropDownData.push(displaynames[i].displayname); // we can itterate and set the drop down values
                    console.log($scope.model.dropDownData);
                }
                $scope.model.selectedValue = displaynames[0].displayname; // set model value
                 $window.localStorage.x = $scope.model.dropDownData;
                //setting data in cookies
            }



     $scope.getselectval = function(index) {
                    			

                if ($scope.model.selectedValue != null) {
                    var selectedvalue = $scope.model.selectedValue;
                    var currentAccount = selectedvalue.split(" - ");

                    var selectedmembername = currentAccount[0];
                    var selectedShortname = currentAccount[1];

                    $scope.groupzlist = [];

                    for (var i = 0; i < displaynames.length; i++) {
                        var displayedValues = displaynames[i].displayname;
                        var accountName = displayedValues.split(" - ");
                        
                        var memberName = accountName[0];

                        if (selectedvalue === displaynames[i].displayname) {
                            var currentSession = displaynames[i].session_id;
                            console.log("currentSession : " + currentSession);

                            $scope.model.selectedvalue.push(currentSession);
                            console.log("selectedvalue : " + currentSession);
                            $cookieStore.put('currentSession', currentSession);
                            console.log(currentSession);

                            $scope.groupzlist.push(displaynames[i].groupzcode);
                            console.log('$scope.groupzlist: ' + $scope.groupzlist);
                            $scope.model.profileurl = displaynames[i].profileurl;
                        }
                    }
                    $scope.getSessionInfo();

                    // get member name (for Welcome user name)
                    $scope.model.membername = [];
                    $scope.model.membername.push(selectedmembername);
                    // $scope.membername();
                }
                $window.localStorage.x = $scope.model.selectedvalue;
                $scope.GeographyAccounts();
         $scope.dashboardMenu();
          $scope.getAccounts();
                        $scope.monthlyFees();
                        $scope.yearlyFees();
         
                
                

                // init the selection
                // also init selectedRole to prevent Submit button
                $scope.selectedcountry = "_ALL";
                $scope.selectedstate = "_ALL";
                $scope.selectedcity = "_ALL";
                $scope.selectedcenter = "_ALL";
                $scope.model.selectedRole = '';
         
                $scope.Birthdays();
         $scope.Anniversary();
         

                $scope.getDashboard();
/*
                $scope.getTableData();
*/
            }

            /* $scope.membername = function() {
                 if($cookieStore.get('currentSession')){
                     $rootScope.currentSession = $cookieStore.get('currentSession');
                 }
                 console.log($rootScope.currentSession); 
                 
                 var json = {
                       "json": {
                         "request": {
                           "servicetype": "6",
                           "functiontype": "1000",
                           "session_id": $rootScope.currentSession
                         }
                       }
                     }
                 
                 UserService.membername(json).then(function(response){
                     if (response.json.response.statuscode == 0 && response.json.response.statusmessage =='Success'){
                         
                         var memberName = response.json.response.user[0].membersdetails.membername;
                         console.log(JSON.stringify(memberName));
                         $scope.model.membername.push(memberName);
                     }
                 })
             }*/

            $scope.getSessionInfo = function() {
                if ($cookieStore.get('currentSession')) {
                    $rootScope.currentSession = $cookieStore.get('currentSession');
                }

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "1000",
                            "session_id": $rootScope.currentSession
                        }
                    }
                }

                UserService.getSessionInfo(json).then(function(response) {
                    
                    if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success') {

                        var groupzdetails = response.json.response.user[0].groupzdetails;
                        $scope.memberdetails = response.json.response.user[0].membersdetails;
                        $scope.allMembers = response.json.response.user;
                        var checkNetworkAdmin = $scope.memberdetails.networkadmin;
                        var memberName = response.json.response.user[0].membersdetails.membername;
                        $scope.model.membername.push(memberName);


                        $scope.Geography();
                    }
                })
            }


            $scope.Geography = function(data) {

                console.log('Geography: '+$rootScope.currentSession);

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6002",
                            "session_id": $rootScope.currentSession
                        }
                    }
                }
                console.log(JSON.stringify(json));

                UserService.Geography(json).then(function(response) {

                    $scope.model.countries = [];
                    $scope.model.countries.push("ALL");

                    if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success') {
                        var geography = response.json.response.geography;
                        console.log("Geography : " + JSON.stringify(geography));
                        $scope.geography = geography;

                        for (var i = 0; i < geography.length; i++) {

                            $scope.model.countries.push(geography[i].countryname);
                            console.log($scope.model.countries);

                            if (($scope.model.countries != []) || ($scope.model.countries != null)) {
                                $scope.model.states = [];
                                $scope.model.states.push("ALL");
                                for (var j = 0; j < geography[i].states.length; j++) {
                                    if (geography[i].states) {
                                       $scope.model.states.push(geography[i].states[j].statename);
                                    } else {
                                       $scope.model.states.push(geography[i].state[j].statename);
                                    }
                                    console.log($scope.model.states);
                                    if (($scope.model.states != []) || ($scope.model.states != null)) {
                                        $scope.model.cities = [];
                                        $scope.model.cities.push("ALL");
                                        // for first time combobox loading,
                                        // load only cities for first state
                                        if (j === 0) {
                                            for (var k = 0; k < geography[i].states[j].cities.length; k++) {
                                                console.log('======k=====:'+k);
                                                console.log('geography[i].states[j].cities[k].city=====:'+geography[i].states[j].cities[k].city);
                                                if (geography[i].states) {
                                                   $scope.model.cities.push(geography[i].states[j].cities[k].city);
                                                } else {
                                                   $scope.model.cities.push(geography[i].state[j].cities[k].city);
                                                };
                                                console.log('$scope.model.cities: '+ $scope.model.cities);

                                                if (($scope.model.cities != []) || ($scope.model.cities != null)) {

                                                    $scope.model.segments = "_ALL";
                                                    console.log($scope.model.segments);

                                                }
                                            }
                                        }
                                        $scope.model.selectedCity = $scope.model.cities[0];
                                    }
                                }
                                $scope.model.selectedState = $scope.model.states[0];
                            }
                        }
                        $scope.model.selectedCountry = $scope.model.countries[0];
                    }
                });
            }




            $scope.GetCountry = function() {

                if ($scope.model.selectedCountry != null) {
                    if ($scope.model.selectedCountry == "ALL") {

                        $scope.selectedcountry = "_ALL";
                        console.log($scope.selectedcountry);
                        $scope.selectedstate = "_ALL";
                        console.log($scope.selectedstate);

                        $scope.model.selectedState = "ALL";
                        $scope.model.selectedCity = "ALL";
                        $scope.model.selectedCenter = "ALL";

                    } else {
                        $scope.selectedcountry = $scope.model.selectedCountry;
                        console.log($scope.selectedcountry);
                    }
                    $scope.populateState();
                }
            }

            $scope.populateState = function() {
                console.log('===populateState===');
                var geography = $scope.geography;

                for (var i = 0; i < geography.length; i++) {
                    if (geography[i].countryname === $scope.selectedcountry) {
                        $scope.model.states = [];
                        $scope.model.states.push("ALL");
                        for (var j = 0; j < geography[i].states.length; j++) {
                            if (geography[i].states) {
                                $scope.model.states.push(geography[i].states[j].statename);
                            } else {
                                $scope.model.states.push(geography[i].state[j].statename);
                            }
                        }
                        $scope.model.selectedState = $scope.model.states[0];
                        // need to reset City to ALL since there is changes in State
                        $scope.model.cities = [];
                        $scope.model.cities.push("ALL");
                        $scope.selectedcity = "_ALL";
                        $scope.model.selectedCity = "ALL";
                    }
                }
            }


            $scope.GetState = function() {

                if ($scope.model.selectedState != null) {

                    if ($scope.model.selectedState == "ALL") {

                        $scope.selectedstate = "_ALL";
                        console.log($scope.selectedstate);
                        $scope.selectedcity = "_ALL";
                        console.log($scope.selectedcity);
                    } else {
                        $scope.selectedstate = $scope.model.selectedState;
                        console.log($scope.selectedstate);
                    }
                    $scope.populateCity();
                }
            }

            $scope.populateCity = function() {
                console.log('===populateCity===');
                var geography = $scope.geography;
                for (var i = 0; i < geography.length; i++) {
                    if (geography[i].countryname === $scope.selectedcountry) {
                        for (var j = 0; j < geography[i].states.length; j++) {
                            if (geography[i].states[j].statename === $scope.selectedstate) {
                                $scope.model.cities = [];
                                $scope.model.cities.push("ALL");
                                for (var k = 0; k < geography[i].states[j].cities.length; k++) {
                                    if (geography[i].states) {
                                       $scope.model.cities.push(geography[i].states[j].cities[k].city);
                                    } else {
                                       $scope.model.cities.push(geography[i].state[j].cities[k].city);
                                    };
                                    console.log('$scope.model.cities: '+ $scope.model.cities);
                                }
                                $scope.model.selectedCity = $scope.model.cities[0];
                            }
                        }
                    }
                }
            }


            $scope.GetCity = function() {
                if ($scope.model.selectedCity != null) {

                    if($scope.model.selectedCity == "ALL") {
                        $scope.selectedcity = "_ALL";
                        console.log($scope.selectedcity);
                        $scope.selectedcenter = "_ALL";
                        console.log('selectedCenter: :'+$scope.selectedcenter);
                    } else {
                        $scope.selectedcity = $scope.model.selectedCity;
                        console.log($scope.selectedcity);
                    }
                    $scope.GeographyAccounts();
                    $scope.Birthdays();
                    $scope.Anniversary();
                }
            }


            $scope.GeographyAccounts = function() {
            if  (!$scope.selectedcountry[0]) {
                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6003",
                            "groupzcode": $scope.groupzlist[0],
                            "country": "_ALL",
                            "state": "_ALL",
                            "city": "_ALL",
                            "segment": "_ALL",
                            "session_id": $rootScope.currentSession
                        }
                    }
                }
            } else {
                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6003",
                            "groupzcode": $scope.groupzlist[0],
                            "country": $scope.selectedcountry,
                            "state": $scope.selectedstate,
                            "city": $scope.selectedcity,
                            "segment": $scope.model.segments,
                            "session_id": $rootScope.currentSession
                        }
                    }
                }
            };
                console.log("GeographyAccounts request : " + JSON.stringify(json));



                UserService.GeographyAccounts(json).then(function(response) {

                    if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success') {


                        $scope.centers = [];
                        var centers = response.json.response.accounts[0].groupzlist;
                        console.log(centers);


                        $scope.model.centers = [];
                        $scope.model.centers.push("ALL");
                        for (var i = 0; i < centers.length; i++) {

                            $scope.centers.push(centers[i]);
                            $scope.model.centers.push(response.json.response.accounts[0].groupzlist[i].shortname);
                        }
                        console.log($scope.model.centers);

                        $scope.model.roles = [];
                        var roles = response.json.response.accounts[0].roles;
                        for (var i = 0; i < roles.length; i++) {
                            $scope.model.roles.push(response.json.response.accounts[0].roles[i].role);
                        }
                        console.log('$scope.model.roles: '+JSON.stringify($scope.model.roles));
                        // set first role
                        $scope.model.selectedRole = $scope.model.roles[0];

                        $scope.model.selectedCenter = $scope.model.centers[0];
                        $scope.GetCenter();
                          $scope.Birthdays();
                        $scope.Anniversary();
                        $scope.getGraphData();
/*
                        $scope.getTableData();
*/
                        $scope.dashboardMenu();
                        $scope.getAccounts();
                        $scope.monthlyFees();
                        $scope.yearlyFees();
                    }

                });

            }

            $scope.GetCenter = function() {


                if ($scope.model.selectedCenter != null) {
                    console.log("centers");

                    if ($scope.model.selectedCenter == "ALL") {

                        $scope.selectedcenter = [];
                        $scope.setCentersgroupzcode = [];

                        console.log("***** Centers ******");
                        console.log($scope.centers.length);

                        $scope.setCentersgroupzcode.push("_ALL");
                        console.log($scope.setCentersgroupzcode);
                        $scope.GetRole();
                    } else {

                        $scope.setCentersgroupzcode = [];
                        $scope.selectedcenter = [];
                        $scope.selectedcenter.push($scope.model.selectedCenter);
                        console.log($scope.selectedcenter.length);

                        for (var i = 0; i < $scope.selectedcenter.length; i++) {

                            console.log(i);
                            console.log($scope.selectedcenter);
                            var selectercenterArray = $scope.selectedcenter[0];
                            console.log(selectercenterArray);

                            var ArrayValue = selectercenterArray[i];
                            console.log(ArrayValue);

                            for (var j = 0; j < $scope.centers.length; j++) {

                                console.log("ArrayValue : " + ArrayValue);
                                var shortname = $scope.centers[j].shortname;
                                console.log(shortname);
                                var groupzcode = $scope.centers[j].groupzcode;
                                console.log(groupzcode);

                                if (selectercenterArray === shortname) {
                                    console.log("selectercenterArray : " + selectercenterArray);
                                    console.log("groupzcode : " + groupzcode);
                                    $scope.setCentersgroupzcode.push(groupzcode);
                                    console.log($scope.setCentersgroupzcode);
                                }
                            }
                        }
                        console.log($scope.setCentersgroupzcode);
                        $scope.GetRole();
                      
                    }
                }

            }

            $scope.GetRole = function() {

                $scope.selectedrole = [];
                if ($scope.model.selectedRole != null) {

                    for (var i = 0; i < 1; i++) {
                        $scope.selectedrole.push($scope.model.selectedRole);
                    }
                }
                console.log($scope.selectedrole);
            }

            
             // Google Maps
        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            control: {}
        };

        // place a marker
        $scope.markers = [];

        function setMarker(lat, long, title, content) {
            var marker = {
                id: $scope.markers.length+1,
                coords: {
                    latitude: lat,
                    longitude: long
                },
                content: content,
                options: {
                    title: title,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }
            };
            $scope.markers.push(marker);
        };

        $scope.tab = 2;

        $scope.changeTab = function(idx) {
            $scope.tab = idx;
        };

            $scope.DrawMap = function(response) {
                console.log("DrawMap");
                $scope.markers = [];
                var data = response.json.response.data[0].data[1];
                var markerLatLng = [];
                var map = $scope.map.control.getGMap();
                var bounds  = new google.maps.LatLngBounds();
          

                // set zoom level based on xlabel
                var level = response.json.response.data[0].xlabel;
                if (level === 'country') {
                    $scope.map.zoom = 4;
                } else if (level === 'state') {
                    $scope.map.zoom = 4;
                } else if (level === 'city') {
                    $scope.map.zoom = 6;
                } else if (level === 'All Centres') {
                    $scope.map.zoom = 8;
                }else if (level ==='divisons'){
                    $scope.map.zoom =10;
                } else {
                    $scope.map.zoom = 4;  //default to zoom 10
                };
                

                //set markers for each data
                $.each(data, function(key, entry) {
                    
                   setMarker(entry.lat, entry.long,
                             entry.x,
                             /*response.json.response.data[0].data[0] +*/  
                            response.json.response.data[0].s1 + ": " + entry.s1 + " "+" "+
                        response.json.response.data[0].s2 + ": " + entry.s2);
                   var point = new google.maps.LatLng(entry.lat, entry.long);

                   markerLatLng.push(point);
                   var loc = new google.maps.LatLng(entry.lat, entry.long);
                   bounds.extend(loc);
                });

                map.fitBounds(bounds);       //auto-zoom
                //map.panToBounds(bounds);     //auto-center, no longer required

                //google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
                //    infowindow.open(map, marker);
                //});
            }


            $scope.changeGraph = function() {
                console.log("changeGraph model: " +$scope.model.selectedGraph);
                $scope.getGraphData();
            }

            $scope.DrawGraph = function(graphType, response) {
                console.log("DrawGraph: "+graphType);

                var data = response.json.response.data[0].data[1];

                if ($scope.showGraph) {
                    var valuesToPlot = [];
                    var xAxisCategories = [];
                    var s1 = [];
                    var s2 = [];

                    $.each(data, function(key, entry) {
                       xAxisCategories.push(entry.x);
                       s1.push(parseInt(entry.s1));
                       s2.push(parseInt(entry.s2));
                    });
                    valuesToPlot.push({name: response.json.response.data[0].s1, data: s1});
                    valuesToPlot.push({name: response.json.response.data[0].s2, data: s2});

                    plot3dGraph(valuesToPlot, xAxisCategories, graphType,
                                response.json.response.data[0].xlabel,
                                response.json.response.data[0].ylabel);
                }
            }

            $scope.getGraphData = function() {
                $timeout(function(){
                            delete $rootScope.flash;
                        });
                
                console.log("getGraphData");
                console.log('$scope.selectedGraph: '+ $scope.model.selectedGraph);

                $scope.drawMap = true;
                $scope.showGraph = true;
                $scope.submitButton = false;
                $scope.showTable = true;
                var graphType = '';
                if (!$scope.model.selectedGraph) {    //default to headcountgraph
                    graphType = "headcountgraph";
                } else if ($scope.model.selectedGraph === 'Followup') {
                    graphType = "followupgraph";
                } else {
                    graphType = "headcountgraph";
                };

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6009",
                            "session_id": $rootScope.currentSession,
                            "country": $scope.selectedcountry,
                            "state": $scope.selectedstate,
                            "city": $scope.selectedcity,
/*
                            "segment": $scope.model.segments,
*/
                            "groupzlist": $scope.setCentersgroupzcode[0],
                            "roles": $scope.selectedrole[0],
/*
                            "user": true,
*/
                            "graphtype": graphType
                        }
                    }
                }
                console.log(JSON.stringify(json));

                UserService.HeadCountOrFollowUp(json).then(function(response) {

                 
                    console.log('response: '+JSON.stringify(response));
                    if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success') {
                        $scope.DrawGraph(graphType, response);
                        $scope.DrawMap(response);
                           
                /* var data = response.json.response.data[0].data[0];
                            console.log(data);
                        
                        $scope.dtData = [];
                        $scope.dtData = response.json.response.data[0].data[1];
                        console.log($scope.dtData);
                        console.log($scope.dtData.x);*/
                        
                   /* $scope.xvalue =response.json.response.data[0].data[1][0].x;
                    $scope.s1 = response.json.response.data[0].data[1][0].s1;
                    $scope.s2 = response.json.response.data[0].data[1][0].s2;
                    $scope.totalcount = response.json.response.data[0].data[0];*/
                 
                     $scope.dtData = response;
  $scope.title = $scope.dtData.json.response.data[0];
  $scope.data = $scope.dtData.json.response.data[0].data[1];
                        
console.log($scope.dtData);
console.log($scope.title);
console.log($scope.data);
                        
                        
              
                $scope.xlabel =response.json.response.data[0].xlabel;

                $scope.s1label = response.json.response.data[0].s1;
                $scope.s2label = response.json.response.data[0].s2;
                   
                  /*FlashService.Success(response.json.response.statusmessage);      
                        */
                    }
                    else{
                        FlashService.Error((response.json.response.statusmessage),false);
                         
                         $scope.drawMap = false;
                        $scope.showGraph = false;
                        $scope.showTable = false;
                         /*$scope.drawMap = "response.json.response.statusmessage";*/
                    /* alert(response.json.response.statusmessage);*/   
                       
                /*$scope.showGraph = false;*/
                        
                        
                 
                    }
                    
                })
                
                                       

            };
            
    /**/        
               $scope.getTableData = function(){
                   debugger;
                
                
                $scope.showTable = true;
                  var graphType = '';
                if (!$scope.model.selectedGraph) {    //default to headcountgraph
                    graphType = "headcountgraph";
                } else if ($scope.model.selectedGraph === 'Followup') {
                    graphType = "followupgraph";
                } else {
                    graphType = "headcountgraph";
                };

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6009",
                            "session_id": $rootScope.currentSession,
                            "country": $scope.model.selectedCountry,
                            "state": $scope.model.selectedstate,
                            "city": $scope.model.selectedcity,

                            "groupzlist": $scope.model.setCentersgroupzcode,
                            "roles": $scope.model.selectedrole[0],
                            "user": true,
                            "graphtype": graphType
                        }
                    }
                }
                console.log(JSON.stringify(json));

                UserService.HeadCountOrFollowUp(json).then(function(response) {
                    
                 if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                        {
                 var data = response.json.response.data[0].data[0];
                            console.log(data);
                    $scope.xvalue =response.json.response.data[0].data[1][0].x  
                    $scope.s1 = response.json.response.data[0].data[1][0].s1;
                    $scope.s2 = response.json.response.data[0].data[1][0].s2;
                    $scope.totalcount = response.json.response.data[0].data[0];
                
                    
              
                $scope.xlabel =response.json.response.data[0].xlabel;

                $scope.s1label = response.json.response.data[0].s1;
                $scope.s2label = response.json.response.data[0].s2;
                   
                        
                        }
                })
                    
                    
            };
            
            $scope.getDashboard = function(){
                debugger;
                 $scope.selectMenu(1);
                 $scope.showListAccount = false;
                    $scope.showAccountBtn = false;
            $scope.showAddAccount = false;
                 $scope.displayAccount=false;
            $scope.showviewAccount = false;

                $scope.showDashboard =true;
                $scope.getAccounts();
             

            
            };
            
          

            $scope.Birthdays = function(data, index) {

                var current_date = moment().format('YYYY-MM-DD');
                var date_time = current_date + " 00:00:00";
                console.log(date_time);

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6000",
                            "date": date_time,
                            "country": $scope.selectedcountry,
                            "state": $scope.selectedstate,
                            "city": $scope.selectedcity,
                            "segment": $scope.model.segments,
                            "session_id": $rootScope.currentSession,
                            "groupzlist": $scope.groupzlist
                        }
                    }
                }

                console.log(JSON.stringify(json));

                UserService.Birthdays(json).then(function(response) {

                    var show_birthdays = [];
                    $scope.model.birthdays = [];

                    if (response.json.response.statuscode != 0 && response.json.response.statusmessage != 'Success') {
                        show_birthdays = response.json.response.statusmessage;
                        console.log("show_birthdays " + show_birthdays);
                        $scope.model.birthdays.push(show_birthdays);
                        console.log(show_birthdays);

                    } else {
                        console.log("Greeting response: " + response);
                        var resp = response;
                        show_birthdays = resp.json.response.greetings;
                        console.log(show_birthdays);


                        for (var i = 0; i < show_birthdays.length; i++) {
                            console.log(show_birthdays.length);
                            console.log($scope.model.birthdays.length);
                            $scope.model.name = show_birthdays[i].name;
                            console.log($scope.model.name);
                            $scope.model.shortname = show_birthdays[i].shortname;
                            console.log($scope.model.shortname);
                            $scope.model.role = show_birthdays[i].role;
                            console.log($scope.model.role);
                            $scope.model.division = show_birthdays[i].division;
                            console.log($scope.model.division);
                            $scope.model.profileurl = show_birthdays[i].profileurl;
                            console.log($scope.model.profileurl);


                            var getbirthdays = {};


                            getbirthdays.name = $scope.model.name;
                            getbirthdays.shortname = $scope.model.shortname;
                            getbirthdays.role = $scope.model.role;
                            getbirthdays.division = $scope.model.division;
                            getbirthdays.profileurl = $scope.model.profileurl;
                            $scope.model.birthdays.push(getbirthdays);
                            console.log($scope.model.birthdays);
                        }

                        console.log($scope.model.birthdays);
                    }

                });
            }
    
            $window.localStorage.x = $scope.model.birthdays;
            //setting data in cookies
$scope.Anniversary = function(data, index) {

                var curnt_date = moment().format('YYYY-MM-DD');
                var dt_time = curnt_date + " 00:00:00";
                console.log(dt_time);

                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "6025",
                            "date": dt_time,
                            "country": $scope.selectedcountry,
                            "state": $scope.selectedstate,
                            "city": $scope.selectedcity,
                            "segment": $scope.model.segments,
                            "groupzlist": $scope.groupzlist
                        }
                    }
                }

               
     UserService.Anniversary(json).then(function(response) {
          console.log(JSON.stringify(json));
         var show_anniversary = [];
                    $scope.model.anniversary = [];
                        console.log(JSON.stringify(response));

                    if (response.json.response.statuscode != 0 && response.json.response.statusmessage != 'Success') 
                    {
                        show_anniversary = response.json.response.statusmessage;
                        console.log("show_anniversary " + show_anniversary);
                        $scope.model.anniversary.push(show_anniversary);
                        console.log(show_anniversary);
                    }
         else {
                        console.log("Greeting response: " + response);
                        var resp = response;
                        show_anniversary = resp.json.response.greetings;
                        console.log(show_anniversary);


                        for (var i = 0; i < show_anniversary.length; i++) {
                            console.log(show_anniversary.length);
                            console.log($scope.model.anniversary.length);
                            $scope.model.name = show_anniversary[i].name;
                            console.log($scope.model.name);
                            $scope.model.shortname = show_anniversary[i].shortname;
                            console.log($scope.model.shortname);
                            $scope.model.role = show_anniversary[i].role;
                            console.log($scope.model.role);
                            $scope.model.division = show_anniversary[i].division;
                            console.log($scope.model.division);
                            $scope.model.profileurl = show_anniversary[i].profileurl;
                            console.log($scope.model.profileurl);


                            var getanniversary = {};


                            getanniversary.name = $scope.model.name;
                            getanniversary.shortname = $scope.model.shortname;
                            getanniversary.role = $scope.model.role;
                            getanniversary.division = $scope.model.division;
                            getanniversary.profileurl = $scope.model.profileurl;
                            $scope.model.anniversary.push(getanniversary);
                            console.log($scope.model.anniversary);
                        }

                        console.log($scope.model.anniversary);
                    }
         
     });

                
            }
    
            $scope.logout = function() {
                var json = {
                    "json": {
                        "request": {
                            "servicetype": "6",
                            "functiontype": "5001",
                            "session_id": $rootScope.sessionIds
                        }
                    }
                }

                console.log(json);
            }

            $scope.getDisplayList();
            $scope.GetCountry();

        };
        
        $scope.dashboardMenu = function(){
            debugger;
          var json = 
              { "json":
               {     "request": 
                { "servicetype": "6"	,	
                 "functiontype": "6030", 
                 "session_id": $rootScope.currentSession,
                 "dashboardSummary":"users"
                }
               }
              }
              console.log(JSON.stringify(json));

           UserService.dashboardMenu(json).then(function(response) {
                if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                    {
                        console.log(JSON.stringify(response));
                        $scope.totalusers = response.json.response.data[0].users.MaximumUsers;
                         console.log($scope.totalusers);
                        $scope.awaitingusers = response.json.response.data[0].users.Users;
                        console.log($scope.awaitingusers);
                        
                       /* $scope.totalusers = dashboardData.users[0].total;
                        console.log($scope.totalusers);*/
                    
                        /*$scope.model.totalusers = */
                    }
           });

        
        };
        
          $scope.monthlyFees = function(){
            debugger;
          var json = 
              { "json":
               {     "request": 
                { "servicetype": "6",	
                 "functiontype": "6030", 
                 "session_id": $rootScope.currentSession,
                 "dashboardSummary":"feesMonthly"
                }
               }
              }
              console.log(JSON.stringify(json));

           UserService.monthlyFees(json).then(function(response) {
                            /*console.log(JSON.stringify(response));*/

               
               
                if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                    {
                        console.log(JSON.stringify(response));
            $scope.recfeesMonthly = response.json.response.data[0].fees.Received;
                         console.log($scope.recfeesMonthly);
                        $scope.pendfeesMonthly = response.json.response.data[0].fees.Pending;
                        console.log($scope.pendfeesMonthly);
                        
                
                    }
           });

        
        };
        
        $scope.yearlyFees = function(){
            debugger;
          var json = 
              { "json":
               {     "request": 
                { "servicetype": "6"	,	
                 "functiontype": "6030", 
                 "session_id": $rootScope.currentSession,
                 "dashboardSummary":"feesYearly"
                }
               }
              }
              console.log(JSON.stringify(json));

           UserService.yearlyFees(json).then(function(response) {
                           /* console.log(JSON.stringify(response));*/

               
               
                if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                    {
                     console.log(JSON.stringify(response));
            $scope.recfeesYearly = response.json.response.data[0].fees.Received;
                         console.log($scope.recfeesYearly);
                        $scope.pendfeesYearly = response.json.response.data[0].fees.Pending;
                        console.log($scope.pendfeesYearly);
                        
                
                    }
           });

        
        };
        
         $scope.getAccounts = function(){
            debugger;
          var json = 
              { "json":
               {     "request": 
                { "servicetype": "6"	,	
                 "functiontype": "6030", 
                 "session_id": $rootScope.currentSession,
                 "dashboardSummary":"accounts"
                }
               }
              }
              console.log(JSON.stringify(json));

           UserService.getAccounts(json).then(function(response) {
                           /* console.log(JSON.stringify(response));*/

               
               
                if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                    {
                     console.log(JSON.stringify(response));
            $scope.accounts = response.json.response.data[0].Accounts.Accounts;
                         console.log($scope.accounts);
                        $scope.total = response.json.response.data[0].Accounts.TotalAccounts;
                        console.log($scope.total);
                        
                
                    }
           });

        
        };
        
        
        $scope.initializeMethods();

             $scope.getProfile=function(){
            $scope.displayProfile=true;
            var json = {
                  "json": {
                    "request": {
                      "servicetype": "6",
                      "functiontype": "6007",
                      "session_id": $rootScope.currentSession,
                    }
                  }                
            };
             UserService.GetProfile(json).then(function(response) {
                    $scope.details = response.json.response.data;
                    if($scope.details.dateofbirth){
                            var day = new  Date(response.json.response.data.dateofbirth).getDay();
                            var month = new  Date(response.json.response.data.dateofbirth).getMonth()+1;
                            var year = new  Date(response.json.response.data.dateofbirth).getFullYear();
                            $scope.details.dateofbirth = day+"-"+month+"-"+year;   
                    }
                    $timeout(function(){
                        var currentYear = new Date();
                        currentYear = currentYear.getFullYear()
                                if($scope.details.dateofbirth){
                                    $('#dobdate').combodate({
                                        minYear: 1975,
                                        maxYear: Number(currentYear)
                                    });
                                    $("#dobdate").combodate('setValue', new Date($scope.details.dateofbirth));
                                }else{
                                    $('#dobdate').combodate({
                                    minYear: 1975,
                                    maxYear: Number(currentYear),
                                    firstItem: 'name'
                                    });
                                }
                                    
                            },0);
                    
                     console.log("response:::",$scope.details)
            });
        };
        
        
          /*Account saving starts here*/
        
        $scope.displayAddAccount = function(){
            
            $scope.showAccountBtn = false;
            $scope.showAddAccount = true;
             $scope.showListAccount = false;
            $scope.showDashboard = false;
        };
        
        
        $scope.saveAccount = function(){
            
             debugger;
            
          
            var json ={
                
                
  "json": {
    "request": {
      "servicetype": "6",
      "functiontype": "6011",
      "session_id":$rootScope.currentSession,
      "data": {
      
        "groupzcode": $scope.model.acode,
        "groupzname": $scope.model.aname,
      "address": $scope.model.streeta,
        "area": $scope.model.area,
        "city": $scope.model.city,
        "state":$scope.model.state ,
        "country": $scope.model.country,
        "postalcode": $scope.model.pincode,
     
        "mobile": "91"
       
      }
    }
  }
};
         
               
            console.log(json);
                UserService.saveAccount(json).then(function(response) {
                    alert(angular.toJson(response));
                     if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                         {
                                            FlashService.Success(response.json.response.statusmessage);
                                                                                            $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);


                             $scope.showListAccount = true;
                             
                         }
                    else {
                                                 FlashService.Error(response.json.response.statusmessage);
                                                                 $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);

                            }

                });
            };
      /*  
        $scope.displayListAccount = function(){
          debugger;
            $scope.showAddAccount =false;
            $scope.showListAccount=true;
            $scope.viewAccount();
              
        };*/
        /*ending account*/
        
        
         $scope.ChangeviewAccount = function(){
            debugger;
          $scope.displayAccount=true;
            $scope.showviewAccount = true;
                   $scope.showListAccount = true;
            $scope.showAddAccount = false;
           
                    $scope.checkedStatus = !$scope.checkedStatus;
         
         if($scope.checkedStatus === true){
             $scope.newStatus = false
         }
         else if($scope.checkedStatus === false){
             $scope.newStatus =true
         }
         console.log("Iam new ----->"+$scope.newStatus);
                  console.log("Iam new ----->"+$scope.checkedStatus);

         
              var json = {
      
  "json": {
    "request": {
      "servicetype": "6",
      "functiontype": "6014",
      "session_id": $rootScope.currentSession,
           "data": {
        "shortname": $scope.model.selectShortName,
        "groupzname": $scope.model.selectGname,
        "city": $scope.model.selectCity,
        "state": $scope.model.selectState,
        "country": $scope.model.selectCountry,
        "groupzcode": $scope.model.selectGcode,
         "activationstatus": $scope.newStatus,
        "details": false,
        "sortbasedon": $scope.groupzname,
        "orderby": "desc",
        "limit":10,
           }
      
    }
  }
};
            
              UserService.viewListAccount(json).then(function(response) {

  console.log(JSON.stringify(json));
                 if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                        {
                   $scope.tableData = response.json.response.data;
                  console.log($scope.tableData);
                        }
                  else{
                    FlashService.Error(response.json.response.statusmessage);
                            $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);
              
                  }

            }); 
        };
        
        
        $scope.deactivateAccount = function(item){
                      
            
           var json =  {
  "json": {
    "request": {
      "servicetype": "6",
       "functiontype": "6018",
     "session_id":$rootScope.currentSession, 
      "data": {
        "groupzcode": item.groupzcode,
        "enable": false
      }
    }
  }
}
           
           UserService.deactivateAccount(json).then(function(response) {

  console.log(JSON.stringify(json));
                 if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                        {
                                            FlashService.Success(response.json.response.statusmessage);
                                                                                                              $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);
                            $scope.viewAccount();

                  
                        }
                  else{
                                            FlashService.Error(response.json.response.statusmessage);
                                                                                       $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);

              
                  }

            }); 
           
        };
        /*Editing Account*/
        
           $scope.editAccount = function(item){
            debugger; 
               $scope.showEditAccount = true;
               $scope.showAddAccount = false;
               $scope.showListAccount = false;
              $scope.showAddBtn = false;
           $scope.groupzid = item.groupzid;

           $scope.model.dName = item.shortname;
       $scope.model.aname = item.groupzname;
       $scope.model.streeta = item.area;
       $scope.model.city = item.city;
       $scope.model.state = item.state;
       $scope.model.country = item.country;
       $scope.model.acode = item.groupzcode;
       console.log(item.groupzcode);
               console.log($scope.model.acode);
             
                  
           };
               $scope.updateAccount=function(item){
                   
    debugger;
           
              var json = {
                    "json": {
    "request": {
      "servicetype": "6",
      "functiontype": "6012",
      "session_id": $rootScope.currentSession,
           "data": {
        "groupzid":$scope.groupzid,
       "groupzcode": $scope.model.acode,
        "groupzname": $scope.model.aname,
      "address": $scope.model.streeta,
        "area": $scope.model.area,
        "city": $scope.model.city,
        "state":$scope.model.state ,
        "country": $scope.model.country,
        "postalcode": $scope.model.pincode,
       
     
        "mobile": "91"
        
           }
      
    }
  }
              };
               
                UserService.editListAccount(json).then(function(response) {

  console.log(JSON.stringify(json));
                    
                 if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                        {
                            /*alert(response.json.response.statusmessage);
                           */ FlashService.Success(response.json.response.statusmessage); 
                                       $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);
                            $scope.showListAccount = true;

                             console.log(JSON.stringify(response));
                                            
                                         
                             
                         

                  
                        }
                  else{
                  /*alert(response.json.response.statusmessage);*/
                     FlashService.Error(response.json.response.statusmessage);
                                 $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);
              
                  }

            }); 
               
           };
         
       
          /*Account saving starts here*/
        
        $scope.cancelAccount = function(){
            
            
           
         
                console.log($scope.storeAccount);
                    console.log($scope.storeAccount[7]);      
                if ($scope.storeAccount[7] === 10) {
                    
                      $scope.model.dName = "";
       $scope.model.aname = "";
       $scope.model.streeta ="";
       $scope.model.city = "";
       $scope.model.state = "";
       $scope.model.country = "";
       $scope.model.acode = "";
                   
             
             } else {
                 
                 console.log($scope.storeAccount[6]);
                                                        
                    
                    
                    $scope.model.dName = $scope.storeAccount[0];
                    $scope.model.aname = $scope.storeAccount[1];
                    $scope.model.streeta = $scope.storeAccount[2];
                 $scope.model.city = $scope.storeAccount[3];
                   $scope.model.state = $scope.storeAccount[4];
                   $scope.model.country = $scope.storeAccount[5];
                   $scope.model.acode = $scope.storeAccount[6];
                    
                }
            
            $timeout(function() {
                $scope.viewAccount();
                
            }, 200);
        };
            console.log( $scope.storeAccount[6]);
     
        $scope.getAssignRole = function(item,value){
            debugger;
            console.log(item.groupzcode);

            var json = {
  "json": {
    "request": {
      "servicetype": "6",
      "functiontype": "6028",
      "session_id": $rootScope.currentSession,
    
      "data": {
        "groupzcode": item.groupzcode
      }
    }
  }
}
          UserService.getAssignRoles(json).then(function(response) {
                console.log(JSON.stringify(response));

     if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
    {
        $scope.model.assignroles = [], assignrolesArray = [];

        var unasresdata = response.json.response.data.unassignedroles;
        var assresdata = response.json.response.data.assignedtoles;
        
        assignrolesArray = unasresdata.concat(assresdata);

        $scope.model.assignroles = assignrolesArray;
       
       
      /*  for( var i = 0; i < assignrolesArray.length ; i++){
              roleInfo = assignrolesArray[i].roleinformation;
            console.log(roleInfo);
        }*/
         
  /*  $scope.model.rolename = assignrolesArray[0].rolename;*/
        console.log($scope.model.rolename);
       
  for( var i = 0; i < assignrolesArray.length ; i++){
    
       if (($scope.model.rolename === assignrolesArray[i].rolename) && (assignrolesArray[i].rolename !== undefined )){
           roleInfo = assignrolesArray[i].roleinformation;
            console.log(roleInfo);
           for (i in roleInfo)
    console.log(i) // i == "QA"     
           
  }
    
      
              
    }
  
    }
   });
        };
        
         /*   console.log(i);
            console.log(assignrolesArray[i]);
            console.log(assignrolesArray.length);
       if( $scope.model.rolename === assignrolesArray[i].rolename){
         console.log("Genius");
           
       }else{
                    console.log("errrr");

       }
            
       
              }*/

        
        
        /*deactivate account display*/
        
       /* $scope.changeAccount = function(){
            

            $scope.viewAccount();
        };*/
        
      
        /*Listing Account*/
        
         
     $scope.viewAccount = function(){
			 $scope.selectMenu(2);
            debugger;
          $scope.displayAccount=true;
            $scope.showviewAccount = true;
                   $scope.showListAccount = true;
            $scope.showAddAccount = false;
            $scope.showAddBtn = true;
         $scope.showDashboard = false;
            
     
              var json = {
      
  "json": {
    "request": {
      "servicetype": "6",
      "functiontype": "6014",
      "session_id": $rootScope.currentSession,
           "data": {
        "shortname": $scope.model.selectShortName,
        "groupzname": $scope.model.selectGname,
        "city": $scope.model.selectCity,
        "state": $scope.model.selectState,
        "country": $scope.model.selectCountry,
        "groupzcode": $scope.model.selectGcode,
         "activationstatus": true,
        "details": false,
        "sortbasedon": $scope.groupzname,
        "orderby": "desc",
/*
        "limit":10,
*/
        "offset":$scope.pagination
           }
      
    }
  }
};


						$scope.sortkey='';
						$scope.reverse=false;
					

  console.log($scope.checkedStatus);
  console.log(JSON.stringify(json));

            
              UserService.viewListAccount(json).then(function(response) {
                 
  console.log(JSON.stringify(json));
                 if (response.json.response.statuscode == 0 && response.json.response.statusmessage == 'Success')
                     {
                   $scope.tableData = response.json.response.data;
                  console.log(JSON.stringify($scope.tableData));
                            
                        }
                  else{
                                    FlashService.Error((response.json.response.statusmessage),false);
                           $timeout(function() {
                            delete $rootScope.flash;
                        }, 2000);
                                
                  }

            }); 
        };
        
        /*End Listing account*/
        
      $scope.saveProfile = function(){
            var json ={
                  "json": {
                    "request": {
                      "servicetype": "6",
                      "functiontype": "6008",
                      "session_id": $rootScope.currentSession,
                      "data": {
                        "memberid": $scope.details.memberid,
                        "profileid":  $scope.details.profileid,
                        "name":  $scope.details.name,
                        "gender":  $scope.details.gender,
                        "dateofbirth": $scope.details.dateofbirth,
                         "bloodgroup": $scope.details.bloodgroup,
                        "mobile": $scope.details.mobile,
                        "landline":$scope.details.landline,
                        "email": $scope.details.email,
                        "contactpersonid": $scope.details.contactpersonid,
                        "dontrecieveemail": false,
                        "dontrecievesms": false
                      }
                    }
                  }
                };
                UserService.SaveProfile(json).then(function(response) {
                    alert(angular.toJson(response));

                });
            };
                $scope.cancelProfile = function(){
                    $scope.editdetails = false;
                    $scope.details = null;
                    $scope.displayProfile = false;
                    $scope.showGraph = false;
                     $scope.getDisplayList();
                    $scope.GetCountry();
                };

         
    });
})();
