/**
 * Created by davo on 3/7/2018.
 */
(function() {
    'use strict';
    var csvApp = angular.module('csvTaskApp');

    csvApp.directive('csvFileModel', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.csvFileModel); // Convert expression into a function
                var modelSetter = model.assign; // Define a setter for csvFileModel

                // Bind change event on the element
                element.bind('change', function () {
                    // Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        // Set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });

    csvApp.directive('exportToCsv',function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.bind('click', function(){
                    var table = document.getElementById('csvTable');
                    var csvString = '';
                    for(var i=0; i<table.rows.length;i++){ // Get cells from each raw in the table
                        var rowData = table.rows[i].cells;
                        for(var j=0; j<rowData.length-1;j++){ // Get text values from each cell besides the last cell with buttons
                            csvString = csvString + rowData[j].innerText + ";"; // Add cell values separated with semicolon
                        }
                        csvString = csvString.substring(0,csvString.length - 1);
                        csvString = csvString + "\n";
                    }
                    csvString = csvString.substring(0, csvString.length - 1);
                    // Make hidden a element and trigger click on it
                    var a = $('<a/>', {
                        style:'display:none',
                        href:'data:application/octet-stream;base64,'+btoa(csvString),
                        download:'exportFromTable.csv'
                    }).appendTo('body')
                    a[0].click()
                    a.remove();
                });
            }
        }
    });

})();