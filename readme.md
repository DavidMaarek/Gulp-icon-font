# Gulp Icon Font

Your own "Font-Awesome" with your .svg icons

### Installing

```
$ npm install
```

## Gulpfile
In the gulpfile.js you can set the name of your font and the name of your css class. The name of your font will be used for the name of the folder and the name of the font.

## Icons
Place your .svg icons in the "icons" folder

### Generate your font
In the gulpfile.js there are two tasks, the first "iconfont" will allow to create the font files, and the second one "sass" will compile the scss files in css.

Run this one first
```
$ gulp iconfont
```

And this one in second
```
$ gulp sass
```

## How to display icons?
className being the constant that you have defined in the gulpfile.js and svgName being the name of your .svg file, here's how to display an icon:

```
<i class="className className-svgName"></i>
```
