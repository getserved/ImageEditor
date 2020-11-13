# ImageEditor

> This project is only for demostration of a simple Image Editor

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
* Load and display an image file (png or jpg) from the filesystem

* Once the image has been loaded, the horizontal brightness/contrast sliders become active

* The user can adjust the brightness and contrast of the image, in real time, by moving the slider left or right from its centre position to decrease or increase brightness/contrast respectively. NOTE: By "real time" we mean as the slider is dragged, do not wait for a mouse up event to trigger the change in brightness or contrast, update it as the slider is dragged

* Manipulating the pixel values directly.

* When you adjust the brightness and then adjust the contrast, the contrast adjustment should be applied over the brightness adjustment.
	
## Technologies
Project is created with:
* Vue 4.2.3
	
## Setup
To run this project, install it locally using npm:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
