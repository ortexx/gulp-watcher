# gulp-watcher
Watcher for gulp with a pause function. Based on gulp.watch

Sometimes you need to watch and change files in the same directory. 

You can use pause function here.

# Install 
`npm install gulp-watcher`

# Example
```js
const gulp = require('gulp');
const requirejs = require('gulp-requirejs');
const watcher = require('gulp-watcher');

gulp.task('requirejs', function () {
  watcher.pause('requirejs');
  
  // FOR EXAMPLE, you would like to compile files with requirejs in the same directory ('public/js/')
  gulp.src(['public/js/**/*.js'])
  .pipe(requirejs({...options}))
  .pipe(gulp.dest("public/js"))
  .on('end', function () {
    watcher.start('requirejs');
  })    
})

gulp.task('watch', function () {
    watcher.create('requirejs', ['public/js/**/*.js'], ['requirejs']);
})
```

# Api 
### .create(name, ...gulp.watch args)  
Create a watcher

### .pause(name)  
Set a pause

### .stop(name)  
Stop a watcher and clear them