define([
    "dojo/_base/declare",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol"
], function(
    declare,
    SimpleRenderer,
    SimpleMarkerSymbol
) {
    var clazz = {
        simbolizare: function() {

            var popChanges = document.getElementById('populationChanges').text;

            var citiesRenderer = new SimpleRenderer({
                symbol: new SimpleMarkerSymbol({
                    size: 6,
                    color: "palegreen",
                    outline: {
                        width: 0.5,
                        color: "seagreen"
                    }
                }),
                visualVariables: [{
                    type: "opacity",
                    valueExpression: popChanges,
                    valueExpressionTitle: "Type of population change: gain(opaque) vs. loss(transparent)",
                    stops: [{
                        value: -0.01,
                        opacity: 0.05,
                        label: "Population Gain"
                    }, {
                        value: 0.01,
                        opacity: 1.0,
                        label: "Population Loss"
                    }]
                }, {
                    type: "size",
                    valueExpression: popChanges,
                    valueExpressionTitle: "Dimension (in percentage %) of population changes.(Values can be either positive or negative)",
                    stops: [{
                            value: -20,
                            size: 18,
                            label: "over 20 (%) (negative values)"
                        }, {
                            value: -5,
                            size: 12,
                            label: "5 - 20 (%) (negative values)",
                        }, {
                            value: -2.5,
                            size: 8,
                            label: "2.5 - 5 (%) (negative values)",
                        }, {
                            value: -0.5,
                            size: 4,
                            label: "0 - 2.5 (%) (negative values)",
                        }, {
                            value: 0.5,
                            size: 4,
                            label: "0 - 2.5 (%) (positive values)",
                        },
                        {
                            value: 2.5,
                            size: 8,
                            label: "2.5 - 5 (%) (positive values)",
                        },
                        {
                            value: 5,
                            size: 12,
                            label: "5 - 20 (%) (positive values)",
                        },
                        {
                            value: 20,
                            size: 18,
                            label: "over 20 (%) (positive values)",
                        }
                    ]
                }]

            });
            return citiesRenderer;
        }
    };
    return clazz;
});

//Adaugare visualVariable de tip culoare
// {
//     type: "color",
//     valueExpression: popChanges,
//     stops: [{
//         value: -0.01,
//         color: "#f71602"
//     }, {
//         valie: 0.01,
//         color: "palegreen"
//     }]
// }