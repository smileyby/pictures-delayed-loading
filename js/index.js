var newsRender = (function () {
    //=> 下划线开头表示公用变量
    var _newsData = null,
        _newsBox = document.getElementById('newsBox');

    //=> queryData: 使用ajax获取需要绑定的数据
    function queryData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'json/news.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200){
                _newsData = utils.toJson(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    //=> 根据获取的数据把html绑定再页面中
    function bindHTML() {
        if(!_newsData){
            return;
        }
        var str = ``;
        for (var i = 0; i < _newsData.length; i += 1) {
            var item = _newsData[i];
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

    //=> computed：计算出那些图片需要延迟加载，我们让其延迟加载
    function computed(){
        var imgList = _newsBox.getElementsByTagName('img');
        for (var i = 0; i < imgList.length; i += 1) {
            var curImg = imgList[i],
                curBox = curImg.parentNode;
            if (curImg.isLoad){
                //=> 如果当前图片已经处理过了，我们不需要重复处理，直接进行下一次循环验证下一张图片是否需要加载即可
                continue;
            };

            //=> 获取“图片所在盒子地边框距离body的距离A”和“浏览器地边框距离body的距离B”
            var A = utils.offset(curBox)['top'] + curBox.offsetHeight;
            var B = utils.winBox('clientHeight') + utils.winBox('scrollTop');

            if (A <= B){
                //=> 当前这张图片符合延迟加载的条件，我们开始加载
                lazyImg(curImg);
            }

        }
    }

    //=> lazyImg: 给某一张图片延迟加载
    function lazyImg(curImg){
        //=> 避免重复处理
        curImg.isLoad = true;
        var tempImg = new Image;
        tempImg.onload = function(){
            curImg.src = this.src;
            curImg.style.display = 'block';
            tempImg = null;
        };
        tempImg.src = curImg.getAttribute('data-img');
    }

    return {
        init: function(){
            //=> 模块的入口：在入口文件中协调控制先做什么再做什么
            queryData();
            bindHTML();

            //=> 当页面数据都加载完成，过500ms再执行图片的延迟加载 <=> window.onload 也可以
            setTimeout(function(){
                computed
            }, 500);

            //=> 当滚动到具体的区域的额时候，我们把当前符合条件的图片延迟加载
            window.scroll = computed();
        }
    }
})();

newsRender.init();