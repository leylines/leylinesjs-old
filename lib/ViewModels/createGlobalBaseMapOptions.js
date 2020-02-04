"use strict";

/*global require*/
var BaseMapViewModel = require('./BaseMapViewModel');
var WebMapServiceCatalogItem = require('../Models/WebMapServiceCatalogItem');
var OpenStreetMapCatalogItem = require('../Models/OpenStreetMapCatalogItem');
var ArcGisMapServerCatalogItem = require('../Models/ArcGisMapServerCatalogItem');
var MapboxMapCatalogItem = require('../Models/MapboxMapCatalogItem');
var IonImageryCatalogItem = require('../Models/IonImageryCatalogItem');

var BingMapsCatalogItem = require('../Models/BingMapsCatalogItem');
var BingMapsStyle = require('terriajs-cesium/Source/Scene/BingMapsStyle');

var createGlobalBaseMapOptions = function(terria, bingMapsKey, mapboxApiKey) {

    var result = [];

    var bingMapsAerialWithLabelsOnDemand = new BingMapsCatalogItem(terria);
    bingMapsAerialWithLabelsOnDemand.name = 'Bing Maps Aerial with Labels';
    bingMapsAerialWithLabelsOnDemand.mapStyle = BingMapsStyle.AERIAL_WITH_LABELS_ON_DEMAND;
    bingMapsAerialWithLabelsOnDemand.opacity = 1.0;
    bingMapsAerialWithLabelsOnDemand.key = bingMapsKey;
    bingMapsAerialWithLabelsOnDemand.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingAerialLabels.png'),
        catalogItem: bingMapsAerialWithLabelsOnDemand
    }));

    var bingMapsAerial = new BingMapsCatalogItem(terria);
    bingMapsAerial.name = 'Bing Maps Aerial';
    bingMapsAerial.mapStyle = BingMapsStyle.AERIAL;
    bingMapsAerial.opacity = 1.0;
    bingMapsAerial.key = bingMapsKey;
    bingMapsAerial.isRequiredForRendering = true;
    bingMapsAerial.requestWaterMask = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingAerial.png'),
        catalogItem: bingMapsAerial
    }));

    var bingMapsRoadsOnDemand = new BingMapsCatalogItem(terria);
    bingMapsRoadsOnDemand.name = 'Bing Maps Roads';
    bingMapsRoadsOnDemand.mapStyle = BingMapsStyle.ROAD_ON_DEMAND;
    bingMapsRoadsOnDemand.opacity = 1.0;
    bingMapsRoadsOnDemand.key = bingMapsKey;
    bingMapsRoadsOnDemand.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/bingRoads.png'),
        catalogItem: bingMapsRoadsOnDemand
    }));

    var esriWorldImagery = new ArcGisMapServerCatalogItem(terria);
    esriWorldImagery.name = 'ESRI World Imagery';
    esriWorldImagery.url = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';
    esriWorldImagery.opacity = 1.0;
    esriWorldImagery.isRequiredForRendering = true;
    esriWorldImagery.allowFeaturePicking = false;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriWorldImagery.png'),
        catalogItem: esriWorldImagery
    }));

    var esriWorldTopoMap = new ArcGisMapServerCatalogItem(terria);
    esriWorldTopoMap.name = 'ESRI World Topo Map';
    esriWorldTopoMap.url = 'https://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer';
    esriWorldTopoMap.opacity = 1.0;
    esriWorldTopoMap.isRequiredForRendering = true;
    esriWorldTopoMap.allowFeaturePicking = false;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriWorldTopoMap.png'),
        catalogItem: esriWorldTopoMap
    }));

    var esriNationalGeographic = new ArcGisMapServerCatalogItem(terria);
    esriNationalGeographic.name = 'National Geographic Map';
    esriNationalGeographic.url = 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer';
    esriNationalGeographic.opacity = 1.0;
    esriNationalGeographic.isRequiredForRendering = true;
    esriNationalGeographic.allowFeaturePicking = false;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/esriNationalGeographic.png'),
        catalogItem: esriNationalGeographic
    }));

    var openStreetMap = new WebMapServiceCatalogItem(terria);
    openStreetMap.name = 'Open Street Map ';
    openStreetMap.url = 'https://tiles.maps.eox.at/wms';
    openStreetMap.layers = 'osm_3857';
    openStreetMap.parameters = {
        tiled: true
    };
    openStreetMap.opacity = 1.0;
    openStreetMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/openStreetMap.png'),
        catalogItem: openStreetMap
    }));

    var stamenToner = new OpenStreetMapCatalogItem(terria);
    stamenToner.name = 'Stamen Toner';
    stamenToner.url = 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/';
    stamenToner.opacity = 1.0;
    stamenToner.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/stamenToner.png'),
        catalogItem: stamenToner
    }));

    var stamenTerrain = new OpenStreetMapCatalogItem(terria);
    stamenTerrain.name = 'Stamen Terrain';
    stamenTerrain.url = 'https://stamen-tiles.a.ssl.fastly.net/terrain/';
    stamenTerrain.opacity = 1.0;
    stamenTerrain.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/stamenTerrain.png'),
        catalogItem: stamenTerrain
    }));

    var eoxTerrain = new WebMapServiceCatalogItem(terria);
    eoxTerrain.name = 'EOX Terrain';
    eoxTerrain.url = 'https://tiles.maps.eox.at/wms';
    eoxTerrain.layers = 'terrain_3857';
    eoxTerrain.parameters = {
        tiled: true
    };
    eoxTerrain.opacity = 1.0;
    eoxTerrain.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/eoxTerrain.png'),
        catalogItem: eoxTerrain
    }));

    var gebco = new WebMapServiceCatalogItem(terria);
    gebco.name = 'GEBCO Latest';
    gebco.url = 'https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv';
    gebco.layers = 'GEBCO_LATEST';
    gebco.parameters = {
        tiled: true
    };
    gebco.opacity = 1.0;
    gebco.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/gebco.png'),
        catalogItem: gebco
    }));

    var blackMarble = new IonImageryCatalogItem(terria);
    blackMarble.name = 'NASA Black Marble';
    blackMarble.ionAssetId = '3812';
    blackMarble.opacity = 1.0;
    blackMarble.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/blackMarble.png'),
        catalogItem: blackMarble
    }));

    var mapboxMap = new MapboxMapCatalogItem(terria);
    mapboxMap.name = 'Mapbox Satellite';
    mapboxMap.mapId = 'mapbox.satellite';
    mapboxMap.credit = 'Mapbox';
    mapboxMap.accessToken = mapboxApiKey;
    mapboxMap.opacity = 1.0;
    mapboxMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/mapBox.png'),
        catalogItem: mapboxMap
    }));

    var outdoorsMap = new MapboxMapCatalogItem(terria);
    outdoorsMap.name = 'Mapbox Outdoors';
    outdoorsMap.mapId = 'mapbox.outdoors';
    outdoorsMap.credit = 'Mapbox';
    outdoorsMap.accessToken = mapboxApiKey;
    outdoorsMap.opacity = 1.0;
    outdoorsMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/mapBoxOutdoors.png'),
        catalogItem: outdoorsMap
    }));

    var piratesMap = new MapboxMapCatalogItem(terria);
    piratesMap.name = 'Mapbox Pirates';
    piratesMap.mapId = 'mapbox.pirates';
    piratesMap.credit = 'Mapbox';
    piratesMap.accessToken = mapboxApiKey;
    piratesMap.opacity = 1.0;
    piratesMap.isRequiredForRendering = true;

    result.push(new BaseMapViewModel({
        image: require('../../wwwroot/images/mapBoxPirates.png'),
        catalogItem: piratesMap
    }));

    return result;
};

module.exports = createGlobalBaseMapOptions;
