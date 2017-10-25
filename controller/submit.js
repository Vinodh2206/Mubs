(function() {
    'use strict';

     var app = angular
            .module('app')
        
    app.controller('formController', formController);
    
    formController.$inject = ['$rootScope', '$scope', '$window','$http', 'UserService', '$cookieStore', '$timeout'];

    function formController($rootScope, $scope, $window, $http, UserService, $cookieStore, $timeout) {

   /*   var vm = this;
        
        vm.submit = submit;*/
    $scope.cachefunction="";
                   
        $scope.type=[];
        $scope.servicetype=[];
        $scope.functiontype=[];
        $scope.offset=[];
        $scope.groupzname=[];
        $scope.uri=[];
        
         $scope.showTable = false;
         $scope.showForm = true;
 
        $scope.submit = function(){
       
            
             debugger;
            
          
        var json = {
  "json": {
    "request": {
    
     
  "functionType": $scope.cachefunction,
  "contentServiceType": $scope.backendservice,
  "contentFunctionServiceType": $scope.backendfunction,
  "roleOffset": $scope.offset,
  "groupzmodulename": $scope.groupz,
  "url": $scope.url
    }
  }
};

               
            console.log(json);
            /*
            $scope.submitForm = UserService.submitform(json);
            console.log($scope.submitForm);*/
                UserService.submitform(json).then(function(response) {
                    console.log(response);
                    console.log(JSON.stringify(response));
                    console.log(response.status);
                     if (response.status === 200)
                         {
        
                        alert(response.data.data)
                                                          
                             $scope.showForm = false;
                             $scope.showTable = true;
                             $scope.getTable();
                             
                             console.log($scope.showTable);
                                                          
                
                         }
                     
						

                });
            $scope.cachefunction = null;
            $scope.backendservice = null;
            $scope.backendfunction = null;
            $scope.offset = null;
            $scope.groupz = null;
            $scope.url= null;
            
            
            
            };
  
          $scope.getTable = function(){
              
               UserService.getTable().then(function(response) {
                   $scope.dataValues =response.data;

                   console.log(JSON.stringify(response));
                   console.log(JSON.stringify(response.data));
                    /* console.log(response.data[uri]);*/
                   
               
        /*$scope.type=$scope.dataValues.functiontype;
                   console.log($scope.type);*/
                   
   
               });
          };
        
        
        $scope.updateForm = function(item){
      
             debugger;
            
            $scope.newcacheFn=item.functiontype;
            $scope.newbackSer=item.contentservicetype;
            $scope.newbackCon=item.contentfunctiontype;
            $scope.newOffset=item.roleoffset;
            $scope.newGroupz=item.groupzmodulename;
            $scope.newUrl=item.uri;
          
            console.log($scope.newUrl);
            
            
        var json = {
  "json": {
    "request": {
      "id":item.id ,
      "functionType": $scope.newcacheFn,
      "contentServiceType": $scope.newbackSer,
      "contentFunctionServiceType": $scope.newbackCon,
      "roleOffset": $scope.newOffset,
      "groupzmodulename": $scope.newGroupz,
      "uri":  $scope.newUrl
    }
  }
};
       
            console.log(json);

                UserService.updateForm(json).then(function(response) {
                    console.log(response);
                    console.log(JSON.stringify(response));
                    console.log(response.status);
                     if (response.status === 200)
                         {
        
                        alert(response.data.data)
                          
                         }
          
                });
                    
            
            };
  
        
    } 
   
})();
