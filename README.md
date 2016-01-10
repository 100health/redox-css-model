# Redox's atomic (S)CSS model

This repository contains a set of **atoms**, **objects**, and **components** defined using the [cssmodeler](https://github.com/srouse/cssmodeler) library and used on http://redoxengine.com. Atoms are basic, descriptive classes (or Sass mixins) like `.a-margin-row-1`, `.a-float-left`, and `.a-centered`. Objects and components are higher-level classes built using those atoms, like `.c-mainNav` and `.o-document`. As you can see, the classes are prefixed (atoms with `a-`, components with `c-`, and objects with `o-`).

A full list of all atoms, objects, and components is available in the repository's [style guide](http://100health.github.io/redox-css-model/), which is intended to be a reference for folks trying to build stuff with these styles.

## How to Use

First, install the package: `bower install redox-css-model`.

Second, use [wiredep](https://github.com/taptapship/wiredep) or Sass's `@include` to reference the desired files. The files must be referenced before any of the classes or mixins can be used. You can find the files that you need using the following table. Note that the filenames are relative to the `bower_components/redox-css-model` folder in your project.

```
 Atoms (CSS classes)                 dist/csscore/core.css
 Atoms (SCSS classes and mixins)     dist/csscore/scss/core.scss
 Atoms (SCSS mixins)                 dist/csscore/scss/_core_mixins.scss
 Object/components (CSS classes)     dist/csscore/components.css
 Object/components (SCSS classes)    dist/scss/*   (separate files per object/component)
```

Third, you're done! Find out more about the atoms, objects, and components you just installed in the  [styleguide](http://100health.github.io/redox-css-model/).

## How to Contribute

Contributions are performed via pull requests, which should have an attached issue. Redox developers should use feature branches for their pull requests and follow the same code review policy they always do for contributions.

When contributing, use the following guidelines. Remember that everything in `dist/` is generated by Grunt, and must not be manually edited!

### Prototyping

Prototyping using the generated SCSS should be performed in the `prototype/` directory. Generally speaking, the files in this directory are intended to serve as a starting point for designers to hack on as well as a reference implementation for developers, but don't directly reference or depend on prototype files. There is no guarantee that they will not change dramatically even within a major version, because they are not considered part of the semver contract. The current prototype is a React-based demo application that directly references the components in `scss/`.

I'm trying to think of a reason why a PR should include prototyping code, and I can't. If you think of a good reason -- convince me! In the meantime, don't include any prototyping code in your PRs.

### Atoms

Atoms are defined in `cssmodeling/`. They use the `cssmodeler` system, which provides (among other features) a compact way to declare lots and lots of CSS classes at once using nested JSON structures. Use `grunt full` to compile the atoms (as well as everything else). Even a small change in one of these JSON files might have significant reprecussions in the compiled output, so don't be surprised by your Git diffs!

The main rationale for declaring atoms in this way is that we can create a bunch of classes like `.a-width-col-1`, ``.a-width-col-2`, `.a-width-col-3`, etc. in a compact way. The reason we prefer to use many discrete classes instead of something more generic and compact like [Neat](http://neat.bourbon.io/)'s `@include span-columns(3)` is because using separate classes enforces a more unified design by preventing people from creating, for example, an element that spans 1.36 columns. This method also allows atoms to be used directly as classes, and so it doesn't depend as much on Sass.

To learn more about editing atoms, check out the [cssmodeler README](https://github.com/srouse/cssmodeler/). 

### Objects and components

Objects and components are defined in the `scss/` directory. Use `grunt` (running the `default` task) to compile the SCSS in that directory to `dist/`. This also updates the styleguide. When creating your PR, include the changes to the compiled files in `dist/` as well as the changes to the source in `scss/`. (Could CI solve this problem?)

Redox developers should **not** edit objects and components in this repository (for the time being). We use Bower to pull in the atoms, but not the components.

### Versioning

This repository uses semantic versioning. This simply means that we have three version numbers, `x.y.z`. If you want to make a change that modifies or removes existing atoms, (and more loosely, objects and components) in a non-backwards-compatible manner, then you **must** make it a major release (increment the `x` version number). Adding backwards-compatible features mandates an increment to the minor version number `y`. A bug patch would increment the patch version number `z`.

Each time you release a new version, you should both **update the bower.json** and **tag the commit** with the version number so that Bower clients are able to install older versions. You can do this using Git tags (e.g. tagging the commit `v1.5.0`), or you can use GitHub's [Releases](https://github.com/100health/redox-css-model/releases) function, which provides a GUI for the same process.

### Using the Style Guide

The source for the style guide, located in `dist/csscore/styleguide/`, is automatically generated by the `grunt` tasks, and contains a complete reference for all atoms, objects, and components. The styleguide is static HTML, CSS, and JavaScript, so you can use any static file server. The only trick is that the styleguide depends on styles in other areas of the repository, so the server must be run from the root project directory.

For example, if you have a Python 3 installation, you can run `python -m http.server` in the project's root directory to run a simple server, then browse to `http://localhost:8000/dist/csscore/styleguide/index.html` to see the styleguide.

The styleguide for the `master` branch of the repository can be accessed on the Web at http://100health.github.io/redox-css-model. If you merge a PR into the `master` repository, you should also create a commit to the `gh-pages` branch that ensures that branch is up to date with the `dist/csscore/styleguide` folder in `master`. (Is there a way to automate this?)

### Build command alt-tab reference

```
Setup:
  npm i         install dependencies
  
Grunt tasks:
  grunt         build objects, components, and prototypes
  grunt full    build atoms, objects, components, etc.
  grunt watch   automatically rebuild on change
```
