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

