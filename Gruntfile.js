module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'http-server': {
			dev: {
				port: 9000
			}
		},
		sass: {
			dev: {
				files: {
					'style.css' : 'style.scss'
				}
			}
		},
		watch: {
			files: ['style.scss'],
			tasks: ['sass:dev']
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//Tasks
	grunt.registerTask('default', ['sass:dev','watch']);
	grunt.registerTask('serve', ['http-server']);
};
