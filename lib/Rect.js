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

