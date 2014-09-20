/*
 * initBaseLayers manager
 */
var initBaseLayersManager = function (attr) {
    var map = this,
        layersControl = attr.layersControl,
        activeIDs = attr.activeIDs || ['rumap', 'hybrid', 'satellite'],
        currentID = attr.currentID,
        apiKey = attr.apiKey,
        hostName = attr.hostName,
        mapID = attr.mapID,
        lang = L.gmxLocale.getLanguage(),
        blm = map.gmxBaseLayersManager,
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
    var typeMercator = 'L.tileLayer.Mercator';
    
    var getURL = function(type) {
        return 'http://{s}.tile.cart.kosmosnimki.ru/' + type + '/{z}/{x}/{y}.png';
    }
    var getInfo = function(type) {
        return {
            type: typeMercator,
            osmURL: getURL(type),
            maxZoom: 18,
            gmxCopyright: getCopyright2()
        }
    }

    var satelliteInfo = {mapID: mapID, layerID: 'C9458F2DCB754CEEACC54216C7D1EB0A'};
    var baseLayers = {
        satellite: { rus: 'Снимки', eng: 'Satellite', layersInfo:[satelliteInfo] }
        ,hybrid: { rus: 'Гибрид', eng: 'Hybrid', layersInfo:[satelliteInfo, {overlay: true, mapID: mapID, layerID: 'BCCCE2BDC9BF417DACF27BB4D481FAD9'}] }
        ,osm: { rus: 'ОСМ', eng: 'OSM',
            layersInfo:[{
                osmURL: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }]
        }
        ,rumap: { rus: 'Карта', eng: 'Map', layersInfo:[{mapID: mapID, layerID: '5269E524341E4E7DB9D447C968B20A2C'}]}
        ,relief: { rus: 'Рельеф', eng: 'Relief',
            layersInfo:[{
                type: typeMercator,
                osmURL: getURL('r'),
                maxZoom: 18,
                gmxCopyright: [
                    { minZoom: 1, maxZoom: 17, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                    ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                    ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.cgiar + ", 2008" }
                ]
            }]
        }
        ,outline: { rus: 'Контурная', eng: 'Outline',
            layersInfo:[{
                type: typeMercator,
                osmURL: getURL('mo'),
                maxZoom: 18,
                gmxCopyright: [
                    { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                    ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                ]
            }]
        }
        ,grey: { rus: 'Серая', eng: 'Grey',
            layersInfo:[{
                type: typeMercator,
                osmURL: getURL('mg'),
                maxZoom: 18,
                gmxCopyright: [
                    { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                    ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014" }
                ]
            }]
        }
        ,'2GIS': {
            layersInfo:[{
                osmURL: 'http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=4',
                maxZoom: 18,
                attribution: copyrights['2gis']
            }]
        }
        ,osm_spring: { rus: 'OSM Весна', eng: 'OSM Spring',
            layersInfo:[getInfo('spring')]
        }
        ,osm_summer: { rus: 'OSM Лето', eng: 'OSM Summer',
            layersInfo:[getInfo('summer')]
        }
        ,osm_autumn: { rus: 'OSM Осень', eng: 'OSM Autumn',
            layersInfo:[getInfo('autumn')]
        }
        ,osm_winter: { rus: 'OSM Зима', eng: 'OSM Winter',
            layersInfo:[getInfo('winter')]
        }
        ,osm_night: { rus: 'OSM Ночь', eng: 'OSM Night',
            layersInfo:[getInfo('night')]
        }
    };
        
    if (apiKey !== "5OKPGTL9T9") {
        baseLayers.OSMHybrid = { rus: 'OSM Гибрид', eng: 'OSM Hybrid',
            layersInfo:[getInfo('kosmohyb')]
        };
    }

    if (lang === 'rus') {
        baseLayers.hybrid.layersInfo[1] = {
            type: typeMercator,
            osmURL: getURL('o'),
            maxZoom: 19,
            maxNativeZoom: 17,
            attribution: 'Scanex'
        };
        baseLayers.rumap.layersInfo[0] = {
            type: typeMercator,
            osmURL: getURL('m'),
            maxZoom: 19,
            maxNativeZoom: 17,
            gmxCopyright: [
                { minZoom: 1, maxZoom: 9, attribution: copyrights.collinsbartholomew + _gtxt(", 2014",", 2012") }
                ,{ minZoom: 1, maxZoom: 17, attribution: copyrights.geocenter + ", 2014", bounds: [[40, 29], [80, 180]] }
            ]
        };
    }
    var layersCreated = {};

    var chkActiveIDs = function(response) {
        for(var i=0, len = activeIDs.length; i<len; i++) {
            var id = activeIDs[i];
            if(baseLayers[id]) {
                var arr = [],
                    baseLayer = baseLayers[id],
                    layersInfo = baseLayer.layersInfo;
                for(var j=0, len1 = layersInfo.length; j<len1; j++) {
                    var info = layersInfo[j],
                        layer = null;
                    if(info.mapID) {
                        if (!layersCreated[info.mapID]) layersCreated[info.mapID] = {};
                        layer = layersCreated[info.mapID][info.layerID];
                        if (!layer) {
                            var layerInfo = gmxMapManager.findLayerInfo(hostName, mapID, info.layerID);
                            layer = layersCreated[info.mapID][info.layerID] = L.gmx.createLayer(layerInfo, info);
                        }
                    } else if(info.type === 'L.tileLayer.Mercator') {
                        layer = L.tileLayer.Mercator(info.osmURL, info);
                    } else {
                        layer = L.tileLayer(info.osmURL, info);
                    }
                    arr.push(layer);
                    if (info.overlay) {
                        //layer.options.overlay = true;
                    }
                    info.index = j;
                }
                var bLayer = blm.add(id, {
                    rus: baseLayer.rus || id,
                    eng: baseLayer.eng || id,
                    layers: arr
                });
                if (layersControl) layersControl.addBaseLayer(bLayer, bLayer.options[lang]);
            }
        }
//console.log('chkActiveIDs', baseLayers);
        blm.setCurrentID(currentID || activeIDs[0]);
    };
    gmxMapManager.getMap(hostName, apiKey, mapID).then(
        chkActiveIDs,
        function(response) {
            console.log("Can't load map " + mapID + ": " + response.error);
        }
    );

    blm.setActiveIDs(activeIDs);

//console.log('initBaseLayersManager', this, map);
};

L.Map.addInitHook(function () {
    if (this._initBaseLayersManager) return;
	this._initBaseLayersManager = initBaseLayersManager;
});
