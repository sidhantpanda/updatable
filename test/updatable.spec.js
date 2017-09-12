var Updatable = require('../src');
var assert = require('assert');

describe('Updatable', function () {
    describe('#addListener()', function () {
        it('should add a value update listener', function (done) {
            var updatableInstance = new Updatable();
            const fn = function() {};
            updatableInstance.addListener(fn);
            assert.equal(fn, updatableInstance.listeners[0]);
            done();
        });
    });
    describe('#update()', function () {
        it('updates value for the instance', function (done) {
            var updatableInstance = new Updatable();
            var newValue = 'foo';
            updatableInstance.update(newValue);
            assert.equal(newValue, updatableInstance.getValue());
            done();
        });
    });
    describe('#setListener()', function () {
        it('removes previous listeners and sets new one', function (done) {
            var updatableInstance = new Updatable('foo', function(value) {
                // console.log('foo');
            });
            var newValue = 'bar';
            var newFn = function(value) {
                // console.log('bar');
            }
            updatableInstance.setListener(newFn);
            updatableInstance.update(newValue);
            assert.equal(newFn, updatableInstance.listeners[0]);
            done();
        });
    });
});