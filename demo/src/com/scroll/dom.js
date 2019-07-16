export function setTransform(style, value){
	style.webkitTransform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform = value;
}

export function preventDefault(fn, context){
	return function(e){
		e.preventDefault();
		fn.call(context, e);
	}
}

export function stopPropagation(fn, context){
	return function(e){
		e.stopPropagation();
		fn.call(context, e);
	}
}