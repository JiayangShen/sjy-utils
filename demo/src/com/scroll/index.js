import { setTransform, stopPropagation, preventDefault } from './dom';

function Scroll(el, options){
	var wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	this.scroller = wrapper.children[0];
	this.deceleration = options.deceleration;
	var vertical = !!options.vertical;
	this.property = vertical ? 'Y' : 'X';
	this.noBounce = !!options.noBounce;
	this.wheel = !!options.wheel;
	this.slide = !!options.slide;
	this.loop = !!options.loop;
	this.step = options.step;
	this.isTouchStart = false;
	this.transitionend = options.transitionEnd;
	init.call(this);
}

function init(){
	this.items = [].slice.call(this.scroller.children);
	this.itemLength = this.items.length;
	this.index = 0;
	if(this.loop){
		let firstItem = this.items[0];
		let lastItem = this.items[this.itemLength - 1];
		this.scroller.insertBefore(lastItem.cloneNode(true), firstItem);
		this.scroller.appendChild(firstItem.cloneNode(true));
		this.items = [].slice.call(this.scroller.children);
		this.itemLength = this.items.length;
		this.index = 1;
		this.slideTo();
	}
	this.max = 0;
	this.min = -(this.itemLength - 1) * this.step;
	
	this.scroller.addEventListener('touchstart', stopPropagation(start, this));
	this.scroller.addEventListener('touchmove', stopPropagation(preventDefault(move, this), this));
	this.scroller.addEventListener('touchend', stopPropagation(end, this));

	var self = this;
	var transitionFunc = function(e){
		if(e.target === self.scroller){
			self.transitionEnd && self.transitionEnd.call(self);
		}
	}
	this.scroller.addEventListener('transitionend', transitionFunc);
	this.scroller.addEventListener('webkitTransitionEnd', transitionFunc);
}

function start(e){
	if(this.loop){
		this.fixLoop();
	}
	this.isTouchStart = true;
	this.startTime = new Date().getTime();
	this.moveStart = this.start = this.moved = e.targetTouches[0]['client' + this.property];
}

function move(e){
	if(!this.isTouchStart) return;
	var current = e.targetTouches[0]['client' + this.property];

	var d = current - this.moved;
	this.moved = current;

	var t = new Date().getTime();
	if(t - this.startTime > 300){
		this.moveStart = current;
		this.startTime = t;
	}

	var position = this.getComputedPosition(d);
	this.setPosition(position);
}

function end(e){
	if(!this.isTouchStart) return;
	var current = e.changedTouches[0]['client' + this.property];

	var duration = 500;
	var d = 0;
	var t = new Date().getTime();
	var dt = t - this.startTime;

	var distance = current - this.moveStart;
	var absDistance = Math.abs(distance);
	if(dt < 300 && absDistance > 100 && this.slide){
		let s = absDistance / dt;
		d = s * s / (2 * this.deceleration) * (distance > 0 ? 1 : -1);
		duration = Math.sqrt(2 * Math.abs(d) / this.deceleration);
	} else if(!this.noBounce){
		let distance = current - this.start;
		let md = Math.abs(distance % this.step);
		if(md > this.step / 2){
			d = (this.step - md) * (distance > 0 ? 1 : -1);
		} else {
			d = md * (distance > 0 ? -1 : 1);
		}
	}

	var position = this.getComputedPosition(d);
	position[this.property] = Math.round(position[this.property] / this.step) * this.step;
	if(position[this.property] < this.min) position[this.property] = this.min;
	if(position[this.property] > this.max) position[this.property] = this.max;
	
	this.setPosition(position, duration);
	this.isTouchStart = false;
	this.start = 0;
}

Scroll.prototype.setPosition = function(position, duration = 0){
	var scrollerStyle = this.scroller.style;
	scrollerStyle.transitionDuration = `${duration}ms`;
	setTransform(scrollerStyle, `translate3d(${position.X}px, ${position.Y}px, 0)`);
	if(this.wheel){
		for(let i = 0, len = this.items.length;i < len;i++){
			let item = this.items[i];
			let deg = ((position[this.property] / this.step) + i) * this.step / 2;
			let itemStyle = item.style;
			itemStyle.transitionDuration = `${duration}ms`;
			setTransform(itemStyle, `rotateX(${deg}deg)`);
		}
	}
	this.index = Math.abs(Math.floor(position[this.property] / this.step));
}

Scroll.prototype.getPosition = function(){
	let curTransform, transformMatrix, matrix;
	let curStyle = window.getComputedStyle(this.scroller, null);
	if(window.WebKitCSSMatrix){
		curTransform = curStyle.transform || curStyle.webkitTransform;
		if (curTransform.split(',').length > 6) {
			curTransform = curTransform.split(', ').map(function(a){
				return a.replace(',','.');
			}).join(', ');
		}
		transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	} else {
		transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
		matrix = transformMatrix.toString().split(',');
	}
	let X, Y;
	if (window.WebKitCSSMatrix) {	//Latest Chrome and webkits Fix
		Y = transformMatrix.m42;
    	X = transformMatrix.m41;
	} else if (matrix.length === 16) {	//Crazy IE10 Matrix
		Y = parseFloat(matrix[13]);
    	X = parseFloat(matrix[12]);
	} else {	//Normal Browsers
		Y = parseFloat(matrix[5]);
    	X = parseFloat(matrix[4]);
	}
    return { X, Y }
}

Scroll.prototype.getComputedPosition = function(d){
	var position = this.getPosition();
	position[this.property] += d;
	return position;
}

Scroll.prototype.slideTo = function(i, duration){
	if(i === undefined) i = this.index;
	var d = -this.step * i;
	var position = this.getPosition();
	position[this.property] = d;
	this.setPosition(position, duration);
}

Scroll.prototype.fixLoop = function(){
	if(this.index == 0){
		this.slideTo(this.itemLength - 2);
	} else if(this.index == this.itemLength - 1){
		this.slideTo(1);
	}
}

Scroll.prototype.startAutoPlay = function(interval, speed, direction = 1){
	if(interval <= speed){
		console.log('ERROR:---轮播间隔须大于速度---');
		return;
	}
	var self = this;
	this.autoPlayID = setInterval(function(){
		if(self.loop) self.fixLoop();
		if(!self.isTouchStart)self.slideTo(self.index + direction, speed);
	}, interval)
}

Scroll.prototype.stopAutoPlay = function(){
	if(!this.autoPlayID) return;
	clearInterval(this.autoPlayID);
	this.autoPlayID = undefined;
}

export default Scroll;