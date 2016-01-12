(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Mala = require('./index')

window.Mala = Mala

},{"./index":2}],2:[function(require,module,exports){
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

},{"./lib/AddImageFile":3,"./lib/Circle":4,"./lib/Image":5,"./lib/Line":6,"./lib/Polygon":7,"./lib/Rect":8,"./lib/Text":9,"./lib/draw":10}],3:[function(require,module,exports){
module.exports = function(file, x) {
	var img = new Image()
	img.addEventListener('load', function() {
		x.imagesDoneLoading()
	}, false)
	img.src = file
	return img
}

},{}],4:[function(require,module,exports){
module.exports = function(x,y,r) {
	this.type = 'circle'
	this.x = x
	this.y = y
	this.r = r
	this.fill = 'black'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		this.x = this.x + moveX
		this.y = this.y + moveY
	}
	this.draw = function(ctx) {
		ctx.beginPath()

		if(this.opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = this.opacity
		}

		ctx.arc(this.x,this.y,this.r,2 * Math.PI, false)

		if(this.fill !== undefined) {
			ctx.fillStyle = this.fill
			ctx.fill()
		}
		if(this.stroke !== undefined) {
			ctx.strokeStyle = this.stroke
			if(this.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = this.lineWidth }
			ctx.stroke()
		}
	}
	return this
}


},{}],5:[function(require,module,exports){
module.exports = function(img,x,y) {
	this.type = 'image'
	this.x = x
	this.y = y
	this.img = img
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		this.x = this.x + moveX
		this.y = this.y + moveY
	}
	this.draw = function(ctx) {
		ctx.beginPath()

		if(this.opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = this.opacity
		}

		if(this.width !== undefined && this.height !== undefined) {
			var w = this.width
			var h = this.height
		} else if(this.width !== undefined && this.height === undefined) {
			var w = this.width
			var h = w / this.img.naturalWidth * this.img.naturalHeight
		} else if(this.width === undefined && this.height !== undefined) {
			var h = this.height
			var w = h / this.img.naturalHeight * this.img.naturalWidth 
		} else {
			var w = this.img.naturalWidth
			var h = this.img.naturalHeight
		}
 
		ctx.drawImage(this.img,this.x,this.y,w,h)
	}
	return this
}


},{}],6:[function(require,module,exports){
module.exports = function(path) {
	this.type = 'line'
	this.path = path
	this.stroke = 'black'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		var p = this.path
		var newPath = []
		for(i=0;i<p.length;i++) {
			if(p[i].length === 2) { 
				newPath.push([p[i][0] + moveX, p[i][1] + moveY])
			} else if(p[i].length === 4) { 
				newPath.push([
					p[i][0] + moveX, 
					p[i][1] + moveY, 
					p[i][2] + moveX, 
					p[i][3] + moveY
				]) 
			} else if(p[i].length === 6) { 
				newPath.push([
					p[i][0] + moveX, 
					p[i][1] + moveY, 
					p[i][2] + moveX, 
					p[i][3] + moveY,
					p[i][4] + moveX, 
					p[i][5] + moveY
				])
			} 
		}
		this.path = newPath
	}
	this.draw = function(ctx) {
		ctx.beginPath()

		if(this.opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = this.opacity
		}

		ctx.moveTo(this.path[0][0],this.path[0][1])
		for(j=1;j<this.path.length;j++) {
			var p = this.path[j]
			if(p.length === 2) { ctx.lineTo(p[0],p[1]) }
			if(p.length === 4) { ctx.quadraticCurveTo(p[0],p[1],p[2],p[3]) }
			if(p.length === 6) { ctx.bezierCurveTo(p[0],p[1],p[2],p[3],p[4],p[5]) }
		}

		if(this.stroke !== undefined) {
			ctx.strokeStyle = this.stroke
			if(this.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = this.lineWidth }
			if(this.lineJoin === undefined) { ctx.lineJoin = 'miter' } else { ctx.lineJoin = this.lineJoin }
			if(this.lineCap === undefined) { ctx.lineCap = 'butt' } else { ctx.lineCap = this.lineCap }
			ctx.stroke()
		}

	}

	return this
}


},{}],7:[function(require,module,exports){
module.exports = function(path) {
	this.type = 'polygon'
	this.path = path
	this.fill = 'black'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		var p = this.path
		var newPath = []
		for(i=0;i<p.length;i++) {
			if(p[i].length === 2) { 
				newPath.push([p[i][0] + moveX, p[i][1] + moveY])
			} else if(p[i].length === 4) { 
				newPath.push([
					p[i][0] + moveX, 
					p[i][1] + moveY, 
					p[i][2] + moveX, 
					p[i][3] + moveY
				]) 
			} else if(p[i].length === 6) { 
				newPath.push([
					p[i][0] + moveX, 
					p[i][1] + moveY, 
					p[i][2] + moveX, 
					p[i][3] + moveY,
					p[i][4] + moveX, 
					p[i][5] + moveY
				])
			} 
		}
		this.path = newPath
	}
	this.draw = function(ctx) {
		ctx.beginPath()

		if(this.opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = this.opacity
		}

		ctx.moveTo(this.path[0][0],this.path[0][1])
		for(j=1;j<this.path.length;j++) {
			var p = this.path[j]
			if(p.length === 2) { ctx.lineTo(p[0],p[1]) }
			if(p.length === 4) { ctx.quadraticCurveTo(p[0],p[1],p[2],p[3]) }
			if(p.length === 6) { ctx.bezierCurveTo(p[0],p[1],p[2],p[3],p[4],p[5]) }
		}
	
		ctx.closePath()

		if(this.fill !== undefined) {
			ctx.fillStyle = this.fill
			ctx.fill()
		}

		if(this.stroke !== undefined) {
			ctx.strokeStyle = this.stroke
			if(this.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = this.lineWidth }
			if(this.lineJoin === undefined) { ctx.lineJoin = 'miter' } else { ctx.lineJoin = this.lineJoin }
			if(this.lineCap === undefined) { ctx.lineCap = 'butt' } else { ctx.lineCap = this.lineCap }
			ctx.stroke()
		}

	}

	return this
}


},{}],8:[function(require,module,exports){
module.exports = function(x,y,width,height) {
	this.type = 'rect'
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.fill = 'black'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		this.x = this.x + moveX
		this.y = this.y + moveY
	}
	this.draw = function(ctx) {
		ctx.beginPath()

		if(this.opacity === undefined) {
			ctx.globalAlpha = 1
		} else {
			ctx.globalAlpha = this.opacity
		}

		ctx.rect(this.x,this.y,this.width,this.height)

		if(this.fill !== undefined) {
			ctx.fillStyle = this.fill
			ctx.fill()
		}
		if(this.stroke !== undefined) {
			ctx.strokeStyle = this.stroke
			if(this.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = this.lineWidth }
			if(this.lineJoin === undefined) { ctx.lineJoin = 'miter' } else { ctx.lineJoin = this.lineJoin }
			ctx.stroke()
		}
	}
	return this
}


},{}],9:[function(require,module,exports){
module.exports = function(txt,x,y) {
	this.type = 'text'
	this.x = x
	this.y = y
	this.fill = 'black'
	this.txt = txt
	this.font = '12px sans-serif'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		this.x = this.x + moveX
		this.y = this.y + moveY
	}
	this.draw = function(ctx) {
		ctx.font = this.font

		if(this.fill !== undefined) { 
			ctx.fillStyle = this.fill
			ctx.fillText(this.txt,this.x,this.y)
		}

		if(this.stroke !== undefined) { 
			ctx.strokeStyle = this.stroke
			if(this.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = this.lineWidth }
			ctx.strokeText(this.txt,this.x,this.y)
		}
	}
	return this
}


},{}],10:[function(require,module,exports){
module.exports = function(x) {
	checkIfLoading(x)

	function checkIfLoading(x) {
		if(x.imagesLoading === 0) {
			drawNow(x)
		} else {
			setTimeout(function() {
				checkIfLoading(x)
			},10)
		}
	}

	function drawNow(x) {
		var ctx = x.ctx
		var objs = x.objs.sort(function(a,b) { return a.layer - b.layer })
		ctx.clearRect(0,0,x.size.width,x.size.height)
		for(i=0;i<objs.length;i++) {
			var o = objs[i]
			if(o.show === true) {
				o.draw(ctx)
			}
		}
	}

}
/*
module.exports = function(x) {
	var ctx = x.ctx
	var objs = x.objs.sort(function(a,b) { return a.layer - b.layer })
	ctx.clearRect(0,0,x.size.width,x.size.height)
		for(i=0;i<objs.length;i++) {
			var o = objs[i]
			if(o.show === true) {

				if(o.opacity === undefined) { ctx.globalAlpha = 1 } else { ctx.globalAlpha = o.opacity }

				ctx.beginPath()

				if(o.type === 'text') {
					ctx.font = o.font
					if(o.fill !== undefined) { ctx.fillStyle = o.fill; ctx.fillText(o.txt,o.x,o.y) }
					if(o.stroke !== undefined) { ctx.strokeStyle = o.stroke; ctx.strokeText(o.txt,o.x,o.y) }
					console.log(o.font)
				} else if(o.type === 'image') {
					ctx.drawImage(o.img,o.x,o.y)
				} else {
					if(o.type === 'rect') {
						ctx.rect(o.x,o.y,o.width,o.height)
					} else if(o.type === 'circle') {
						ctx.arc(o.x,o.y,o.r,2 * Math.PI, false)
					} else if(o.type === 'line') {
						ctx.moveTo(o.path[0][0],o.path[0][1])
						for(j=1;j<o.path.length;j++) {
							var p = o.path[j]
							if(p.length === 2) { ctx.lineTo(p[0],p[1]) }
							if(p.length === 4) { ctx.quadraticCurveTo(p[0],p[1],p[2],p[3]) }
							if(p.length === 6) { ctx.bezierCurveTo(p[0],p[1],p[2],p[3],p[4],p[5]) }
						}
					} else if(o.type === 'polygon') {
						ctx.moveTo(o.path[0][0],o.path[0][1])
						for(j=1;j<o.path.length;j++) {
							var p = o.path[j]
							if(p.length === 2) { ctx.lineTo(p[0],p[1]) }
							if(p.length === 4) { ctx.quadraticCurveTo(p[0],p[1],p[2],p[3]) }
							if(p.length === 6) { ctx.bezierCurveTo(p[0],p[1],p[2],p[3],p[4],p[5]) }
						}
						ctx.closePath()
					}

					if(o.lineWidth === undefined) { ctx.lineWidth = 1 } else { ctx.lineWidth = o.lineWidth }
					if(o.lineJoin === undefined) { ctx.lineJoin = 'miter' } else { ctx.lineJoin = o.lineJoin }
					if(o.lineCap === undefined) { ctx.lineCap = 'butt' } else { ctx.lineCap = o.lineCap }
					if(o.fill !== undefined) { ctx.fillStyle = o.fill; ctx.fill() }
					if(o.stroke !== undefined) { ctx.strokeStyle = o.stroke; ctx.stroke() }

				}
			}
		}
}
*/

},{}]},{},[1]);
