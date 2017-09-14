[![Build Status](https://travis-ci.org/sidhantpanda/updatable.svg?branch=master)](https://travis-ci.org/sidhantpanda/updatable)

# Updatable
Updatable javascript object with listeners

### Install
`TODO: Update with npm package registry`

### Usage

#### Initialize your Updatable object

```
const updatable = new Updatable();
const updatable = new Updatable('foo');
const updatable = new Updatable('foo', function(newValue) {
  console.log('Updated value:', newValue); // This will print the updated value
});
```


#### Add listeners
```
updatable.addListener(function(newValue) {
  // newValue will have the new value once the object is updated
});
```

#### Update value
```
updatable.update('bar');
```

This will call the listeners

#### Set listener
You can also set a completely new listener, discarding all previous listeners
```
updatable.setListener(function(newValue) { // This will also remove all previous listeners from the updatable object
  // newValue will have the new value once the object is updated
});
```
