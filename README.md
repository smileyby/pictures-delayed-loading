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
