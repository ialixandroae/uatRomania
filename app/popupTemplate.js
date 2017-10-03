define([
    "dojo/_base/declare",
    "esri/PopupTemplate"
], function(
    declare,
    PopupTemplate
) {
    var clazz = {
        createPopup: function() {
            var popChanges = document.getElementById('populationChanges').text;

            var popupTemplate = new PopupTemplate({
                title: "Population in {Localitate}, {Judet}",
                content: "As of 2007, the population in this area was <b>{Anul_2007:NumberFormat(places:0)}</b>" +
                    " and as of 2017, the population here was <b>{Anul_2017:NumberFormat(places:0)}</b>. \n" +
                    "Percent change is: {CENS_2017:colorFunction}",
                expressionInfos: [{
                    name: "popChange",
                    expression: popChanges
                }]
            });

            colorFunction = function(value, key, data) {
                var greenArrow = 'https://vignette2.wikia.nocookie.net/yogscast/images/3/36/Up_green_arrow.png/revision/latest/scale-to-width-down/364?cb=20130425012241';
                var redArrow = 'http://www.clker.com/cliparts/e/a/c/a/12065697821256125215pitr_red_arrows_set_5.svg.hi.png';

                var diff = data.Anul_2017 - data.Anul_2007;
                var pctChange = (diff * 100) / data.Anul_2007;
                var result = pctChange > 0 ? greenArrow : redArrow;

                return "<img src='" + result + "'/>" +
                    "<span style='color: " +
                    (pctChange < 0 ? "red" : "green") + ";' height: 20px; width=20px> " +
                    pctChange.toFixed(2) +
                    " %</span>";
            }
            return popupTemplate;
        }
    };
    return clazz;
});

//"Percent change is: <b>{expression/popChange:NumberFormat(places:2)} %</b>",