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

