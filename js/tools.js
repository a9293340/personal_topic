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
    let product_price = [10000,50000,30000,20000,70000,40000,18000,980,2960,1080,490,2000,2400,2700,980,1490];
    let product_name = ['永靈刀', '轉龍壺', '魔聖銅器', '迦樓羅刀' ,'貪狼壺', '靈藏庫', '玉龍鍋', '雙人牌-砧板',
                '雙人牌-鍋組', '雙人牌-鍋鏟組', '雙人牌-耐熱鏟', '雙人牌-切菜刀', '雙人牌-切肉刀', '雙人牌-平底鍋', '雙人牌-廚剪', '雙人牌-湯匙組'   
                ];
    let product_pcs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    let orderRef = firebase.database().ref('order');
    let toolsData = []
    for(var h = 0; h<product_name.length;h++){
        toolsData.push({
            name:product_name[h],
            price:product_price[h],
            pcs:product_pcs[h],
            count:h
        })
    }

    //orderRef
    orderRef.once('value',(snapshot)=>{
        // 抓資料到toolsData
        for(item in snapshot.val()){
            if(snapshot.val()[item].name){
                toolsData[snapshot.val()[item].count].pcs = snapshot.val()[item].pcs
                // console.log(snapshot.val()[item])
            }
        }
        // 購物車球球 顯現or不出現
        if(snapshot.val()){
            ball.style.display = 'block'
            if(window.innerWidth > 768){
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768up')
            }else{
                document.getElementById('shopping_btn').classList.add('shpping_btn_fixed_768down')
            }
        }
        //先render一次
        for(var aa = 0; aa < toolsData.length; aa++){
            if(toolsData[aa].pcs > 0){
                sc_products.innerHTML += `
                <div class="sc_product" id="sc_product${toolsData[aa].count}">
                    <img src="./pic/tools/t${toolsData[aa].count+1}.jpg" alt="">
                    <div class="sc_product_contents">
                        <h3>${toolsData[aa].name}</h3>
                        <span class="nt">NTD${toolsData[aa].price}元</span>
                        <div class="price">
                            <input type="submit" class="count minus" value="-" data-count="${toolsData[aa].count}">
                            <span class="sc_number" id="sc_number${toolsData[aa].count}" >${toolsData[aa].pcs}</span>
                            <span>件</span>
                            <input type="submit" class="count plus" value="+" data-count="${toolsData[aa].count}">
                        </div>
                    </div>
                    <div class="sc_close" data-count="${toolsData[aa].count}">
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
            // 購物按鈕按下之後依照不同視窗大小顯示不同方式
            if(window.innerWidth >= 1024){
                cart_img.src = `./pic/tools/t${lb_btn.dataset.cart}.jpg`;
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
            if(toolsData[product_count].pcs > 0){
                toolsData[product_count].pcs += Number(buy.value);
                orderRef.once('value',(snapshot)=>{
                    for(item in snapshot.val()){
                        if(snapshot.val()[item].name == toolsData[product_count].name){
                            orderRef.child(item).update({pcs:toolsData[product_count].pcs})
                        }
                    }
                })
                document.getElementById(`sc_number${product_count}`).innerText = toolsData[product_count].pcs;
                Calc();
            }else{
                toolsData[product_count].pcs += Number(buy.value);
                sc_products.innerHTML += `
                <div class="sc_product" id="sc_product${toolsData[product_count].count}">
                    <img src="./pic/tools/t${toolsData[product_count].count+1}.jpg" alt="">
                    <div class="sc_product_contents">
                        <h3>${toolsData[product_count].name}</h3>
                        <span class="nt">NTD${toolsData[product_count].price}元</span>
                        <div class="price">
                            <input type="submit" class="count minus" value="-" data-count="${toolsData[product_count].count}">
                            <span class="sc_number" id="sc_number${toolsData[product_count].count}" >${toolsData[product_count].pcs}</span>
                            <span>件</span>
                            <input type="submit" class="count plus" value="+" data-count="${toolsData[product_count].count}">
                        </div>
                    </div>
                    <div class="sc_close" data-count="${toolsData[product_count].count}">
                        <div class="sc_close_line"></div>
                    </div>
                </div>   
                `
                orderRef.push(toolsData[product_count]);
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
            }
            buy.value = 1;
        })
    })

    //關閉函式
    function CloseSC(){
        // console.log(this.dataset.count);
        toolsData[this.dataset.count].pcs = 0 ;
        orderRef.once('value',(snapshot)=>{
            for(item in snapshot.val()){
                if(snapshot.val()[item].name == toolsData[this.dataset.count].name){
                    orderRef.child(item).remove();
                }
            }
        })
        sc_products.removeChild(document.getElementById(`sc_product${Number(this.dataset.count)}`));
        let test_count = 0;
        for(var jj = 0 ; jj < toolsData.length ; jj++){
            test_count += toolsData[jj].pcs;
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
        toolsData[Number(this.dataset.count)].pcs -= 1;
        if(toolsData[Number(this.dataset.count)].pcs <= 0){
            toolsData[Number(this.dataset.count)].pcs = 1;
            alert('最小為1');
        }else{
            orderRef.once('value',(snapshot)=>{
                for(item in snapshot.val()){
                    if(snapshot.val()[item].name == toolsData[Number(this.dataset.count)].name){
                        orderRef.child(item).update({pcs:toolsData[Number(this.dataset.count)].pcs});
                    }
                }
            })
            document.getElementById(`sc_number${Number(this.dataset.count)}`).innerText = toolsData[Number(this.dataset.count)].pcs;
        }
        Calc();
    }
    //加法函式
    function Plus(){
        toolsData[Number(this.dataset.count)].pcs += 1;
        if(toolsData[Number(this.dataset.count)].pcs >= 100){
            toolsData[Number(this.dataset.count)].pcs = 99;
            alert('最大為99');
        }else{
            orderRef.once('value',(snapshot)=>{
                for(item in snapshot.val()){
                    if(snapshot.val()[item].name == toolsData[Number(this.dataset.count)].name){
                        orderRef.child(item).update({pcs:toolsData[Number(this.dataset.count)].pcs});
                    }
                }
            })
            document.getElementById(`sc_number${Number(this.dataset.count)}`).innerText = toolsData[Number(this.dataset.count)].pcs;
        }
        Calc();
    }

    //計算函式
    function Calc(){
        total = 0;
        for(var ss = 0; ss < toolsData.length ; ss++){
            total += toolsData[ss].pcs * toolsData[ss].price;
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

    //創造卡片
    for(var ss = 0 ; ss < product_name.length; ss++){
        cards_content.innerHTML += `
            <div class="card">
                <div class="img">
                    <img src="./pic/tools/t${ss+1}.jpg" alt="">
                </div>
                <div class="title">
                    <h2>${product_name[ss]}</h2>
                    <img src="./pic/heart.svg" alt="" class="heart" data-count="0">
                </div>
                <div class="price">
                    <span>特價</span>
                    <h3 class="english">${product_price[ss]}</h3>
                    <span>元/</span>
                    <span class="english small">100g</span>
                </div>
                <div class="bottom" data-picnum="${ss+1}" >
                    <span>GO!</span>
                </div>
            </div>
        `
        // console.log(product_name[ss]);
    }

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
                // console.log(light_img.offsetLeft,lb_card.offsetLeft)
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
        lb_img.src = `./pic/tools/t${lb_count}.jpg`;
        zoom_img.src = `./pic/tools/t${lb_count}.jpg`;
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