window.addEventListener("load", gogopower);

//coockie
let welcome = document.getElementsByClassName('welcome')[0];
function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}

function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }
    return value;
}

if(getCookieByName('test2') === 'gogopowers'){
    welcome.style.display = 'none';
}else{
    document.cookie = 'test2=gogopowers;max-age=200;'
}
//coockie

function gogopower(){

    let banner_img = document.getElementsByClassName('banner_img');
    let banner_count = 0;

    let rw1 = document.getElementById('rw1');
    let rwb2 = document.getElementById('rwb2');
    let rw2 = document.getElementById('rw2');
    let rwb3 = document.getElementById('rwb3');
    let rw3 = document.getElementById('rw3');
    let rc1 = document.getElementById('rc1');
    let rc2 = document.getElementById('rc2');
    let rc3 = document.getElementById('rc3');

    let collect_btn = document.getElementById('collect_btn');
    let collect_img = document.getElementById('collect_img');
    let collect_span = document.getElementById('collect_span');


    let next_left = document.getElementById('next_left');
    let next_right = document.getElementById('next_right');
    let salebox1 = document.getElementById('salebox1');
    let salebox2 = document.getElementById('salebox2');
    let salebox3 = document.getElementById('salebox3');
    let salebox4 = document.getElementById('salebox4');
    let salebox5 = document.getElementById('salebox5');
    let salebox6 = document.getElementById('salebox6');
    let salebox7 = document.getElementById('salebox7');
    let salebox8 = document.getElementById('salebox8');

    let left_img = document.getElementById('left_img');
    let right_img = document.getElementById('right_img');




    $('.arrow').click(function (e) { 
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.header').offset().top
        },800)
        $('.arrow').css("display", 'none');
    });

    var controller = new ScrollMagic.Controller();
    if(window.innerWidth > 1200){
        //設定動畫
        var tweenscroll = TweenMax.to('.header',2,{
            position: 'fixed',
            
        })
        new ScrollMagic.Scene({
            //觸發點
            triggerElement: '#keypoint',
            //調整觸發位置(預設為0) 
            offset: 0,
            //碰觸點位置(預設為卷軸一半位置0.5) 小則往上 大則往下
            triggerHook: 0,
            reverse: false,
        })
        //設定觸發哪個動畫
        .setTween(tweenscroll)
        .addTo(controller);
    }

    //skrillr
    if(window.innerWidth >= 1200){
        let s = skrollr.init({
            forceHeight:false
        });
    }

    // banner
    function bannerGo(){
        let timego = setInterval(()=>{
            if(banner_count > 1){
                banner_count = 0;
            }else{
                banner_count++;
            }
            for(i = 0 ; i < banner_img.length ; i++){
                banner_img[i].classList.add('banner_gone');
            }
            banner_img[banner_count].classList.toggle('banner_gone');
            // console.log(banner_count);
        },4800);
    }
    bannerGo();


    //歡迎 
    anime.timeline({loop: true})
        .add({
            targets: '.ml5 .line',
            opacity: [0.5,1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 700
        }).add({
            targets: '.ml5 .line',
            duration: 600,
            easing: "easeOutExpo",
            translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
        }).add({
            targets: '.ml5 .ampersand',
            opacity: [0,1],
            scaleY: [0.5, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=600'
        }).add({
            targets: '.ml5 .letters-left',
            opacity: [0,1],
            translateX: ["0.5em", 0],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=300'
        }).add({
            targets: '.ml5 .letters-right',
            opacity: [0,1],
            translateX: ["-0.5em", 0],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=600'
        }).add({
            targets: '.ml5',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

    //熱門商品 - 菜單架
    if(window.innerWidth >= 768){
        next_left.addEventListener('click',GoLeft);
        function GoLeft(){
            salebox1.style.transform = 'translate(-440%,65%)';
            salebox2.style.transform = 'translate(-440%,65%)';
            salebox3.style.transform = 'translate(-440%,65%)';
            salebox4.style.transform = 'translate(-440%,65%)';
            salebox5.style.transform = 'translate(-10%,10%)';
            salebox6.style.transform = 'translate(90%,-3%)';
            salebox7.style.transform = 'translate(180%,-17%)';
            salebox8.style.transform = 'translate(270%,-28%)';
    
    
            next_left.style.cursor = 'not-allowed';
            next_left.style.animation = 'none 10000s infinite';
            left_img.src = './pic/sales_next_grey.svg';
    
            next_right.style.cursor = 'pointer';
            next_right.style.animation = 'sales_next_run2 .7s infinite';
            right_img.src = './pic/sales_next_right.svg'
    
            next_left.removeEventListener('click',GoLeft);
            next_right.addEventListener('click',GoRight);
        }
    
        function GoRight(){
            salebox1.style.transform = 'translate(-10%,10%)';
            salebox2.style.transform = 'translate(90%,-3%)';
            salebox3.style.transform = 'translate(180%,-17%)';
            salebox4.style.transform = 'translate(270%,-28%)';
            salebox5.style.transform = 'translate(800%,-98%)';
            salebox6.style.transform = 'translate(800%,-98%)';
            salebox7.style.transform = 'translate(800%,-98%)';
            salebox8.style.transform = 'translate(800%,-98%)';
    
            next_right.style.cursor = 'not-allowed';
            next_right.style.animation = 'none 10000s infinite';
            right_img.src = './pic/sales_next_grey_right.svg';
    
            next_left.style.cursor = 'pointer';
            next_left.style.animation = 'sales_next_run .7s infinite';
            left_img.src = './pic/sales_next.svg';
    
            next_left.addEventListener('click',GoLeft);
            next_right.removeEventListener('click',GoRight);
        }
        salebox1.addEventListener('mouseover',()=>{
            salebox1.style.transform = 'rotate(6deg) translate(-10%,10%)';
        })
        salebox1.addEventListener("mouseout",()=>{
            salebox1.style.transform = 'translate(-10%,10%)';
        })

        salebox2.addEventListener('mouseover',()=>{
            salebox2.style.transform = 'translate(90%,-3%) rotate(6deg)';
        })
        salebox2.addEventListener("mouseout",()=>{
            salebox2.style.transform = 'translate(90%,-3%)';
        })

        salebox3.addEventListener('mouseover',()=>{
            salebox3.style.transform = 'translate(180%,-17%) rotate(6deg)';
        })
        salebox3.addEventListener("mouseout",()=>{
            salebox3.style.transform = 'translate(180%,-17%)';
        })

        salebox4.addEventListener('mouseover',()=>{
            salebox4.style.transform = 'translate(270%,-28%) rotate(6deg)';
        })
        salebox4.addEventListener("mouseout",()=>{
            salebox4.style.transform = 'translate(270%,-28%)';
        })

        salebox5.addEventListener('mouseover',()=>{
            salebox5.style.transform = 'translate(-10%,10%) rotate(6deg)';
        })
        salebox5.addEventListener("mouseout",()=>{
            salebox5.style.transform = 'translate(-10%,10%)';
        })

        salebox6.addEventListener('mouseover',()=>{
            salebox6.style.transform = 'translate(90%,-3%) rotate(6deg)';
        })
        salebox6.addEventListener("mouseout",()=>{
            salebox6.style.transform = 'translate(90%,-3%)';
        })

        salebox7.addEventListener('mouseover',()=>{
            salebox7.style.transform = 'translate(180%,-17%) rotate(6deg)';
        })
        salebox7.addEventListener("mouseout",()=>{
            salebox7.style.transform = 'translate(180%,-17%)';
        })

        salebox8.addEventListener('mouseover',()=>{
            salebox8.style.transform = 'translate(270%,-28%) rotate(6deg)';
        })
        salebox8.addEventListener("mouseout",()=>{
            salebox8.style.transform = 'translate(270%,-28%)';
        })
    }
    





    
    //熱門食譜 - 收藏鈕
    collect_btn.addEventListener('click',()=>{
        collect_img.src = './pic/collect_orange.svg';
        collect_btn.style.color = '#F86422';
        collect_span.innerText = '已收藏';
    })

    //熱門食譜 - 置換
    rwb2.addEventListener("click",()=>{
        let rw1_now = rw1.src;
        let rw2_now = rw2.src;
        // console.log(rw1_now,rw2_now)
        rw1.src = rw2_now;
        rw2.src = rw1_now;
        let count = Number(rw2_now.substr(rw2_now.length-5,1));
        console.log(count);
        if(count === 1){
            rc1.style.display = 'block';
            rc2.style.display = 'none';
            rc3.style.display = 'none';
        }else if(count === 2){
            rc2.style.display = 'block';
            rc1.style.display = 'none';
            rc3.style.display = 'none';
        }else{
            rc3.style.display = 'block';
            rc1.style.display = 'none';
            rc2.style.display = 'none';
        }
    })
    rwb3.addEventListener("click",()=>{
        let rw1_now = rw1.src;
        let rw3_now = rw3.src;
        // console.log(rw1_now,rw2_now)
        rw1.src = rw3_now;
        rw3.src = rw1_now;
        let count = Number(rw3_now.substr(rw3_now.length-5,1));
        if(count === 1){
            rc1.style.display = 'block';
            rc2.style.display = 'none';
            rc3.style.display = 'none';
        }else if(count === 2){
            rc2.style.display = 'block';
            rc1.style.display = 'none';
            rc3.style.display = 'none';
        }else{
            rc3.style.display = 'block';
            rc1.style.display = 'none';
            rc2.style.display = 'none';
        }
    })





}



