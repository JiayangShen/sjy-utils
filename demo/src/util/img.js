
/**
 * 根据图片服务器上的原始资源图片,按照配置信息，返回缩放、剪裁、水印等效果的图片链接
 * 图片地址：
 * [protocol] [domain] [path] [fileName] [extension]
 * [http://] [res.hualala.com] [/group1/M00/1E/3B/][wKgBZE5Izt6pUY8WAAD2HTq6pjo419][.jpg]
 * @param {String} path 图片资源的路径(必须)
 * @param {Object} cfg 对于图片的配置信息
 *         cfg : {
 *         		//控制是否加水印
 *         		watermark : true|false 	(是否需要打水印,默认为false)
 *         		//控制缩放规则
 *         		scale : 	'percent'(百分比缩放) | 
 *         				'lockMin'(锁定比例按照最小值缩放)(默认) | 'lockMax'(锁定比例按照最大值缩放) | 'unlock'(取消锁定比例) |
 *         				'lockMinZoomOut'(锁定比例，按照固定尺寸取小值缩小*只允许缩小*) | 
 *         				'lockMinZoomIn'(锁定比例，按照固定尺寸取小值放大*只允许放大*) |
 *         				'lockMaxZoomOut'(锁定比例，按照固定尺寸取大值缩小*只允许缩小*) |
 *         				'lockMaxZoomIn'(锁定比例，按照固定尺寸取大值放大*只允许放大*) | 
 *         				'unlockZoomOut'(取消锁定比例，按照固定尺寸缩小*只允许缩小*) | 
 *         				'unlockZoomIn'(取消锁定比例，按照固定尺寸放大*只允许放大*) 
 *         		width : 300,
 *         		height : 200,
 *         		//控制截取规则 
 *         		//NOTE：一旦cut不为空，缩放规则自动取消
 *         		cut : 	null(不截取) | 'normal'(正常截取图片) | 'max'(最大化截取图片矩形区域)
 *         		offsetX : 0,
 *         		offsetY : 0,
 *         		//控制图片旋转
 *         		rotate :  degree(顺时针0~360) | null
 *         		//控制图片的质量
 *         		quality : (图片质量百分数1-100) | null
 *         }
 * @return {String} 返回图片地址
 */
export default function getImgSrc(_path, cfg)
{
    if (!_path || typeof _path !== 'string') return '';
    
    var lastSlash = _path.lastIndexOf('/');
    if(lastSlash < 0 || !/\..+$/.test(_path)) return '';
    var fileName = _path.slice(lastSlash + 1);
    var suffix = fileName.replace(/^(.*)\.(jpg|jpeg|png|gif|ico)/i, '$2');
    fileName = fileName.replace(/^(.*)\.(jpg|jpeg|png|gif|ico)/i, '$1');
    var path = _path.slice(0, lastSlash);
    
    var settings = Object.assign({
        watermark : false,
        scale : 'lockMin',
        width : null,
        height : null,
        cut : null,
        offsetX : null,
        offsetY : null,
        rotate : null,
        quality : null
    }, cfg);
    var imgDomain = 'https://res.hualala.com/';
    
    var dpr = G.dpr || 2;
    settings.hasDpr = true;
    if(settings.width) settings.width = Math.round(settings.width);
    if(settings.height) settings.height = Math.round(settings.height);
    if(settings.width && settings.hasDpr) settings.width = Math.round(settings.width * dpr);
    if(settings.height && settings.hasDpr) settings.height = Math.round(settings.height * dpr);
    if(settings.quality > 0 && !/jpg|jpeg/i.test(suffix)) settings.quality = null;
    
    var w = settings.width || null, h = settings.height || null,
        x = settings.offsetX || null, y = settings.offsetY || null;

    var scale = settings.scale, scaleE = '';
    var cut = settings.cut || null, cutE = '';
    var rotate = settings.rotate || null, quality = settings.quality || null,
        paramE = [];
    var scaleRule = {
        // 协议类型< width- >x< height- >
        'percent' : '-',
        // 协议类型< width >x< height >
        'lockMin' : '',
        // 协议类型< width >x< height>_ 例如：300x200_
        'lockMax' : '_',
        // 协议类型 < width >x< height>! 例如：300x200!
        'unlock' : '!',
        // 协议类型 < width >x< height>) 例如：600x200)
        'lockMinZoomOut' : ')',
        // 协议类型 < width >x< height>( 例如：600x200(
        'lockMinZoomIn' : '(',
        // 协议类型 < width >x< height>)_ 例如：600x200)_
        'lockMaxZoomOut' : ')_',
        // 协议类型 < width >x< height>(_ 例如：600x200(_
        'lockMaxZoomIn' : '(_',
        // 协议类型 < width >x< height>)! 例如：600x200)!
        'unlockZoomOut' : ')!',
        // 协议类型 < width >x< height>(! 例如：600x200(!
        'unlockZoomIn' : '(!',
    };
    var cutRule = {
        // 协议类型 c< width >x< height>+< offset_x>+< offset_y>
        'normal' : 'c',
        'max' : 'C'
    };
    // 获取scale表达式
    if (!w && !h) {
        scaleE = '';
    } else if (!w || !h) {
        scaleE = scale == 'percent' ? 
            ('=' + (!w ? h : w) + scaleRule[scale]) : '';
    } else {
        scaleE = '=' + w + (scale == 'percent' ? scaleRule[scale] : '') + 'x' + h + scaleRule[scale];
    }

    // 获取截取参数
    // NOTE:一旦截取图片功能开启，缩放功能无效
    if (cut) {
        scaleE = '';
        if (!w || !h) {
            cutE = '';
        } else {
            cutE = '=' + cutRule[cut] + w + 'x' + h + '+' + (x || 0) + '+' + (y || 0);
        }
    } else {
        cutE = '';
    }

    // 获取旋转图片参数
    if (rotate > 0) {
        paramE.push('rotate=' + rotate);
    }
    // 获取图片的质量参数
    if (quality > 0) {
        paramE.push('quality=' + quality);
    }
    paramE = paramE.join('&');
    var ret = imgDomain
        + path + '/' 
        + fileName + scaleE + cutE + '.' + suffix 
        + (paramE.length > 0 ? ('?' + paramE) : '');
    return ret;
}

export function preLoadImg(options){
	var selector = options.selector || 'img';
	var imgs;
	var condition = options.condition,
		type = options.type;
	return function(y){
		imgs = refresh(selector);
		for(var i = 0, len = imgs.length; i < len; i++){
			var img = imgs[i];
			if(!condition || condition(img, y)){
				loadImg(img);
			}
		}
	}
}

function loadImg(img) {
	var imgClassList = img.classList;
	imgClassList.add('img-loading');
	var newImg = new Image();
	var src = img.getAttribute('osrc');
   if(!src){
        imgClassList.remove('img-loading');
        imgClassList.add('img-loaded');
        return;
    }
	newImg.onload = function(){
		img.style.backgroundImage = 'url(' + src + ')';
		imgClassList.remove('img-loading');
		imgClassList.add('img-loaded');
        img.parentNode.style.backgroundImage = 'none';
	}
    newImg.onerror = function(){
        imgClassList.remove('img-loading');
        imgClassList.add('img-loaded');
    }
	newImg.src = src;
}

export function refresh(selector){
	return document.querySelectorAll(selector + ':not(.img-loaded):not(.img-loading)');
}
















