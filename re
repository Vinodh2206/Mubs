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