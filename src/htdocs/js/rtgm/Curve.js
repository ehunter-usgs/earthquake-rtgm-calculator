'use strict';

var Model = require('mvc/Model'),
    Util = require('util/Util');

var DEFAULTS = {
  'xs': [],
  'ys': []
};

var Curve = function (attributes) {
  var _this,
      _initialize;


  _this = Model(Util.extend({}, DEFAULTS, attributes));

  _initialize = function (attributes) {
    var i = null,
        previousY = null,
        previousX = null,
        len = null;

    // Check that array sizes are the same size
    if (!attributes || !attributes.xs || !attributes.ys ||
        (attributes.xs.length !== attributes.ys.length)) {
      throw 'X and Y arrays (of the same size) are required.';
    }

    // Check if x and y arrays are less than 2 values
    if (attributes.xs.length < 2 || attributes.ys.length < 2) {
      throw 'X and Y arrays require at least 2 values.';
    }

    // Check X and Y values for numerical values
    for (i = 0, len = attributes.ys.length; i < len; i++){
      if (isNaN(attributes.xs[i]) || isNaN(attributes.ys[i])) {
        throw 'X and Y values must be numerical.';
      }

      // Check that Y values are in descending order
      if (previousY !== null && attributes.ys[i] >= previousY) {
        throw 'Y values must be in descending order.';
      }

      previousY = attributes.ys[i];

      // Check that X values are in ascending order
      if (previousX !== null && attributes.xs[i] <= previousX){
        throw 'X values must be in ascending order.';
      }

      previousX = attributes.xs[i];
    }
  };


  _initialize(attributes);
  attributes = null;
  return _this;
};


module.exports = Curve;
