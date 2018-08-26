关于多图延迟加载
===============

## 使用到的属性

> + offsetTop
> + offsetLeft
> + offsetParent
> + clientHeight
> + clientWidth
> + scrollTop
> + scrollLeft

clientHeight/clientWidth: 只读属性，元素内部的高度/宽度（单位像素），包含内边距（但不包含水平/垂直滚动条、边框和外边距） 

clientHeight = height + paddingTop + paddingBottom - 滚动条的宽度 

clientWidth = width + paddingLeft + paddingRight - 滚动条的高度 

clientLeft/cilentTop: 只读属性 元素边框的宽度和高度 

scrollHeight/scrollWidth: 只读属性，元素内容区域的高度/宽度 

offsetHeight/offsetWidth: 只读属性，返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数（得到的结果被四舍五入） 

offsetHeight = height + borderTop + borderBottom + paddingTop + paddingBottom 

offsetWidth = width + borderLeft + borderRight + paddingLeft + paddingRight 

获取元素的真实宽高，使用offsetWidth/offsetHeight 更为准确但不要忘记它是四舍五入的值 

offsetParent: 只读属性，返回一个指向最近的包含该元素的定位元素，如果没有定位元素，则offsetParent为最近的table table 
cell或根元素（标准模式下为html，quirks模式下为body）。当元素的display为none時 offsetParent为null 

offsetLeft/offsetTop: 返回元素相对其offsetParent的左偏移和上偏移（元素边框最左边/最顶部到offsetParent边框最左边/最顶部的距离） 

scrollTop/scrollLeft: 可读写属性，获取或设置元素的内容垂直或者水平方向滚动的像素数

[各个属性的说明](https://codepen.io/smileyby/pen/BOjbxN)

## 使用到的封装方法

> + queryData: 使用ajax获取到需要绑定的数据
> + bindHTML：根据获取的数据把HTML绑定在页面中
> + computed: 计算图片延迟加载
> + lazyImg: 给某一张图片进行延迟加载
> + offset: 获取当前元素距离body的偏移量，包括左偏移和上偏移
> + winBox: 兼容方法获取或设置元素属性
> + toJSON: 兼容方法将json格式字符串转化为json对象

## 使用到的设计模式

> 高级单例设计模式

```javascript
var newsRender = (function(){
	...
	return {
		//=> 初始化项
		init: function(){
			...
		}
	}
})();
newsRender.init();
```
