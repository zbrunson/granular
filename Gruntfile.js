'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			scripts: {
				files: [
					'index.js',
					'lib/**/*.js'
				],
				tasks: ['jshint', 'mochaTest'],
				options: {
					spawn: false
				}
			},
			tests: {
				files: [
					'tests/**/*.js'
				],
				tasks: ['mochaTest'],
				options: {
					spawn: false
				}
			}
		},

		jshint: {
			scripts: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'index.js',
					'lib/**/*.js'
				]
			}
		},

		mochaTest: {
			all: {
				src: [
					'tests/**/*.js'
				],
				options: {
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
				tasks: ['watch', 'jshint', 'mochaTest', 'nodemon:run'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.registerTask('default', ['nodemon:run']);
	grunt.registerTask('dev', ['concurrent:run']);
};

