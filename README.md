# Redox's atomic (S)CSS model

This is the repository for prototyping and developing a set of CSS "atoms", that is, a toolkit of basic, descriptive classes (or mixins) like `a-margin-row-1` or `a-centered` that can be composed into more complex designs.

## How to Use

1. `bower install redox-css-model --save`
2. Reference a file containing the atoms inside the `bower_components/redox-css-model/dist/csscore` folder. You can grab the `csscore/core.css` or the `csscore/scss/core.scss` to get all the classes and mixins.

## How to build

* `grunt` to build prototyping CSS
* `grunt full` to rebuild atoms
* `grunt watch` to watch CSS and atoms