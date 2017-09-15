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
        it('gives new value if it is updated', function (done) {
            var initialValue = 'foo';
            var updatableInstance = new Updatable(initialValue);
            var newValue = 'bar';
            updatableInstance.update(newValue);
            assert.equal(newValue, updatableInstance.getValue(), 'Does not give new value after update');
            assert.notEqual(initialValue, updatableInstance.getValue(), 'Giving old value after update');
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
        it('does not add null as a listener', function (done) {
            var updatableInstance = new Updatable();
            updatableInstance.addListener(null);
            assert.equal(0, updatableInstance.listeners.length, 'A null listener was added');
            done();
        });
        it('does not add undefined as a listener', function (done) {
            var updatableInstance = new Updatable();
            updatableInstance.addListener(undefined);
            assert.equal(0, updatableInstance.listeners.length, 'A null listener was added');
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
        it('removes all listeners if null is passed as argument', function (done) {
            var updatableInstance = new Updatable('foo', function () {});
            updatableInstance.setListener(null);
            assert.equal(0, updatableInstance.listeners.length, 'Old listener was not removed');
            done();
        });
        it('does not remove any listeners if undefined is passed as argument', function (done) {
            var updatableInstance = new Updatable('foo', function () {});
            updatableInstance.setListener(undefined);
            assert.equal(1, updatableInstance.listeners.length, 'Old listener was removed');
            done();
        });
    });
});