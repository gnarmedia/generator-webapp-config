'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var Configstore = require('configstore');
var pkg = require('../package.json');
var pkgName = "generator-webapp";

// Init a Configstore instance with an unique ID eg. package name
// and optionally some default values
var conf = new Configstore(pkgName, {});

var WebappConfigGenerator = yeoman.generators.Base.extend({

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the WebappConfig generator, use this to create a JSON config file for generator-webapp'));

    var prompts = [{
      type: 'input',
      name: 'assets',
      message: 'Set the assets directory:',
      default: 'assets'
    },{
      type: 'input',
      name: 'styles',
      message: 'Set the styles directory:',
      default: 'styles'
    },{
      type: 'input',
      name: 'scripts',
      message: 'Set the scripts directory:',
      default: 'scripts'
    },{
      type: 'input',
      name: 'images',
      message: 'Set the images directory:',
      default: 'images'
    },{
      type: 'input',
      name: 'vendor',
      message: 'Set the vendor directory:',
      default: 'vendor'
    }];

    this.prompt(prompts, function (props) {

      if (props.assets.length) {
        conf.set('assets', props.assets);
      }

      conf.set('styles', props.styles);
      conf.set('scripts', props.scripts);
      conf.set('images', props.images);
      conf.set('vendor', props.vendor);

      done();
    }.bind(this));
  },

  app: function () {
    console.log("configuration saved to " + conf.path)
  }
});

module.exports = WebappConfigGenerator;
