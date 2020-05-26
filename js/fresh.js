window.addEventListener("load", gogopower);

function gogopower(){
    let body = document.getElementsByTagName('body');

    let heart = document.getElementsByClassName('heart');
    let bottom = document.getElementsByClassName('bottom');
    let light_box = document.getElementById('light_box');
    let lb_card = document.getElementById('lb_card');
    let lb_img = document.getElementById('lb_img');
    let product_title = document.getElementById('product_title');
    let lb_btn = document.getElementById('lb_btn');
    let lb_pic = document.getElementById('lb_pic');
    let cart_img = document.getElementById('cart_img');
    let lb_cross = document.getElementById('lb_cross');

    let ball = document.getElementById("ball");
    let zoom_img = document.getElementById('zoom_img');

    //購物車
    let sc_products = document.getElementById('sc_products');
    let sc_close = document.getElementsByClassName('sc_close');
    let minus = document.getElementsByClassName('minus');
    let plus = document.getElementsByClassName('plus');
    let sc_total = document.getElementById('sc_total');
    let total = 0
    let buy = document.getElementById('buy');  //value
    let sc_bonus_before = document.getElementsByClassName('sc_bonus_before')[0];
    let sc_bonus_after = document.getElementsByClassName('sc_bonus_after')[0];
    let sc_bonus = document.getElementById('sc_bonus');
    let product_count = 0;
    // let product_name = ['奧地利豆芽菜','韓國高麗菜','美濃特級水蓮','乾黑木耳',
    //     '新鮮白木耳','宜蘭三星蔥','近江牛','飛驒牛','神戶牛','澳洲A9和牛',
    //     '產地直送鮭魚片','波士頓特選龍蝦','伊比利豬','佩里格松露','阿爾巴白松露','澳大利亞袋鼠肉'
    // ];
    let product_price = [9,18,25,47,88,200,640,1700,2100,350,300,5000,700,
        25000,81000,8
    ];
    let product_pcs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    let freshData = [];

    let analytic_count = '';
    let analytic_data1 = [];
    let analytic_data2 = [];
    let TotalData = [];
    let dataYMax;

    let analyticslb_box = document.getElementById('analyticslb_box')
    let NodePoint = document.getElementsByClassName('NodePoint');
    let span = document.getElementById('span');
    let movespan = document.getElementById('movespan');
    let rect = document.getElementsByClassName('rect');
    let circle = document.getElementsByClassName('circle');
    let width = 480;
    let height = 240;

    let freshRef = firebase.database().ref('freshorder');
    for(var h = 0; h<product_name.length;h++){
        freshData.push({
            name:product_name[h],
            price:product_price[h],
            pcs:product_pcs[h],
            count:h,
            key:''
        })
    }
    
    // freshorder
    freshRef.once('value',(snapshot)=>{
        for(item in snapshot.val()){
            if(snapshot.val()[item].name){
                freshData[snapshot.val()[item].count].pcs = snapshot.val()[item].pcs;
                freshData[snapshot.val()[item].count].key = item;
                freshRef.child(item).update({key:item});
            }
        }
        if(snapshot.val()){
            ball.style.display = 'block';
            if(window.innerWidth > 768){
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768up')
            }else{
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768down')
            }
        }

        for(var pp = 0; pp < freshData.length; pp++){
            if(freshData[pp].pcs > 0){
                sc_products.innerHTML += `
                <div class="sc_product" id="sc_product${freshData[pp].count}">
                    <img src="./pic/fresh/f${freshData[pp].count+1}.jpg" alt="">
                    <div class="sc_product_contents">
                        <h3>${freshData[pp].name}</h3>
                        <span class="nt">NTD${freshData[pp].price}元</span>
                        <div class="price">
                            <input type="submit" class="count minus" value="-" data-key="${freshData[pp].key}" data-count="${freshData[pp].count}">
                            <span class="sc_number" id="sc_number${freshData[pp].count}" >${freshData[pp].pcs}</span>
                            <span>件</span>
                            <input type="submit" class="count plus" value="+" data-key="${freshData[pp].key}" data-count="${freshData[pp].count}">
                        </div>
                    </div>
                    <div class="sc_close" data-key="${freshData[pp].key}" data-count="${freshData[pp].count}">
                        <div class="sc_close_line"></div>
                    </div>
                </div>   
                `
            }
        }

        //先計算一次總價
        Calc();
        // 先製造關閉事件
        for(var a = 0; a < sc_close.length; a++){
            // console.log(a);
            sc_close[a].addEventListener('click',CloseSC);
        }
        // 先製造加減事件
        for(var b = 0; b < minus.length; b++){
            minus[b].addEventListener('click',Minus);
        }
        for(var c = 0; c < plus.length; c++){
            plus[c].addEventListener('click',Plus);
        }    

        //燈箱 - 點購物車按鈕後出現動畫
        lb_btn.addEventListener('click',()=>{
            //紀錄購買品項的號碼
            product_count = lb_btn.dataset.cart - 1;
            if(window.innerWidth >= 1024){
                cart_img.src = `./pic/fresh/f${lb_btn.dataset.cart}.jpg`;
                lb_pic.style.animation = 'cart 1s backwards';
                setTimeout(() => {
                    if(lb_pic){
                        lb_pic.style.animation = '';
                    };
                }, 1200);
            }else{
                $('#warning').slideDown();

                setTimeout(() => {
                $('#warning').slideUp();
                }, 1000);
            }
            ball.style.display = 'block';
            if(window.innerWidth > 768){
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768up')
            }else{
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768down')
            }

            //產生shopping product
            if(freshData[product_count].pcs > 0){
                freshData[product_count].pcs += Number(buy.value);
                freshRef.once('value',(snapshot)=>{
                    for(item in snapshot.val()){
                        if(snapshot.val()[item].name == freshData[product_count].name){
                            freshRef.child(item).update({pcs:freshData[product_count].pcs})
                        }
                    }
                })
                document.getElementById(`sc_number${product_count}`).innerText = freshData[product_count].pcs;
                Calc();
            }else{
                freshData[product_count].pcs += Number(buy.value);
                // console.log(product_pcs);
                freshRef.push(freshData[product_count]);
                freshRef.once('value',(snapshot)=>{
                    for(item in snapshot.val()){
                        if(snapshot.val()[item].name == freshData[product_count].name){
                            freshRef.child(item).update({key:item});
                            freshData[product_count].key = item;
                        }
                    }
                    sc_products.innerHTML += `
                    <div class="sc_product" id="sc_product${freshData[product_count].count}">
                        <img src="./pic/fresh/f${freshData[product_count].count+1}.jpg" alt="">
                        <div class="sc_product_contents">
                            <h3>${freshData[product_count].name}</h3>
                            <span class="nt">NTD${freshData[product_count].price}元</span>
                            <div class="price">
                                <input type="submit" class="count minus" value="-" data-key="${freshData[product_count].key}"  data-count="${freshData[product_count].count}">
                                <span class="sc_number" id="sc_number${freshData[product_count].count}" >${freshData[product_count].pcs}</span>
                                <span>件</span>
                                <input type="submit" class="count plus" value="+" data-key="${freshData[product_count].key}" data-count="${freshData[product_count].count}">
                            </div>
                        </div>
                        <div class="sc_close" data-key="${freshData[product_count].key}" data-count="${freshData[product_count].count}">
                            <div class="sc_close_line"></div>
                        </div>
                    </div>   
                    `
                    Calc();
                    // console.log(sc_close);
                    // 製造關閉事件
                    for(var a = 0; a < sc_close.length; a++){
                        // console.log(a);
                        sc_close[a].addEventListener('click',CloseSC);
                    }
                    // 製造加減事件
                    for(var b = 0; b < minus.length; b++){
                        minus[b].addEventListener('click',Minus);
                    }
                    for(var c = 0; c < plus.length; c++){
                        plus[c].addEventListener('click',Plus);
                    }   
                })
            }
            buy.value = 1;
        })
    })

    //關閉函式
    function CloseSC(){
        freshData[this.dataset.count].pcs = 0 ;
        freshRef.child(this.dataset.key).remove();
        sc_products.removeChild(document.getElementById(`sc_product${Number(this.dataset.count)}`));
        let test_count = 0;
        for(var jj = 0 ; jj < product_pcs.length ; jj++){
            test_count += freshData[jj].pcs;
        }
        if(test_count == 0){
            ball.style.display = 'none';
            if(window.innerWidth > 768){
                document.getElementById('shopping_btn').classList.remove('shpping_btn_fixed_768up')
            }else{
                document.getElementById('shopping_btn').classList.remove('shpping_btn_fixed_768down')
            }
        }
        Calc();
    }
    //減法函式
    function Minus(){
        freshData[Number(this.dataset.count)].pcs -= 1;
        if(freshData[Number(this.dataset.count)].pcs <= 0){
            freshData[Number(this.dataset.count)].pcs = 1;
            alert('最小為1');
        }else{
            freshRef.child(this.dataset.key).update({pcs:freshData[Number(this.dataset.count)].pcs});
            document.getElementById(`sc_number${Number(this.dataset.count)}`).innerText = freshData[Number(this.dataset.count)].pcs;
        }
        Calc();
    }
    //加法函式
    function Plus(){
        freshData[Number(this.dataset.count)].pcs += 1;
        if(freshData[Number(this.dataset.count)].pcs >= 100){
            freshData[Number(this.dataset.count)].pcs = 99;
            alert('最大為99');
        }else{
            freshRef.child(this.dataset.key).update({pcs:freshData[Number(this.dataset.count)].pcs});
            document.getElementById(`sc_number${Number(this.dataset.count)}`).innerText = freshData[Number(this.dataset.count)].pcs;
        }
        Calc();
    }

    //計算函式
    function Calc(){
        total = 0;
        for(var ss = 0; ss < freshData.length ; ss++){
            total += freshData[ss].pcs * freshData[ss].price;
        }
        sc_total.innerText = total ;
        if(total < 2000){
            sc_bonus_before.classList.remove('sc_display_none');
            sc_bonus_after.classList.add('sc_display_none');
            sc_bonus.innerText = 2000 - total;
        }else{
            sc_bonus_before.classList.add('sc_display_none');
            sc_bonus_after.classList.remove('sc_display_none');
        }
    }


    //analytics - 移入移出事件
    $('.analytics').mouseover(function () { 
        this.src = "./pic/analytics_orange.svg";
    });
    $('.analytics').mouseout(function () { 
        this.src = "./pic/analytics_black.svg";
    });

    //analytics - 點擊叫出分析燈箱
    $('.analytics').on('click', function () {
        analytic_count = Number(this.dataset.analytics);
        analytic_data1 = analytics_data[analytic_count];
        analytic_data2 = analytics_data[analytic_count+1];
        TotalData = analytic_data1.concat(analytic_data2);
        dataYMax = d3.max(TotalData,function(d){return d.y}) + 5;

        $('.analyticslb_box').addClass('analytics_shock');
        $('#analyticslb_title').text(`菜價分析(${product_name[analytic_count/2]})`);
        //每次移除舊的svg element
        $('#svg').remove();

        //D3.js 撰寫分析內容
        var s = d3.select('#div').append('svg')
        .attr({
            'width': 600,
            'height': 360,
            'id': 'svg',
        }).style({
            'border': '2px solid #F86422',
            'box-sizing':'border-box',
            'background-color':'white',
        });
        //等距放大
        var scaleX = d3.scale.linear()
            .range([0,width])
            .domain([5,1]);
        var scaleY = d3.scale.linear()
            .range([height,0])
            .domain([0,dataYMax]);

        //坐標軸
        var axisX = d3.svg.axis()
            .scale(scaleX)
            .orient('bottom')
            //幾個標籤
            .ticks(10)
            //要取哪幾個數字
            .tickValues([5,4,3,2,1])
            //顯示狀況
            .tickFormat(function(d){return d+'月前';})
            .tickPadding(8);
        var axisY = d3.svg.axis()
            .scale(scaleY)
            .orient('left')
            .ticks(5)
            .tickFormat(function(d){return d+'元';})
            .tickPadding(8);

        //格線
        var axisXGrid = d3.svg.axis()
            .scale(scaleX)
            .orient("bottom")
            .ticks(10)
            .tickFormat("")
            .tickSize(-height,0);
        var axisYGrid = d3.svg.axis()
            .scale(scaleY)
            .orient("left")
            .ticks(10)
            .tickFormat("")
            .tickSize(-width,0);

        //區域設定
        var area = d3.svg.area()
        .x(function(d) { return scaleX(d.x); })
        .y0(height)
        .y1(function(d) { return scaleY(d.y); })
        .interpolate('cardinal');

        //區域渲染
        s.append('path')
        .attr({
            'd':area(analytic_data1),
            'fill':'rgba(0,150,255,.1)',
            'transform':'translate(60,60)',
            'class':'area1',
        });
        s.append('path')
        .attr({
            'd':area(analytic_data2),
            'fill':'rgba(255,0,0,.1)',
            'transform':'translate(60,60)',
            'class':'area2',
        });
        //座標
        s.append('g')
        .call(axisX).attr({
            'fill':'none',
            'stroke':'#000',
            'transform':`translate(60,${height+60})`
        }).selectAll('text')
        .attr({
            'fill':'#AAAAAA',
            'stroke':'none',
        }).style({
            'font-size':'11px'
        });
        s.append('g')
        .call(axisY).attr({
            'fill':'none',
            'stroke':'#000',
            'transform':'translate(60,60)'
        }).selectAll('text')
        .attr({
            'fill':'#AAAAAA',
            'stroke':'none',
        }).style({
            'font-size':'11px',
        }); 

        //格線
        s.append('g')
        .call(axisXGrid)
        .attr({
            'fill':'none',
            'stroke':'rgba(0,0,0,.1)',
            'transform':`translate(60,${height+60})`
        });
        s.append('g')
        .call(axisYGrid)
        .attr({
            'fill':'none',
            'stroke':'rgba(0,0,0,.1)',
            'transform':'translate(60,60)'
        });
        //方塊節點
        s.selectAll("rect")
        .data(analytic_data1)
        .enter().append('rect')
        .attr({
        'x': function(d){return scaleX(d.x)-8 ;},
        'y': function(d){return scaleY(d.y)-8 ;},
        'width':16,
        'height':16,
        'fill':'#09c',
        'stroke':'none',
        'stroke-width':'10px',
        'transform':'translate(60,60)',
        'class':'NodePoint rect'
        });

        // 圓形節點
        s.selectAll("circle").data(analytic_data2).enter().append('circle')
        .attr({
        'cx': function(d){return scaleX(d.x);},
        'cy': function(d){return scaleY(d.y);},
        'r':8,
        'fill':'#c00',
        'stroke':'#c00',
        'stroke-width':'1px',
        'transform':'translate(60,60)',
        'class':'NodePoint circle',
        });

        //十字線
        let crosshairX = s.append('line').attr({
            'id': 'crosshairX',
            'class':'crosshair',
            'stroke':'rgba(0,0,0,.9)',
            'stroke-width': '1px',
            'stroke-dasharray':'2,10',
        }).style('opacity','0');
        let crosshairY = s.append('line').attr({
            'id': 'crosshairY',
            'class':'crosshair',
            'stroke':'rgba(0,0,0,.9)',
            'stroke-width': '1px',
            'stroke-dasharray':'2,10',
        }).style('opacity','0');

        //svg - movein
        let svg = document.getElementById('svg');
        svg.addEventListener('mouseover',(e)=>{
            //因為有translateX(-50%)調整至中，所以需要加回來燈箱寬度的一半
            let ex = e.clientX - div.offsetLeft- analyticslb_box.offsetLeft + analyticslb_box.offsetWidth/2;
            let ey = e.clientY - div.offsetTop - analyticslb_box.offsetTop;
            movespan.style.left = (ex - movespan.offsetWidth/2) + 'px';
            if(movespan.innerText != ''){movespan.style.opacity = '1';};
            if(span.innerText != ''){span.style.opacity = '1';};
            crosshairX.attr({
                'x1':ex,
                'x2':ex,
                'y1':60,
                'y2':height+60,
            }).style('opacity','1');
            crosshairY.attr({
                'x1':60,
                'x2':width+60,
                'y1':ey,
                'y2':ey,
            }).style('opacity','1');
        })
        svg.addEventListener('mouseout',()=>{
            movespan.style.opacity = '0';
            crosshairX.style('opacity','0');
            crosshairY.style('opacity','0');
        })
        //#div mouseout
        $('#div').mouseout(function () { 
            span.style.opacity = '0';
        });

        //節點 - movein
        for(var i = 0; i < NodePoint.length ; i++ ){
            NodePoint[i].addEventListener('mouseover',MouseOver);
        }

        //Move function
        function MouseOver(e){
            //找到滑鼠位移到的資料
            let NowDataX = Number(this.__data__.x);
            let NowDataY = Number(this.__data__.y);
            let NowDataZ = this.__data__.z;
            span.style.opacity = '1';
            span.innerHTML = `${NowDataZ}<span style='color:#F86422; padding:0 2px;'>${NowDataX}個月</span>前月均價為<span style='color:#F86422; padding:0 2px;'>${NowDataY}</span>元`;
            movespan.innerText = `${NowDataY}元`;
        }
        
        for(var x = 0; x < rect.length; x++){
            rect[x].addEventListener('mouseover',GiveSpanColorRect);
        }
        for(var y = 0; y < circle.length; y++){
            circle[y].addEventListener('mouseover',GiveSpanColorCircle);
        }

        function GiveSpanColorRect(){
            //找到滑鼠位移到的資料
            let NowDataX = Number(this.__data__.x);
            //找到符合的資料
            let ChooseData = TotalData.filter(function(item){
                return item.x == NowDataX;
            })
            //計算價差  
            let Spread = Number(ChooseData[1].y) - Number(ChooseData[0].y);
            if(Spread > 0){
                span.innerHTML += `，便宜<span style='color:#09c; padding:0 2px;'>${Spread}元</span>呦~`;
            }else if(Spread == 0){
                span.innerHTML += `，該月平盤作收呦~`;
            }else{
                span.innerHTML += `，貴了<span style='color:#c00; padding:0 2px;'>${-Spread}元</span>QQ`;
            }
            movespan.style.backgroundColor = '#09c';
            movespan.style.top = '310px';
        }
        function GiveSpanColorCircle(){
            movespan.style.backgroundColor = '#c00';
            movespan.style.top = '40px';
        }
    });




    //  ///////////////////////////////////////////////

    //analytics - 關閉分析燈箱
    $('#analyticslb_cross').on('click', function () {
        $('.analyticslb_box').removeClass('analytics_shock');
    });

    //zoom-in zoom-out
    if(window.innerWidth >=1024){
        let viewport = document.getElementById('viewport');
        let light_img = document.getElementById('light_img');
        let ratio = 3;
    
        light_img.addEventListener('mouseover',showImg);
        function showImg(e){
            viewport.style.visibility = 'visible';
            $('#zoom_image').show();
            let moveShow = function(e){
                let x = e.clientX - light_img.offsetLeft - lb_card.offsetLeft;
                let y = e.clientY - light_img.offsetTop - lb_card.offsetTop;
                console.log(light_img.offsetLeft,lb_card.offsetLeft)
                let viewportX = x - viewport.offsetWidth/2;
                let viewportY = y - viewport.offsetHeight/2;
    
                if(viewportX < 0){
                    viewportX = 0;
                }else if(viewportX + viewport.offsetWidth > light_img.offsetWidth){
                    viewportX = light_img.offsetWidth - viewport.offsetWidth - 10;
                };
    
                if(viewportY < 0){
                    viewportY = 0;
                }else if(viewportY + viewport.offsetHeight > light_img.offsetHeight){
                    viewportY = light_img.offsetHeight - viewport.offsetHeight - 10;
                };
    
                viewport.style.left = viewportX + 'px';
                viewport.style.top = viewportY + 'px';
    
                //放大鏡移動
                let realX = viewportX * ratio;
                let realY = viewportY * ratio;
                $("#zoom_img").css({
                    'left': `-${realX}px`,
                    'top': `-${realY}px`,
                });
            };
            let endShow = ()=>{
                viewport.style.visibility = 'hidden';
                $('#zoom_image').hide();
                light_img.removeEventListener('mouseout',endShow);
            };
            light_img.addEventListener('mousemove',moveShow);
            light_img.addEventListener('mouseout',endShow)
        }
    }


    //燈箱 - 關閉
    lb_cross.addEventListener('click',()=>{
        light_box.classList.toggle('shock');
        lb_card.classList.toggle('here');
        lb_pic.style.animation = '';
        body[0].style.overflow = 'auto';
    })

    //燈箱 - 點card出現該內容的燈箱
    for(var x = 0; x < bottom.length; x++){
        bottom[x].addEventListener('click',Appear);
    }

    function Appear(){
        light_box.classList.toggle('shock');
        lb_card.classList.toggle('here');
        lb_count = this.dataset.picnum;
        // console.log(lb_count);
        // console.log(`"./pic/fresh/f${lb_count}.jpg"`);
        lb_img.src = `./pic/fresh/f${lb_count}.jpg`;
        zoom_img.src = `./pic/fresh/f${lb_count}.jpg`;
        // console.log(foodname_box[lb_count-1]);
        product_title.innerText = product_name[lb_count-1];
        lb_btn.dataset.cart = lb_count;
        // console.log(lb_btn.dataset.cart);
        body[0].style.overflow = 'hidden';
    }

    
    //收藏愛心
    for(var i = 0 ; i < heart.length; i++){
        heart[i].addEventListener('click',Change1);
    }

    function Change1(){
        // console.log(Number(this.dataset.count));
        if(Number(this.dataset.count) == 0){
            // console.log('YA');
            this.src = './pic/heart_full.svg';
            this.dataset.count = 1;
        }else{
            this.src = './pic/heart.svg';
            this.dataset.count = 0;
        }
        // console.log(this.src);
    }



}