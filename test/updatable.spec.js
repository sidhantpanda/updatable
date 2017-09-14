var Updatable = require('../src');
var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;


describe('Updatable', function () {
    describe('#constructor()', function () {
        it('initializes the instance with correct value and listener', function (done) {
            var initialValue = 'foo';
            var initialListener = function (value) {};
            var someOtherListener = function (value) {};
            var updatableInstance = new Updatable(initialValue, initialListener);
            assert.equal(initialValue, updatableInstance.getValue());
            assert.equal(initialListener, updatableInstance.listeners[0]);
            assert.notEqual(someOtherListener, updatableInstance.listeners[0]);
            done();
        });
    });
    describe('#getValue()', function () {
        it('gives the correct value', function (done) {
            var initialValue = 'foo';
            var updatableInstance = new Updatable(initialValue);
            assert.equal(initialValue, updatableInstance.getValue());
            done();
        });
    });
    describe('#addListener()', function () {
        it('should add a value update listener', function (done) {
            var updatableInstance = new Updatable();
            const fn = function () {};
            updatableInstance.addListener(fn);
            assert.equal(fn, updatableInstance.listeners[updatableInstance.listeners.length - 1]);
            done();
        });
    });
    describe('#update()', function () {
        it('updates value for the instance', function (done) {
            var updatableInstance = new Updatable('foo');
            var newValue = 'bar';
            updatableInstance.update(newValue);
            assert.equal(newValue, updatableInstance.getValue());
            done();
        });
        it('calls the listeners once updated', function (done) {
            var initialValue = 'foo';
            var initialListener = sinon.spy();
            var updatableInstance = new Updatable(initialValue, initialListener);
            updatableInstance.update('bar');
            assert.equal(true, initialListener.calledWith('bar'), 'Listener function was not called with the updated value');
            assert.notEqual(true, initialListener.calledWith('foo'), 'Listener function was called with old value');
            done();
        });
    });
    describe('#setListener()', function () {
        it('removes previous listeners and sets new one', function (done) {
            var initialListener = sinon.spy();
            var updatableInstance = new Updatable('foo', initialListener);
            var newValue = 'bar';
            var newFn = sinon.spy();
            updatableInstance.setListener(newFn);
            assert.equal(newFn, updatableInstance.listeners[0]);
            done();
        });
        it('previous listeners are not called', function (done) {
            var initialListener = sinon.spy();
            var updatableInstance = new Updatable('foo', initialListener);
            var newValue = 'bar';
            var newFn = sinon.spy();
            updatableInstance.setListener(newFn);
            assert.notEqual(true, initialListener.calledWith('bar'), 'Initial listener was not removed and was called with the new value');
            done();
        });
        it('new listener is called on update', function (done) {
            var initialListener = sinon.spy();
            var updatableInstance = new Updatable('foo', initialListener);
            var newValue = 'bar';
            var newFn = sinon.spy();
            updatableInstance.setListener(newFn);
            updatableInstance.update(newValue)
            assert.equal(true, newFn.calledWith(newValue), 'New listener was not called with newer value');
            done();
        });
    });
});