define([
    "dojo/_base/declare"
], function(
    declare
) {
    var clazz = {
        selectAllData: function(layer) {
            var allData = document.getElementById("allData");
            var positiveData = document.getElementById("positiveData");
            var negativeData = document.getElementById("negativeData");
            var sliderDiv = document.getElementById('sliderBar');
            var numeSelectie = document.getElementsByClassName('btn btn-transparent dropdown-btn js-dropdown-toggle');
            var simbol = '<svg id="searchJudete" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M31.607 27.838l-6.133-6.137a1.336 1.336 0 0 0-1.887 0l-.035.035-2.533-2.533-.014.014c3.652-4.556 3.422-11.195-.803-15.42-4.529-4.527-11.875-4.531-16.404 0-4.531 4.531-4.529 11.875 0 16.406 4.205 4.204 10.811 4.455 15.365.848l.004.003-.033.033 2.541 2.54a1.33 1.33 0 0 0 .025 1.848l6.135 6.133a1.33 1.33 0 0 0 1.887 0l1.885-1.883a1.332 1.332 0 0 0 0-1.887zM17.811 17.809a8.213 8.213 0 0 1-11.619 0 8.217 8.217 0 0 1 0-11.622 8.219 8.219 0 0 1 11.619.004 8.216 8.216 0 0 1 0 11.618z"/></svg>';

            // console.log("Select All Data");
            var expresie = "1 = 1";
            layer.definitionExpression = expresie;

            layer.queryFeatures().then(function(results) {
                date = results.features;
                // console.log(date);

                listaValori = [];
                date.forEach(function(result) {
                    var attributes = result.attributes;
                    var siruta = attributes["SIRUTA"];
                    var pop2007 = attributes["Anul_2007"];
                    var pop2017 = attributes["Anul_2017"];
                    // console.log(attributes);
                    var diff = pop2017 - pop2007;
                    var pctChange = (diff * 100) / pop2007;
                    listaValori.push([pctChange.toFixed(2), siruta]);

                });

                listaScor = [];
                listaValori.forEach(function(valoare) {
                    listaScor.push(valoare[0]);
                    maxValue = Math.max(...listaScor);
                    minValue = Math.min(...listaScor);
                });

                sliderDiv.noUiSlider.set([minValue, maxValue]);
                numeSelectie[0].innerHTML = "Select Judet" + simbol;
            })
        },

        selectPositiveData: function(view, layer) {
            // console.log("Select Positive");

            var allData = document.getElementById("allData");
            var positiveData = document.getElementById("positiveData");
            var negativeData = document.getElementById("negativeData");
            var sliderDiv = document.getElementById('sliderBar');
            var numeSelectie = document.getElementsByClassName('btn btn-transparent dropdown-btn js-dropdown-toggle');
            var simbol = '<svg id="searchJudete" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M31.607 27.838l-6.133-6.137a1.336 1.336 0 0 0-1.887 0l-.035.035-2.533-2.533-.014.014c3.652-4.556 3.422-11.195-.803-15.42-4.529-4.527-11.875-4.531-16.404 0-4.531 4.531-4.529 11.875 0 16.406 4.205 4.204 10.811 4.455 15.365.848l.004.003-.033.033 2.541 2.54a1.33 1.33 0 0 0 .025 1.848l6.135 6.133a1.33 1.33 0 0 0 1.887 0l1.885-1.883a1.332 1.332 0 0 0 0-1.887zM17.811 17.809a8.213 8.213 0 0 1-11.619 0 8.217 8.217 0 0 1 0-11.622 8.219 8.219 0 0 1 11.619.004 8.216 8.216 0 0 1 0 11.618z"/></svg>';
            numeSelectie[0].innerHTML = "Select Judet" + simbol;
            layer.definitionExpression = "1=1";
            // console.log(layer);
            layer.queryFeatures().then(function(results) {
                date = results.features;
                // console.log(date);

                listaValori = [];
                date.forEach(function(result) {
                    var attributes = result.attributes;
                    var siruta = attributes["SIRUTA"];
                    var pop2007 = attributes["Anul_2007"];
                    var pop2017 = attributes["Anul_2017"];
                    // console.log(attributes);
                    var diff = pop2017 - pop2007;
                    var pctChange = (diff * 100) / pop2007;
                    listaValori.push([pctChange.toFixed(2), siruta]);

                });

                listaScor = [];
                listaValori.forEach(function(valoare) {
                    listaScor.push(valoare[0]);
                    maxValue = Math.max(...listaScor);
                    minValue = Math.min(...listaScor);
                });

                // console.log(listaValori);

                listaSIRUTA = []
                for (i = 0; i < listaValori.length; i++) {
                    valoare = parseFloat(listaValori[i][0]);
                    if (valoare >= 0 && valoare <= maxValue) {
                        listaSIRUTA.push(listaValori[i][1]);
                    }
                }
                sliderDiv.noUiSlider.set([0, maxValue]);
                expresie = "SIRUTA IN ("
                listaSIRUTA.forEach(function(siruta) {
                    expresie += siruta + ','
                });
                expresie = expresie.substring(0, expresie.length - 1) + ")";
                // console.log(expresie);
                layer.definitionExpression = expresie;
            });
        },

        selectNegativeData: function(view, layer) {

            var allData = document.getElementById("allData");
            var positiveData = document.getElementById("positiveData");
            var negativeData = document.getElementById("negativeData");
            var sliderDiv = document.getElementById('sliderBar');
            var numeSelectie = document.getElementsByClassName('btn btn-transparent dropdown-btn js-dropdown-toggle');
            var simbol = '<svg id="searchJudete" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M31.607 27.838l-6.133-6.137a1.336 1.336 0 0 0-1.887 0l-.035.035-2.533-2.533-.014.014c3.652-4.556 3.422-11.195-.803-15.42-4.529-4.527-11.875-4.531-16.404 0-4.531 4.531-4.529 11.875 0 16.406 4.205 4.204 10.811 4.455 15.365.848l.004.003-.033.033 2.541 2.54a1.33 1.33 0 0 0 .025 1.848l6.135 6.133a1.33 1.33 0 0 0 1.887 0l1.885-1.883a1.332 1.332 0 0 0 0-1.887zM17.811 17.809a8.213 8.213 0 0 1-11.619 0 8.217 8.217 0 0 1 0-11.622 8.219 8.219 0 0 1 11.619.004 8.216 8.216 0 0 1 0 11.618z"/></svg>';
            numeSelectie[0].innerHTML = "Select Judet" + simbol;
            layer.definitionExpression = "1=1";
            // console.log(layer);
            layer.queryFeatures().then(function(results) {
                date = results.features;
                // console.log(date);

                listaValori = [];
                date.forEach(function(result) {
                    var attributes = result.attributes;
                    var siruta = attributes["SIRUTA"];
                    var pop2007 = attributes["Anul_2007"];
                    var pop2017 = attributes["Anul_2017"];
                    // console.log(attributes);
                    var diff = pop2017 - pop2007;
                    var pctChange = (diff * 100) / pop2007;
                    listaValori.push([pctChange.toFixed(2), siruta]);

                });

                listaScor = [];
                listaValori.forEach(function(valoare) {
                    listaScor.push(valoare[0]);
                    maxValue = Math.max(...listaScor);
                    minValue = Math.min(...listaScor);
                });

                // console.log(listaValori);

                listaSIRUTA = []
                for (i = 0; i < listaValori.length; i++) {
                    valoare = parseFloat(listaValori[i][0]);
                    if (valoare >= minValue && valoare <= 0) {
                        listaSIRUTA.push(listaValori[i][1]);
                    }
                }
                sliderDiv.noUiSlider.set([minValue, 0]);
                expresie = "SIRUTA IN ("
                listaSIRUTA.forEach(function(siruta) {
                    expresie += siruta + ','
                });
                expresie = expresie.substring(0, expresie.length - 1) + ")";
                // console.log(expresie);
                layer.definitionExpression = expresie;
            });
        }
    }
    return clazz
});