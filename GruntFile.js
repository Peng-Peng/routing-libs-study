module.exports = function(grunt) {

    grunt.registerTask('watch', ['watch']);

    grunt.initConfig({
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "scripts/*.js",
                        "views/*.html",
                        'index.html',
                        'selectLib.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./",
                        index: 'index.html'
                    }
                    //proxy: "local.dev" //local server already runninng
                }
            }
        },
        watch: {
            js: {
                files: ['scripts/*.js'],
                options: {
                    livereload: true,
                }
            },

            html: {
                files: ['views/*.html', 'index.html', 'selectLib.js'],
                options: {
                    livereload: true,
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['browserSync', 'watch'])


};
