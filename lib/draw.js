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
