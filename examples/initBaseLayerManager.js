/*
 * initBaseLayers manager
 */
var initBaseLayersManager = function (attr) {
    var map = this,
        activeIDs = attr.activeIDs || ['rumap', 'hybrid', 'satellite'],
        currentID = attr.currentID,
        apiKey = attr.apiKey,
        hostName = attr.hostName,
        mapID = attr.mapID,
        lang = L.gmxLocale.getLanguage(),
        blm = map.gmxBaseLayersManager,
        layersControl = map.gmxLayersControl,        
        _gtxt = function (key) {
            return L.gmxLocale.getText(key) || key;
        };

    var copyrights = {
        collinsbartholomew: "&copy; <a href='http://www.collinsbartholomew.com/'>Collins Bartholomew Ltd.</a>"
        ,geocenter: "&copy; <a href='http://www.geocenter-consulting.ru/'>" + _gtxt('ЗАО «Геоцентр-Консалтинг»', 'Geocentre-Consulting') + "</a>"
        ,openStreetMap: "&copy; " + _gtxt('участники OpenStreetMap', 'OpenStreetMap contributers')
        ,cgiar: "&copy; <a href='http://srtm.csi.cgiar.org/'>CGIAR-CSI</a>"
        ,'2gis': "&copy; <a href='http://help.2gis.ru/api-rules/#kart'>" + _gtxt('ООО «ДубльГИС»','2GIS') + "</a>"
        ,naturalearthdata: "&copy; <a href='http://www.naturalearthdata.com/'>Natural Earth</a>"
        ,nasa: "&copy; <a href='http://www.nasa.gov'>NASA</a>"
        ,earthstar: "&copy; <a href='http://www.es-geo.com'>Earthstar Geographics</a>"
        ,antrix: "&copy; <a href='http://www.antrix.gov.in/'>ANTRIX</a>"
        ,geoeye: "&copy; <a href='http://www.geoeye.com'>GeoEye Inc.</a>"
    };
    var getCopyright2 = function(layer) {
        return [
            {minZoom: 1, maxZoom: 7, attribution: copyrights.collinsbartholomew + ', ' + _gtxt('2014', '2012')}
            ,{minZoom: 1, maxZoom: 7, attribution: copyrights.naturalearthdata + ', 2013'}
            ,{minZoom: 8, maxZoom: 17, attribution: copyrights.openStreetMap}
        ];
    }
    
    var getURL = function(type) {
        return 'http://{s}.tile.cart.kosmosnimki.ru/' + type + '/{z}/{x}/{y}.png';
    }
    var iconPrefix = 'http://maps.kosmosnimki.ru/api/img/baseLayers/';

    var baseLayers = {
        OSM: {
            icon: iconPrefix + 'basemap_osm_' + (lang === 'rus' ? 'ru' : '-eng') + '.png',
            layers:[
                L.tileLayer('http://{s}.tile.osm.kosmosnimki.ru/kosmo' + (lang === 'rus' ? '' : '-en') + '/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        },

        '2GIS': {
            layers:[
                L.tileLayer('http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=4', {
                    maxZoom: 18,
                    attribution: copyrights['2gis']
                })
            ]
        },

        relief: { rus: 'Рельеф', eng: 'Relief',
            icon: iconPrefix + 'basemap_terrain.png',
            layers:[
                L.tileLayer.Mercator(getURL('r'), {
                    maxZoom: 18,
                    maxNativeZoom: 13,
                    gmxCopyright: [
                        { minZoom: 1, maxZoom: 17, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                        ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                        ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.cgiar + ", 2008" }
                    ]
                })
            ]
        }
        ,outline: { rus: 'Контурная', eng: 'Outline',
            icon: iconPrefix + 'basemap_contour.png',
            layers:[
                L.tileLayer.Mercator(getURL('mo'), {
                    maxZoom: 18,
                    maxNativeZoom: 13,
                    gmxCopyright: [
                        { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                        ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                    ]
                })
            ]
        }
        ,grey: { rus: 'Серая', eng: 'Grey',
            icon: iconPrefix + 'basemap_grey.png',
            layers:[
                L.tileLayer.Mercator(getURL('mg'), {
                    maxZoom: 18,
                    maxNativeZoom: 13,
                    gmxCopyright: [
                        { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                        ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                    ]
                })
            ]
        }
        ,osm_spring: { rus: 'OSM Весна', eng: 'OSM Spring',
            icon: iconPrefix + 'basemap_osm_spring.png',
            layers:[
                L.tileLayer(getURL('spring'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        }
        ,osm_summer: { rus: 'OSM Лето', eng: 'OSM Summer',
            icon: iconPrefix + 'basemap_osm_summer.png',
            layers:[
                L.tileLayer(getURL('summer'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        }
        ,osm_autumn: { rus: 'OSM Осень', eng: 'OSM Autumn',
            icon: iconPrefix + 'basemap_osm_autumn.png',
            layers:[
                L.tileLayer(getURL('autumn'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        }
        ,osm_winter: { rus: 'OSM Зима', eng: 'OSM Winter',
            icon: iconPrefix + 'basemap_osm_winter.png',
            layers:[
                L.tileLayer(getURL('winter'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        }
        ,osm_night: { rus: 'OSM Ночь', eng: 'OSM Night',
            icon: iconPrefix + 'basemap_night.png',
            layers:[
                L.tileLayer(getURL('night'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        }
    };
        
    if (apiKey !== "5OKPGTL9T9") {
        baseLayers.OSMHybrid = { rus: 'OSM Гибрид', eng: 'OSM Hybrid',
            layers:[
                L.tileLayer(getURL('kosmohyb'), {
                    maxZoom: 18,
                    gmxCopyright: getCopyright2()
                })
            ]
        };
    }

    var layersGMX = [
        {mapID: mapID, layerID: 'C9458F2DCB754CEEACC54216C7D1EB0A', type: 'satellite', rus: 'Снимки', eng: 'Satellite', icon: iconPrefix + 'basemap_satellite.png' }  // satellite
    ];
    if (lang === 'rus') {
        baseLayers.rumap = { rus: 'Карта', eng: 'Map',
            icon: iconPrefix + 'basemap_rumap.png',
            layers:[
                L.tileLayer.Mercator(getURL('m'), {
                    maxZoom: 19,
                    maxNativeZoom: 17,
                    gmxCopyright: [
                        { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                        ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014", bounds: [[40, 29], [80, 180]] }
                    ]
                })
            ]
        };
    } else {
        layersGMX.push({mapID: mapID, layerID: '5269E524341E4E7DB9D447C968B20A2C', type: 'rumap', rus: 'Карта', eng: 'Map', icon: iconPrefix + 'basemap_rumap.png'});     // rumap
        layersGMX.push({mapID: mapID, layerID: 'BCCCE2BDC9BF417DACF27BB4D481FAD9', type: 'hybrid', rus: 'Гибрид', eng: 'Hybrid'});    // hybrid
    }
    L.gmx.loadLayers(layersGMX).then(function() {
        //console.log(arguments);
        blm.setActiveIDs(activeIDs);
        var layerByLayerID = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var layer = arguments[i],
                gmx = layer._gmx,
                mapName = layer._gmx.mapName,
                layerID = layer._gmx.layerID;
            if (!(mapName in layerByLayerID)) layerByLayerID[mapName] = {};
            layerByLayerID[mapName][layerID] = layer;
        }
        for (var i = 0, len = layersGMX.length; i < len; i++) {
            var info = layersGMX[i],
                type = info.type;
            if (type === 'hybrid') continue;
            if (type === 'satellite') {
                baseLayers['hybrid'] = {
                    rus: 'Гибрид',
                    eng: 'Hybrid',
                    icon: iconPrefix + 'basemap_hybrid.png',
                    layers: [
                        layerByLayerID[info.mapID][info.layerID]        // satellite
                        ,
                        (lang === 'rus' ?
                            L.tileLayer.Mercator(getURL('o'), {         // rus Overlay
                                maxZoom: 19,
                                maxNativeZoom: 17,
                                attribution: 'Scanex'
                            })
                            :
                            layerByLayerID[info.mapID]['BCCCE2BDC9BF417DACF27BB4D481FAD9']    // eng Overlay
                        )
                    ]
                };
            }
            baseLayers[type] = {
                rus: info.rus,
                eng: info.eng,
                icon: info.icon,
                layers:[layerByLayerID[info.mapID][info.layerID]]
            };
        }
        for(var i=0, len = activeIDs.length; i<len; i++) {
            var id = activeIDs[i];
            if(baseLayers[id]) {
                var baseLayer = baseLayers[id];
                if (!baseLayer.rus) baseLayer.rus = id;
                if (!baseLayer.eng) baseLayer.eng = id;
                var bLayer = blm.add(id, baseLayer);
                if (layersControl) layersControl.addBaseLayer(bLayer, bLayer.options[lang]);
            }
        }
        blm.setCurrentID(currentID || activeIDs[0]);
    });

};

L.Map.addInitHook(function () {
    if (this._initBaseLayersManager) return;
	this._initBaseLayersManager = initBaseLayersManager;
});
