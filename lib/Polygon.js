module.exports = function(path) {
	this.type = 'polygon'
	this.path = path
	this.fill = 'black'
	this.layer = 0
	this.show = true
	this.move = function(moveX,moveY) {
		var parts = this.path
		var newPath = []
		for(y=0;y<parts.length;y++) {
			var p = parts[y]
			var part = []
			for(i=0;i<p.length;i++) {
				if(p[i].length === 2) { 
					part.push([p[i][0] + moveX, p[i][1] + moveY])
				} else if(p[i].length === 4) { 
					part.push([
						p[i][0] + moveX, 
						p[i][1] + moveY, 
						p[i][2] + moveX, 
						p[i][3] + moveY
					]) 
				} else if(p[i].length === 6) { 
					part.push([
						p[i][0] + moveX, 
						p[i][1] + moveY, 
						p[i][2] + moveX, 
						p[i][3] + moveY,
						p[i][4] + moveX, 
						p[i][5] + moveY
					])
				}
				newPath.push(part) 
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
		for(k=0;k<this.path.length;k++) {
			ctx.moveTo(this.path[k][0][0],this.path[k][0][1])
			for(j=1;j<this.path[k].length;j++) {
				var p = this.path[k][j]
				if(p.length === 2) { ctx.lineTo(p[0],p[1]) }
				if(p.length === 4) { ctx.quadraticCurveTo(p[0],p[1],p[2],p[3]) }
				if(p.length === 6) { ctx.bezierCurveTo(p[0],p[1],p[2],p[3],p[4],p[5]) }
			}
			ctx.closePath()
		}

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

