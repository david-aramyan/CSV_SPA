/**
 * Created by davo on 3/7/2018.
 */
(function () {
    'use strict';
    var csvApp = angular.module('csvTaskApp');
    csvApp.controller('CsvParseController', function ($scope) {

        $scope.displayTable = function () {
        // split content based on new line
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    var csv = reader.result;
                    var csvLines = csv.split(/\r\n|\n/);
                    var headers = csvLines[0].split(';');
                    var lines = [];

                    for ( var i = 0; i < csvLines.length; i++) {
                        // Split content based on semicolon
                        var data = csvLines[i].split(';');
                        if (data.length == headers.length) {
                            var tarr = [];
                            for ( var j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }
                            lines.push(tarr);
                        }
                    }
                    $scope.data = lines;
                });
            };
        reader.readAsText($scope.csvFile);


        };

        // Check value regex
        $scope.checkRegex = function(y) {
            if(/^[a-z]+$/i.test(y)){
                return "letters";
            }else if(!isNaN(y) && y !== ''){
                return "numbers";
            }else{
                return false;
            }
        };
        // Toggle edit
        $scope.editAppKey = function() {

            $scope.editMode = false;
        }

    });
})();
