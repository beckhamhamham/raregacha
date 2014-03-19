angular.module('fbApp', []);

(function () {
    if (typeof window.console === "undefined") {
        window.console = {}
    }
    if (typeof window.console.log !== "function") {
        window.console.log = function () {}
    }
})();

var mainCtrl = function ($scope, $http) {
    var BUCKET_NAME = "myBucket";
    var OBJECT_KEY = "objectId";

    // the user clicked the 'sign in' button
    function autoLogin() {
        var token = localStorage.getItem("token");
        if (token != undefined) {
            console.log(token);
            KiiUser.authenticateWithToken(token, {
                success: function (theAuthedUser) {
                    // do something with the authenticated user
                    refreshUserInformation();
                    //$.mobile.hidePageLoadingMsg();
                    console.log("auto login suceeded.");
                },

                failure: function (theUser, anErrorString) {
                    // do something with the error response
                    //$.mobile.hidePageLoadingMsg();
                    console.log("Error auto login: " + anErrorString);
                }
            });

        } else {
            refreshUserInformation();
        }
    }

    function setStatus(isLoggedin, name) {
        if (isLoggedin) {
            $("#login-button").addClass("invisible");
            $("#login-button").removeClass("visible");
            $("#login-name").addClass("visible");
            $("#login-name").removeClass("invisible");
            $("#login-name").html(name);

            $("#logout-button").addClass("visible");
            $("#logout-button").removeClass("invisible");
        } else {
            $("#login-button").addClass("visible");
            $("#login-button").removeClass("invisible");
            $("#login-name").addClass("visible");
            $("#login-name").removeClass("invisible");
            $("#login-name").html("");

            $("#logout-button").addClass("invisible");
            $("#logout-button").removeClass("visible");
        }
    }

    function refreshUserInformation() {
        // Update the current user's info.
        var user = KiiUser.getCurrentUser();

        if (user != undefined) {
            user.refresh({
                // logged in
                success: function (theUser) {
                    console.log("User's information updated!");

                    // Get the predefined fields.
                    var displayName = theUser.getDisplayName();
                    var id = theUser.getUUID();
                    var token = theUser.getAccessToken();
                    localStorage.setItem("token", token);
                    setStatus(true, displayName);
                    console.log(theUser);
                    console.log("Users displays = " + displayName, ", id =" + id, ", token = " + token);
                },
                failure: function (theUser, errorString) {
                    localStorage.removeItem("token");
                    setStatus(false, null);
                    console.log("Error: " + errorString);
                }
            });
        } else {
            // not logged in
            localStorage.removeItem("token");
            setStatus(false, null);
        }
    }

    // the user clicked the 'sign up' button
    $scope.loginWithFacebook = function () {
        KiiSocialConnect.logIn(KiiSocialNetworkName.FACEBOOK, null, {
            // successfully connected to facebook
            success: function (user, network) {
                console.log("Connected user " + user + " to network: " + network);
                //$.mobile.hidePageLoadingMsg();
                refreshUserInformation();
            },
            // unable to connect
            failure: function (user, network, error) {
                console.log("Unable to connect to " + network + ". Reason: " + error);
                //$.mobile.hidePageLoadingMsg();
            }
        });
    }

    $scope.logout = function () {
        KiiUser.logOut();
        refreshUserInformation();
    }

    $scope.addValue = function () {
        var user = KiiUser.getCurrentUser();
        var bucket = user.bucketWithName(BUCKET_NAME);

        if ($scope.text == undefined) {
            return;
        }

        // Create the object with key/value pairs in this bucket
        var obj = bucket.createObject();
        obj.set(OBJECT_KEY, $scope.text);

        // Save the object
        obj.save({
            success: function (theObject) {
                console.log("Object saved!");
                console.log(theObject);
                alert("data inserted.");
            },
            failure: function (theObject, errorString) {
                console.log("Error saving object: " + errorString);
                alert("data insertion failed.");
            }
        });
    }

    $scope.loadValues = function () {
        var user = KiiUser.getCurrentUser();
        var bucket = user.bucketWithName(BUCKET_NAME);

        // Build "all" query
        var all_query = KiiQuery.queryWithClause();
        all_query.sortByAsc("_created");

        // Define the callbacks
        var queryCallbacks = {
            success: function (queryPerformed, resultSet, nextQuery) {
                // do something with the results
                $scope.$apply(function () {
                    $scope.values = [];
                    for (var i = 0; i < resultSet.length; i++) {
                        // do something with the object resultSet[i];
                        console.log(resultSet[i].get(OBJECT_KEY));
                        $scope.values.push(resultSet[i].get(OBJECT_KEY));
                    }
                    if (nextQuery != null) {
                        // There are more results (pages).
                        // Execute the next query to get more results.
                        bucket.executeQuery(nextQuery, queryCallbacks);
                    }
                });

            },
            failure: function (queryPerformed, anErrorString) {
                // do something with the error response
                console.log("error occured at executeQuery : " + anErrorString);
            }
        }
        // Execute the query
        bucket.executeQuery(all_query, queryCallbacks);
    }


    window.fbAsyncInit = function () {
        Kii.initializeWithSite(KII_APP_ID, KII_SECRET, KiiSite.JP);

        // set options required by Facebook's API
        var options = {
            channelUrl: null,
            status: true,
            cookie: true,
            xfbml: true
        };

        // Initialize the SNS for later use
        KiiSocialConnect.setupNetwork(KiiSocialNetworkName.FACEBOOK, FB_APP_ID, null, options);

        autoLogin();
    };

    (function () {
        var e = document.createElement('script');
        e.src = 'http://connect.facebook.net/en_US/all.js';
        e.async = true;
        document.getElementById('fb-root').appendChild(e);
    }());
}