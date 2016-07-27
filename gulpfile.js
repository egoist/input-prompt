'use strict'
const gulp = require('gulp')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const jade = require('gulp-jade')
const serve = require('gulp-serve')
const uglify = require('rollup-plugin-uglify')

gulp.task('serve', serve({
  port: 7010,
  root: './demo',
  host: 'localhost'
}))

gulp.task('js', () => {
  rollup.rollup({
    entry: './src/input-prompt.js',
    plugins: [
      buble()
    ]
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      dest: 'dist/input-prompt.js',
      moduleName: 'InputPrompt'
    })
  })
})

gulp.task('compress', () => {
  rollup.rollup({
    entry: './src/input-prompt.js',
    plugins: [
      buble(),
      uglify()
    ]
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      dest: 'dist/input-prompt.min.js',
      moduleName: 'InputPrompt',
      sourceMap: true
    })
  })
})

gulp.task('copy', () => {
  gulp.src('./dist/input-prompt.js')
    .pipe(gulp.dest('./demo'))
})

gulp.task('jade', () => {
  gulp.src('./src/index.jade')
    .pipe(jade({
      locals: {
        time: Date.now()
      }
    }))
    .pipe(gulp.dest('./demo'))
})

gulp.task('watch', () => {
  gulp.watch('./src/*.js', ['js', 'compress'])
  gulp.watch('./src/*.jade', ['jade'])
  gulp.watch('./dist/*.js', ['copy'])
})

gulp.task('build', ['js', 'jade', 'copy', 'compress'])

gulp.task('default', ['build', 'watch', 'serve'])
