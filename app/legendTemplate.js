define([
    "dojo/_base/declare",
    "esri/widgets/Legend"
], function(
    declare,
    Legend
) {
    var clazz = {
        createLegend: function(view, featureLayer, htmlLocation) {
            var legend = new Legend({
                view: view,
                layerInfos: [{
                    layer: featureLayer,
                    title: "Legend"
                }],
                container: htmlLocation
            })
            return legend;
        }
    };
    return clazz;
});