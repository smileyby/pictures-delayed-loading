/**
 * @author: smileyby
 * @description:
 * @Date: 2018/8/26 13:17
 */

var newsRender = function () {
    var _newsDate = null,
        _newsBox = document.getElementById('newsBox');

    //=> queryData: 使用ajax获取到需要绑定的数据
    function queryData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/news.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200){
                _newsDate = utils.toJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //=> bindHTML：根据获取的数据把HTML绑定在页面中
    function bindHTML(){
        if (!_newsDate){return;}
        var str = ``;
        for (var i = 0; i < _newsDate.length; i += 1) {
            var item = _newsDate[i];
            str += `<li>
                <a href="${item.link}">
                    <div class="imgBox"><img src="" data-img="${item.figure}" alt=""></div>
                    <div class="con">
                        <p class="title">${item.title}</p>
                        <span>${item.comment}</span>
                    </div>
                </a>
            </li>`;
        }
        _newsBox.innerHTML = str;
    }

    //=> computed: 计算图片延迟加载
    function computed() {
        var imgList = _newsBox.getElementsByTagName('img');
        for (var i = 0; i < imgList.length; i += 1) {
            var curImg = imgList[i],
                curBox = curImg.parentNode;
            //=> 获取“图片所在盒子底部距离body的距离A”和“浏览器底边距离body距离B”
            var A = utils.offset(curBox)['top'] + curBox.offsetHeight;
            var B = utils.winBox('clientHeight') + utils.winBox('scrollTop');
            if (curImg.isLoad){
                //=> 如果当前图片已经处理过，我们不需要重复处理，直接进入下一轮循环
                continue;
            }
            if (A <= B){
                //=> 当前图片符合延迟加载的条件，我们开始加载
                lazyImg(curImg);
            }

        }
    }

    //=> lazyImg: 给某一张图片进行延迟加载
    function lazyImg(curImg){
        //=> 避免重复处理
        curImg.isLoad = true;
        var tempImg = new Image;
        tempImg.onload = function () {
            curImg.src = tempImg.src;
            curImg.style.display = 'block';
            tempImg = null;
        };
        tempImg.src = curImg.getAttribute('data-img');
    }

    return {
        init: function () {
            //=> 模块的入口：在入口中斜体哦控制先做什么在做什么
            queryData();
            bindHTML();

            //=> 等待页面中内容渲染完成再获取计算是否需要延迟加载
            setTimeout(computed,  500);
            window.onscroll = computed;
        }
    }
}();
newsRender.init();
