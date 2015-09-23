module.exports = function(grunt) {
	//Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'http-server': {
			dev: {
				port: 9000
			}
		}
	});

	//Load plugins
	grunt.loadNpmTasks('grunt-http-server');

	//Tasks
	grunt.registerTask('default', ['http-server']);
};
