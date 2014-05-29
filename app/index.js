'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var WebappConfigGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

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
      default: 'css'
    },{
      type: 'input',
      name: 'scripts',
      message: 'Set the scripts directory:',
      default: 'js'
    },{
      type: 'input',
      name: 'images',
      message: 'Set the images directory:',
      default: 'img'
    },{
      type: 'input',
      name: 'vendor',
      message: 'Set the vendor directory:',
      default: 'vendor'
    },{
      type: 'input',
      name: 'config',
      message: 'Save the config json to:',
      default: 'webapp-config.json'
    }];

    this.prompt(prompts, function (props) {
      var config = {};
      if (props.assets.length) {
        config.assets  = props.assets;
      }
      config.styles  = props.styles;
      config.scripts = props.scripts;
      config.images  = props.images;
      config.vendor  = props.vendor;

      this.configFile  = props.config;

      console.log(config);

      this.config = config;

      done();
    }.bind(this));
  },

  app: function () {
    this.write(this.configFile, JSON.stringify(this.config));
  }
});

module.exports = WebappConfigGenerator;
