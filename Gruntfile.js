var srcPath = 'app/templates/bootstrap/_resources/';
var lessSrcPath = srcPath + 'less/';
var lessDestPath = srcPath + 'css/';
var cssSrcPath = lessDestPath;
var cssDestPath = cssSrcPath;
var jsSrcPath = srcPath + 'js/';
var jsDestPath = jsSrcPath;


module.exports = function (grunt) {
    grunt.initConfig({
        watch: { // watch for file changes
            less: {
                files: [
                    lessSrcPath + 'mitarbeiter.less'
                ],
                tasks: [
                    'less',
                    'concat:css',
                    'notify:watch'
                ]
            },
            js: {
                files: [
                    jsSrcPath + 'mitarbeiter.js'
                ],
                tasks: [
                    'jshint',
                    'uglify',
                    'concat:js',
                    'notify:watch'
                ]
            }
        },

        jshint: { // check if js has errors
            files: [
                'Gruntfile.js',
                jsSrcPath + 'mitarbeiter.js'
            ]
        },

        uglify: { // minify js
            src: {
                src: [
                    jsSrcPath + 'mitarbeiter.js'
                ],
                dest: jsDestPath + 'mitarbeiter.min.js'
            }
        },

        less: { // compile less to css
            options: {
                compress: true,
                sourceMap: true
            },
            src: {
                src: [
                    lessSrcPath + 'mitarbeiter.less'
                ],
                dest: lessDestPath + 'mitarbeiter.min.css'
            }
        },

        concat: { // concatenate all js into one file and all css into another
            options: {
                separator: ';'
            },
            js: {
                src: [
                    jsSrcPath + 'jquery-2.1.1.min.js',
                    jsSrcPath + 'bootstrap.min.js',
                    jsSrcPath + '*.min.js'
                ],
                dest: jsDestPath + 'all.js'
            },
            css: {
                src: [
                    cssSrcPath + '*.min.css'
                ],
                dest: cssDestPath + 'all.css'
            }
        },

        notify: { // send notification if compiling has finished
            watch: {
                options: {
                    message: 'compiled successful',
                    success: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-notify');


    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'less',
        'concat',
        'notify:watch'
    ]);
};