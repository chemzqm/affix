// npm i gulp-serve gulp-livereload webpack gulp-util gulp connect-livereload -D
var serve = require('gulp-serve')
var livereload = require('gulp-livereload')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var gutil = require('gulp-util')
var gulp = require('gulp')
var inject = require('connect-livereload')()
var path = require('path')
var webpackConfig = {
  entry: ['./example/index.js'],
  output: {
    file: 'bundle.js',
    path: path.resolve(__dirname, 'example')
  },
  module: {
    loaders: [
      // { test: /\.html$/, loader: 'html-loader' }
    ]
  }
}
var myConfig = Object.create(webpackConfig)
// for debugging
myConfig.devtool = 'sourcemap'
myConfig.debug = true

var paths = {
  // file list for watching
  asserts: ['*.css', 'example/*.html']
}

var publicPath = '/example'

gulp.task('default', ['build-dev', 'webpack:dev-server'])

gulp.task('build-dev', ['serve'], function () {
  livereload.listen({
    start: true
  })
  var watcher = gulp.watch(paths.asserts)
  watcher.on('change', function (e) {
    livereload.changed(e.path)
  })
})

// static server
gulp.task('serve', serve({
  root: [__dirname],
  // inject livereload script ot html
  middleware: inject
}))

gulp.task('webpack:dev-server', function () {
  var devServerConfig = Object.create(myConfig)
  // webpack need this to send request to webpack-dev-server
  devServerConfig.output.publicPath = publicPath
  devServerConfig.plugins = devServerConfig.plugins || []
  devServerConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // inline mode
  devServerConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server')
  var compiler = webpack(devServerConfig)
  new WebpackDevServer(compiler, {
    // contentBase: {target: 'http://localhost:3000/'},
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,
    proxy: {
      '*': 'http://localhost:3000'
    },
    publicPath: publicPath,
    lazy: false,
    hot: true
  }).listen(8080, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
  })
})
