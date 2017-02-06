"use strict";

const gulp = require('gulp');

let watcher = {};
watcher.list = {};

watcher.create = function () {
  var args = [].slice.call(arguments),
    name = args[0],
    watch = null,
    _watcher = null;

  args.shift();
  watch = gulp.watch.apply(gulp, args);
  this.list[name] = _watcher = {watch: watch, args: args, name: name};

  return this.createObserver(_watcher);
};

watcher.getObserver = function(name) {
  if (!this.list[name]) {
    return;
  }
  
  return this.list[name].observer;
};

watcher.pause = function (name) {
  if (!this.list[name]) {
    return;
  }

  this.list[name].observer.pause();
};

watcher.stop = function (name) {
  if (!this.list[name]) {
    return;
  }

  this.list[name].observer.stop();
};

watcher.start = function (name) {
  if (!this.list[name]) {
    return;
  }

  this.list[name].observer.start();
};

watcher.createObserver = function (_watcher) {
  var watch = _watcher.watch;

  let stop = () => {
    pause();

    delete this.list[_watcher.name];
  };

  let pause = () => {
    watch.end();
    watch = null;
  };

  let start = () => {
    _watcher.watch = gulp.watch.apply(gulp, _watcher.args);
    _watcher.gulpWatcher = _watcher.watch;

    return watcher.createObserver(_watcher);
  };

  return _watcher.observer = {
    stop: stop,
    start: start,
    pause: pause,
    gulpWatcher: _watcher.watch
  }
};

module.exports = watcher;