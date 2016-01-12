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

