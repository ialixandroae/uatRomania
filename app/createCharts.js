define([
    "dojo/_base/declare",
    "esri/PopupTemplate"
], function(
    declare,
    PopupTemplate
) {
    var clazz = {
        createCharts: function(results) {
            // console.log(results);
            var attributes = results.attributes;

            var localitate = attributes["Localitate"];
            var judet = attributes["Judet"];
            var siruta = attributes["SIRUTA"];
            var pop2007 = attributes["Anul_2007"];
            var pop2012 = attributes["Anul_2012"]
            var pop2017 = attributes["Anul_2017"];
            // console.log(attributes);
            var diff = pop2017 - pop2007;
            var pctChange = (diff * 100) / pop2007;

            var chartTab = document.getElementById('chartsTab')
            chartTab.innerHTML = "<p><b>Administrative Unit</b> :" + localitate + "<br>"
            chartTab.innerHTML += "<p><b>Judet</b> :" + judet + "<br>";
            chartTab.innerHTML += "<p><b>SIRUTA Code</b> :" + siruta + "<br>";
            chartTab.innerHTML += "<p><b>Population in 2007</b> :" + numberWithCommas(pop2007) + "<br>";
            chartTab.innerHTML += "<p><b>Population in 2012</b> :" + numberWithCommas(pop2012) + "<br>";
            chartTab.innerHTML += "<p><b>Population in 2017</b> :" + numberWithCommas(pop2017) + "<br></p>";

            chartTab.innerHTML += "<div id='container' style='width:100%; height:260px;'></div>"
            $(function() {
                var myChart = Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Population Evolution in 10 years'
                    },
                    subtitle: {
                        text: 'Population changes: ' + pctChange.toFixed(2).toString() + " %"
                    },
                    xAxis: {
                        categories: ['2007', '2012', '2017'],
                    },
                    yAxis: {
                        title: {
                            text: 'Population'
                        }
                    },
                    series: [{
                        name: localitate.toString() + ", " + judet.toString(),
                        // color: '#9ACD32',
                        color: {
                            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                            stops: [
                                [0, '#58b28d'],
                                [1, '#79b743']
                            ]
                        },
                        data: [pop2007, pop2012, pop2017]
                    }]
                });
            });

            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
    return clazz;
})