var utils = (function () {
   var toJSON = function toJSON(jsonStr) {
        if (!jsonStr){return;}
        if ('JSON' in window){
            return JSON.parse(jsonStr);
        } else {
            return eval('('+ jsonStr +')');
        }
    };

    //=> offset: Gets the offset of the current element from body, including the left offset and the top offset.
    var offset = function offset(curEle){
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while(p.tagName !== 'BODY'){
            if(!/MSIE 8/i.test(navigator.userAgent)){
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l}
    };

    var winBox = function windBox(attr, value) {
        if (typeof value !== 'undefined'){
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    return {
        toJSON: toJSON,
        offset: offset,
        winBox: winBox
    }
})();