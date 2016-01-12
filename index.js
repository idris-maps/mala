var Rect = require('./lib/Rect')
var Circle = require('./lib/Circle')
var Line = require('./lib/Line')
var Polygon = require('./lib/Polygon')
var Text = require('./lib/Text')
var AddImageFile = require('./lib/AddImageFile')
var Image = require('./lib/Image')
var draw = require('./lib/draw')

module.exports = function(divId, size) {
	var div = document.getElementById(divId)

	var canvas = document.createElement('CANVAS')
	canvas.width = size.width
	canvas.height = size.height
	div.appendChild(canvas)

	var ctx = canvas.getContext('2d')

	this.divId = divId
	this.size = size
	this.el = canvas
	this.ctx = ctx
	this.objs = []
	this.imgs = []
	this.imagesLoading = 0

	this.rect = function(x,y,width,height) {
		var o = new Rect(x,y,width,height)
		this.objs.push(o)
		return o
	}

	this.circle = function(x,y,r) {
		var o = new Circle(x,y,r)
		this.objs.push(o)
		return o
	}

	this.line = function(path) {
		var o = new Line(path)
		this.objs.push(o)
		return o
	} 

	this.polygon = function(path) {
		var o = new Polygon(path)
		this.objs.push(o)
		return o
	}

	this.text = function(txt,x,y) {
		var o = new Text(txt,x,y)
		this.objs.push(o)
		return o	
	}

	this.addImageFile = function(file) {
		this.imagesLoading = this.imagesLoading + 1
		var o = new AddImageFile(file, this)
		this.imgs.push(o)
		return o
	}

	this.image = function(img,x,y) {
		var o = new Image(img,x,y)
		this.objs.push(o)
		return o
	}

	this.imagesDoneLoading = function() {
		this.imagesLoading = this.imagesLoading - 1
	}

	this.draw = function() {
		draw(this)
	}

	this.remove = function(o) {
		var toRemove = null
		for(i=0;i<this.objs.length;i++) {
			if(o === this.objs[i]) { toRemove = i }
		}
		if(toRemove !== null) {
			this.objs.splice(toRemove, 1)
		}
	}

	return this
}
