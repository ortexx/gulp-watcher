# gulp-watcher
Watcher for gulp with pause function. Base on gulp.watch

Sometimes you need to change files in same directory. 

This will lead to infinite loops of watcher. You can use pause function here.
# Install 
`npm install gulp-watcher`
# Example
```js
var gulp = require('gulp');
var requirejs = require('gulp-requirejs');
var watcher = require('gulp-watcher');

gulp.task('requirejs', function () {
  watcher.pause('requirejs');
  
  // for example complie files with requirejs in same directory ('public/js/')
  gulp.src(['public/js/**/*.js'])
  .pipe(requirejs({...options}))
  .pipe(gulp.dest("public/js"))
  .on('end', function () {
    watcher.start('requirejs');
  })    
})

gulp.task('watch', function () {
    watcher.create('requirejs', ['public/js/**/*.js']);
})
```
