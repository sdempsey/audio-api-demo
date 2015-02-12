var timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt, {deferLogs: true, friendlyTime: true});
  	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: { // stops compiling when you write bad js.
			all: ['scripts/src/*.js']
		},
		concat: { //concatenates .js files into one.
			debug: {
				src: 'scripts/src/*.js',
				dest: 'scripts/site/global.js'
			}
		},
		sass: {
			options: {
				outputStyle: 'nested', 
				sourceMap: true
			},			
			debug: {
				files: {
					'css/src/style.css': 'scss/style.scss'
				}
			}
		},
		autoprefixer: {
			base: {
				options: {
					map:true
				},
				expand:true,
				flatten: true,
				src: 'css/src/style.css',
				dest: '.'
			}
		},
		cmq: { //combines media queries
			debug: {
				'css/src/style.css': ['css/src/style.css']
			}
		},
		clean: {
			css_src: {
				src: ["css/src"]
			}			
		},	
		imagemin: { //optimizes images
			dynamic: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'images/src/',
					src: '**/*.{jpg,png,gif,svg}',
					dest: 'images/'
				}]
			}
		},
		webfont: { //I use this, you don't have to.  It generates icon fonts using fontforge.
			icons: {
				src: 'fonts/src/*.svg',
				dest: 'fonts',
				destCss: 'sass',
				options: {
					engine: 'node',
					font: 'fontcustom',
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: 'fonts/',
					templateOptions: {
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					}
				}
			}
		},		
		watch: { //checks for specified changes, refreshes browser if plugin is installed
			options: { livereload: true},
			scripts: {
				files: 'scripts/src/*.js',
				tasks: ['js']
			},
			css: {
				files: 'scss/*.scss',
				tasks: ['css']
			},
			img: {
				files: 'images/src/**/*.{jpg,gif,png,svg}',
				tasks: ['img']
			},
			php: {
				files: '*.php',
				tasks: []
			}
		}
	});
	
	require("load-grunt-tasks")(grunt);
	grunt.registerTask('js', ['jshint', 'concat']);
	grunt.registerTask('css', ['sass', 'cmq', 'autoprefixer', 'clean']);
	grunt.registerTask('img', ['newer:imagemin']);
	grunt.registerTask('default', ['js', 'css', 'img']);
}