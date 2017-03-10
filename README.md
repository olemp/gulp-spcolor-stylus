# gulp-spcolor-stylus [![Build status]]
> Converts SharePoint .spcolor files to .styl variables

## Usage

First, install `gulp-spcolor-stylus` as a development dependency:

```shell
npm install --save-dev gulp-spcolor-stylus
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp_spcolor_stylus = require('gulp-spcolor-stylus');

gulp.task('gulp_spcolor_stylus', function(){
  gulp.src(['resource.resx'])
    .pipe(gulp_spcolor_stylus())
    .pipe(gulp.dest('file.styl'));
});
```