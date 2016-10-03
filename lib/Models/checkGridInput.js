'use strict';

/*global require*/

var TerriaError = require('../Core/TerriaError');
var defined = require('terriajs-cesium/Source/Core/defined');

var checkGridInput = function(options, state) {

    var terria = options.terria;

    if (!defined(state.xCoord) || state.xCoord == '' || state.xCoord < -90.0 || state.xCoord > 90.0) {
        terria.error.raiseEvent(new TerriaError({
            title: "Invalid latitude",
            message: 'Latitude has to be between -90.0 and +90.0'
        }));
        return false;
    } else if (!defined(state.yCoord) || state.yCoord == '' || state.yCoord < -180.0 || state.yCoord > 180.0) {
        terria.error.raiseEvent(new TerriaError({
            title: "Invalid longitude",
            message: 'Longitude has to be between -180.0 and +180.0'
        }));
        return false;
    } else if (!defined(state.angle) || state.angle == '' || state.angle < -360.0 || state.angle > 360.0) {
        terria.error.raiseEvent(new TerriaError({
            title: "Invalid bearing",
            message: 'Bearing has to be between -360.0 and +360.0'
        }));
        return false;
    }
    return true;
};

module.exports = checkGridInput;
