'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			scripts: {
				files: [
					'index.js',
					'lib/**/*.js',
					'config/**/*.js'
				],
				tasks: ['jshint', 'mochaTest'],
				options: {
					atBegin: true
				}
			},
			tests: {
				files: [
					'tests/**/*.js'
				],
				tasks: ['mochaTest']
			}
		},

		jshint: {
			scripts: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'index.js',
					'lib/**/*.js',
					'config/**/*.js'
				]
			}
		},

		mochaTest: {
			all: {
				src: [
					'tests/**/*.js'
				],
				options: {
					clearRequireCache: true,
					require: function() {
						process.env.PROJECT_ROOT = __dirname;
					}
				}
			}
		},

		nodemon: {
			run: {
				script: 'index.js',
				options: {
					watchedFolders: ['lib'],
					delay: 1000
				}
			}
		},

		concurrent: {
			run: {
				tasks: ['watch', 'nodemon:run'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	// On watch events, if the changed file is a test file then configure mochaTest to only
	// run the tests from that file. Otherwise run all the tests
	var defaultTestSrc = grunt.config('mochaTest.all.src');
	grunt.event.on('watch', function(action, filepath) {
		grunt.config('mochaTest.all.src', defaultTestSrc);
		if (filepath.match('tests/')) {
			grunt.config('mochaTest.all.src', filepath);
		}
	});

	grunt.registerTask('default', ['nodemon:run']);
	grunt.registerTask('dev', ['concurrent:run']);
};

