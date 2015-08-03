/* global chai, describe, it */
'use strict';

var Curve = require('rtgm/Curve');


var expect = chai.expect;

var BADDATA = {
  'xs': [0.0025, 0.00375, 0.00563],
  'ys': [0.4782, 0.3901, 0.3055, 0.99]
};
var GOODDATA = {
  'xs': [0.0025, 0.00375, 0.00563],
  'ys': [0.4782, 0.3901, 0.3055]
};



describe('Unit tests for the "Curve" class', function () {


  describe('constructor()', function () {

    it('Good Curve (valid array arguments)', function () {
      var curve = Curve(GOODDATA);
      expect(curve.get('xs')).to.deep.equal(GOODDATA.xs);
      expect(curve.get('ys')).to.deep.equal(GOODDATA.ys);
    });

    it('Curve should reject array size mismatch', function () {
      var constr = function() {
        return Curve(BADDATA);
      };
      expect(constr).to.throw
          ('X and Y arrays (of the same size) are required');
    });

    it('Curve constructor should reject no array arguments',
        function () {
      var constr2 = function() {
        return Curve();
      };
      expect(constr2).to.throw(
          'X and Y arrays (of the same size) are required');
    });
  });
});
