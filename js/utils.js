/**
 * @author: smileyby
 * @description:
 * @Date: 2018/8/21 19:07
 */

var utils = function(){
    var toJson = function toJSON(str){
        return "JSON" in window ? JSON.parse(str) : eval('('+ str +')');
    }

    //=> 获取当前元素距离body的偏移量，包括左偏移和上偏移
    var offset = function(curEle){
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while(p.tagName !== 'BODY'){
            //=> 兼容IE8
            if(!/MSIE 8/i.test(navigator.userAgent)){
                l += p.clientLeft;
                t += p.clientTop;
            }

            l += p.offsetLeft;
            t += p.offsetTop;
            p = curEle.offsetParent;
        }

        return {left:l, top: t}
    };

    var winBox = function(attr, value){
        if(typeof value !== 'undefined'){
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    return {
        offset: offset,
        winBox: winBox,
        toJson: toJson
    }
}();