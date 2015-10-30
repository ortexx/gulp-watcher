var gulp = require('gulp');

var watcher = {};

watcher.list = {};

watcher.create = function () {
    var args = [].slice.call(arguments),
        name = args[0],
        watch = null,
        _watcher = null;
    
    args.shift();
    watch = gulp.watch.apply(gulp, args); 
    this.list[name] = _watcher = { watch: watch, args: args };
    
    return this.createObserver(_watcher); 
}

watcher.pause = function (name) {
    if (!this.list[name]) {
        return;
    }
    
    this.list[name].observer.pause();
}

watcher.stop = function (name) {
    if (!this.list[name]) {
        return;
    }
    
    this.list[name].observer.stop();
}

watcher.start = function (name) {
    if (!this.list[name]) {
        return;
    }
    
    this.list[name].observer.start();
}

watcher.createObserver = function (_watcher) {
    var watch = _watcher.watch;
    
    function stop() {
        pause();
        
        delete this.list[name];
    }
    
    function pause() {
        watch.end();
        watch = null;
    }
    
    function start() {
        _watcher.watch = gulp.watch.apply(gulp, _watcher.args);
        
        return watcher.createObserver(_watcher);
    }
    
    return _watcher.observer = {
        stop: stop,
        start: start,
        pause: pause
    }
}

module.exports = watcher;