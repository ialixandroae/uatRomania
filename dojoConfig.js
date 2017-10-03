var locationPath = window.location.pathname.replace(/\/[^\/]+$/, '/');

window.dojoConfig = {
    deps: ['app/main'],
    packages: [{
            name: 'app',
            location: locationPath + '/app',
            main: 'main'
        }]
        // ,
        // has: {
        //     "esri-featurelayer-webgl": 1
        // }
};