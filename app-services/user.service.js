(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        
        service.Login = Login;
        service.adminLogin = adminLogin;
        service.membername = membername;
        service.getSessionInfo = getSessionInfo;
        service.Geography = Geography;
        service.GeographyAccounts = GeographyAccounts;
        service.Birthdays = Birthdays;
        service.Anniversary = Anniversary;
        service.HeadCountOrFollowUp = HeadCountOrFollowUp;
        service.FollowUp = FollowUp;
        service.logout = logout;
        service.GetProfile =GetProfile;
        service.SaveProfile = SaveProfile;
        service.saveAccount = saveAccount;
        service.viewListAccount = viewListAccount;
        service.editListAccount = editListAccount;
        service.deactivateAccount = deactivateAccount;
        service.dashboardMenu = dashboardMenu;
        service.getAssignRoles = getAssignRoles;
          service.monthlyFees = monthlyFees;
        service.yearlyFees = yearlyFees;
        service.getAccounts = getAccounts;
 service.submitform = submitform;
        service.updateForm = updateForm;
        service.getTable= getTable;


        return service;;

        
        
        
        
        function Login(user) {
            return $http.post('http://prod1.groupz.in:7000/Authentication?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
                
        function adminLogin(user) {
            return $http.get('http://prod1.groupz.in:7070/AdminDB/AdminLoginServlet?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }

        // getting selected account response using current session id
        function getSessionInfo(user) {
            return $http.get('http://prod1.groupz.in:7000/getSessionInfo?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
        
        function membername(user) {
            return $http.get('http://prod1.groupz.in:7000/getSessionInfo?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
        
        // getting country, state, city, segment
                
        function Geography(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
        
        // getting centers and roles based on geography
        
        function GeographyAccounts(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
        
        // getting birthdays based on geography
        
        function Birthdays(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));           
        }
        
        function Anniversary(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));           
        }
        
        // getting headcounts and followup (chart) using geography accounts
        
        function HeadCountOrFollowUp(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }

        function FollowUp(user) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
        }
        
        function logout(user) {
            return  $http.get('http://prod1.groupz.in:7000/logout?request=' + JSON.stringify(user)).then(handleSuccess, handleError('Error Login'));
            
        }

        function GetProfile(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in getting profile'));
            
        }

        function SaveProfile(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in saving profile'));
            
        }
        
          function saveAccount(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in saving Account'));
            
        }
        
             function viewListAccount(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in showing Account'));
            
        }
        
          function editListAccount(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in showing Account'));
            
        }
        
        function deactivateAccount(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in showing Account'));
            
        }
        
         function dashboardMenu(data) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(data)).then(handleSuccess, handleError('Error in showing Account'));
            
        }
        
         function getAssignRoles(role) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(role)).then(handleSuccess, handleError('Error in showing Account'));
            
        }
        
         function monthlyFees(feesMonthly) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(feesMonthly)).then(handleSuccess, handleError('Error in showing Fees'));
            
        }
        
        function yearlyFees(feesYearly) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(feesYearly)).then(handleSuccess, handleError('Error in showing Fees'));
            
        }
        
        function getAccounts(accounts) {
            return $http.get('http://prod1.groupz.in:7000/Authenticator?request=' + JSON.stringify(accounts)).then(handleSuccess, handleError('Error in showing Fees'));
            
        }
function getTable() {
            return $http.get('http://prod1.groupz.in:7000/getValidators').then(handleSuccess, handleError('Error in showing Values'));
            
        }
        
         function submitform(user) {
            return $http.post('http://prod1.groupz.in:7000/add?request=' + JSON.stringify(user));
         }
        function updateForm(user) {
            return $http.post('http://prod1.groupz.in:7000/add?request=' + JSON.stringify(user));
         }
        
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
