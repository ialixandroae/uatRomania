require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/tasks/support/FeatureSet",
    "esri/widgets/Search",
    "esri/symbols/PictureMarkerSymbol",
    "app/symbolizeData",
    "app/popupTemplate",
    "app/legendTemplate",
    "app/createCharts",
    "app/filter",
    "app/slider",
    "app/selector",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
], function(Map, MapView, FeatureLayer, FeatureSet, Search, PictureMarkerSymbol,
    symbolizeData, popupTemplate, legendTemplate, createCharts, Filter, slider,
    selector, on, dom) {

    // Creare renderer date
    var symbol = symbolizeData;
    var renderer = symbol.simbolizare();

    //Creare popup template
    var popupClazz = popupTemplate;
    var popupTemplate = popupClazz.createPopup();

    // Creare legend template
    var legendTab = document.getElementById('legendTab');
    var legendClazz = legendTemplate;

    // Creare charts template
    var charts = createCharts;

    // Creare filter template
    var filter = Filter;

    // Creare slider instance
    var slider = slider;

    // Creare selector instance
    var selector = selector;

    // Creare obiect layer
    var uat = new FeatureLayer({
        url: "https://services6.arcgis.com/MLuUQwq7FiARivuF/arcgis/rest/services/Serviciu_UAT_Puncte/FeatureServer",
        outFields: ["*"],
        popupEnabled: true,
        popupTemplate: popupTemplate,
        renderer: renderer
    });

    // Creare obiect map/harta
    var map = new Map({
        basemap: "dark-gray",
    });

    // Creare view harta si definire proprietati
    var mapView = new MapView({
        container: "map", // Reference to the scene div created in step 5
        map: map, // Reference to the map object created before the scene
        zoom: 8, // Sets zoom level based on level of detail (LOD)
        center: [26.10, 44.44], // Sets center point of view using longitude,latitude
        constraints: {
            rotationEnabled: false
        }
    });

    map.add(uat); //adaugare layer in harta



    var searchSource = [{
        featureLayer: uat,
        searchFields: ["Localitate"],
        displayField: "Localitate",
        placeholder: "Search for names or click it in the table",
        outFields: ["Localitate", "Judet", "SIRUTA", "Anul_2007", "Anul_2012", "Anul_2017"],
        resultSymbol: new PictureMarkerSymbol({
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/752px-Map_pin_icon.svg.png",
            size: 25,
            width: 25,
            height: 35,
            xoffset: 0,
            yoffset: 0
        })
    }]
    var searchWidget = new Search({
        view: mapView,
        sources: searchSource,
        autoSelect: true,
        popupOpenOnSelect: true,
        resultGraphicEnabled: true,
        container: 'searchBox'
    });

    mapView.whenLayerView(uat).then(function(layerView) {
        // Queries for all the features in the service (not the graphics in the view)
        insertHeadRows();
        var legendTemplate = legendClazz.createLegend(mapView, uat, legendTab);
        uat.queryFeatures().then(function(results) {
            // prints an array of all the features in the service to the console
            // console.log(results.features);
            var features = results.features;
            var noOfFeatures = document.getElementById('featuresLength');
            noOfFeatures.innerHTML = "No. of Administrative Units: " + features.length;
            for (i = 0; i < features.length; i++) {
                // console.log(features[i]);
                insertBodyRows(features[i]);
            }
            filter.getData(features, uat, mapView);
            slider.createSlider(features, uat);
        });
    }).otherwise(function(error) {
        console.log(error);
    });


    // Click event 
    mapView.on("click", event => {
        // console.log(event)
        mapView.hitTest(event)
            // .then(charts.createCharts);
            .then(function(response) {
                var res = response.results[0].graphic;
                // console.log(res);
                charts.createCharts(res);
            })
    });

    // Close popup event
    mapView.popup.watch("visible", function(visible) {
        if (!visible) {
            searchWidget.clear();
            var chartTab = document.getElementById('chartsTab');
            chartTab.innerHTML = "<p>Search or click a feature to view data & chart</p>";
        }
    });

    // Clear search event
    searchWidget.on("search-clear", function(event) {
        mapView.popup.close();
        var chartTab = document.getElementById('chartsTab');
        chartTab.innerHTML = "<p>Search or click a feature to view data & chart</p>";
    });

    // Search widget search-complete event
    searchWidget.on("select-result", function(event) {
        // console.log(event);
        var searchRes = event["result"]["feature"];
        // console.log(searchRes);
        charts.createCharts(searchRes);
    });

    // Click All Data tab event
    var allData = document.getElementById('allDataTab');
    allData.addEventListener("click", function() {
        var expresie = "1 = 1";
        uat.definitionExpression = expresie;
        var numeSelectie = document.getElementsByClassName('btn btn-transparent dropdown-btn js-dropdown-toggle');
        var simbol = '<svg id="searchJudete" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M31.607 27.838l-6.133-6.137a1.336 1.336 0 0 0-1.887 0l-.035.035-2.533-2.533-.014.014c3.652-4.556 3.422-11.195-.803-15.42-4.529-4.527-11.875-4.531-16.404 0-4.531 4.531-4.529 11.875 0 16.406 4.205 4.204 10.811 4.455 15.365.848l.004.003-.033.033 2.541 2.54a1.33 1.33 0 0 0 .025 1.848l6.135 6.133a1.33 1.33 0 0 0 1.887 0l1.885-1.883a1.332 1.332 0 0 0 0-1.887zM17.811 17.809a8.213 8.213 0 0 1-11.619 0 8.217 8.217 0 0 1 0-11.622 8.219 8.219 0 0 1 11.619.004 8.216 8.216 0 0 1 0 11.618z"/></svg>';
        numeSelectie[0].innerHTML = "Select Judet" + simbol;
        var allData = document.getElementById("allData");
        allData.checked = true;
        slider.resetSlider(uat);
    });

    // Selector Radio Button events
    var allData = document.getElementById("allData");
    var positiveData = document.getElementById("positiveData");
    var negativeData = document.getElementById("negativeData");

    allData.onclick = () => {
        selector.selectAllData(uat);
    }

    positiveData.onclick = () => {
        selector.selectPositiveData(mapView, uat);
    }

    negativeData.onclick = () => {
        selector.selectNegativeData(mapView, uat);
    }

    //Click ButtonClear event
    var btnClear = document.getElementById('btnClear');
    btnClear.addEventListener("click", function() {
        var expresie = "1 = 1";
        uat.definitionExpression = expresie;
        var numeSelectie = document.getElementsByClassName('btn btn-transparent dropdown-btn js-dropdown-toggle');
        var simbol = '<svg id="searchJudete" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M31.607 27.838l-6.133-6.137a1.336 1.336 0 0 0-1.887 0l-.035.035-2.533-2.533-.014.014c3.652-4.556 3.422-11.195-.803-15.42-4.529-4.527-11.875-4.531-16.404 0-4.531 4.531-4.529 11.875 0 16.406 4.205 4.204 10.811 4.455 15.365.848l.004.003-.033.033 2.541 2.54a1.33 1.33 0 0 0 .025 1.848l6.135 6.133a1.33 1.33 0 0 0 1.887 0l1.885-1.883a1.332 1.332 0 0 0 0-1.887zM17.811 17.809a8.213 8.213 0 0 1-11.619 0 8.217 8.217 0 0 1 0-11.622 8.219 8.219 0 0 1 11.619.004 8.216 8.216 0 0 1 0 11.618z"/></svg>';
        numeSelectie[0].innerHTML = "Select Judet" + simbol;
        var allData = document.getElementById("allData");
        allData.checked = true;
        slider.resetSlider(uat);
    });

    function insertHeadRows() {
        var sortDown = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M12 17h6v2h-6v-2zm0-2h10v-2H12v2zm0-4h14V9H12v2zm0-6v2h18V5H12zM8 17.5V1H6V27.2l-4-4V26l5 5 5-5v-2.8l-4 4v-9.7z"/></svg>';
        var sortUp = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="svg-icon"><path d="M12 13h6v2h-6v-2zm0 6h10v-2H12v2zm0 4h14v-2H12v2zm0 2v2h18v-2H12zm0-19L7 1 2 6v2.8l4-4V31h2V4.8l4 4V6z"/></svg>';

        var headTabel = document.getElementById('headTabel');
        var hRow = document.createElement("tr");
        var hCell1 = document.createElement("th");
        var hCell2 = document.createElement("th");
        hCell1.innerHTML = "Name" + sortDown + sortUp;
        hCell2.innerHTML = "Evolution" + sortDown + sortUp;
        hRow.appendChild(hCell1);
        hRow.appendChild(hCell2);
        headTabel.appendChild(hRow);

        var hcell = document.getElementsByTagName('th');
        for (i = 0; i < hcell.length; i++) {
            hcell[i].addEventListener("click", () => {
                $(".tablesorter").tablesorter();

            });
        }
    }

    function insertBodyRows(feature) {
        var bodyTabel = document.getElementById('bodyTabel');
        var bRow = document.createElement("tr");
        var bCell1 = document.createElement("td");
        var bCell2 = document.createElement("td");
        bCell1.innerHTML = feature.attributes["Localitate"]
        var pop2007 = feature.attributes["Anul_2007"];
        var pop2017 = feature.attributes["Anul_2017"];
        var ratio = (((pop2007 - pop2017) * 100) / pop2007) * (-1);
        bCell2.innerHTML = ratio.toFixed(2) + " %";
        bRow.appendChild(bCell1);
        bCell1.addEventListener("click", returnUAT);
        bRow.appendChild(bCell2);
        bodyTabel.appendChild(bRow);
    }

    function returnUAT() {
        // console.log(this.innerHTML);
        searchWidget.searchTerm = this.innerHTML;
        searchWidget.search(searchWidget.searchTerm)
            .then(function(response) {
                var srcRes = response[0]["results"][0]["feature"];
                // console.log(srcRes);
                charts.createCharts(srcRes);
            });


        // searchWidget.on("search-blur", function(event) {
        //     console.log("Focus removed from search input textbox.");
        // });
    }
});


//Idei:
//Creare filtru drop down in tab 3