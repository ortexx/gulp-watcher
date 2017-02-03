"use strict";

const assert = require('chai').assert;
const fs = require('fs-extra');
const path = require('path');
const watcher = require('../gulp-watcher');
const gulp = require('gulp');

describe('GulpWatcher:', function () {
  let filePath = path.join(__dirname, 'tmp', 'test.txt');
  let gazeOptions = { debounceDelay: 50 };

  before(function() {
    fs.ensureDirSync(path.join(__dirname, 'tmp'));
    fs.ensureFileSync(filePath);
  });

  after(function() {
    fs.removeSync(path.join(__dirname, 'tmp'));
  });

  it('#create()', function (done) {
    gulp.task('create', () => {
      watcher.stop('create');
      done();
    });

    let observer = watcher.create('create', filePath, gazeOptions, ['create']);

    observer.gulpWatcher.on('ready', () => {
      fs.writeFileSync(filePath, 'create');
    });
  });

  describe('Observer', function () {
    it('#pause(), #start(), #stop()', function (done) {
      let counter = 0;
      let delay = gazeOptions.debounceDelay * 2;

      let observer = watcher.create('pause', filePath, gazeOptions, () => {
        if(counter == 1) {
          return done(new Error('pause function not working'))
        }
        else if(counter == 2) {
          observer.stop();

          return done();
        }

        watcher.pause('pause');

        setTimeout(() => {
          fs.writeFileSync(filePath, 'pause 1');

          setTimeout(() => {
            counter++;
            watcher.start('pause');
            observer = watcher.getObserver('pause');

            observer.gulpWatcher.on('ready', () => {
              fs.writeFileSync(filePath, 'pause 2');
            });
          }, delay);
        }, delay);

        counter++;
      });

      observer.gulpWatcher.on('ready', () => {
        fs.writeFileSync(filePath, 'create');
      });
    });
  })
});

