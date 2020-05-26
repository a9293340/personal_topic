window.addEventListener("load", gogopower);

function gogopower(){


    let about_btn = document.getElementsByClassName('about_btn');
    let answer_box = document.getElementsByClassName('answer_box');
    let time_num = document.getElementsByClassName('time_num');
    let circle = document.getElementsByClassName('circle');
    let time_article = document.getElementsByClassName('time_article');



    // swiper 幻燈片練習
    var mySwiper = new Swiper ( ".swiper-container", {
        direction : 'vertical',
        loop: true,
        speed: 500,
        parallax: true,
        autoplay: true,
    })

    //公司沿革 - 顯現消失
    for(var c = 0; c < circle.length ; c++){
        circle[c].addEventListener('click', TimeLine);
    }
    function TimeLine(){
        // console.log(this.dataset.circle);
        for(var v = 0; v < time_article.length ; v++){
            time_article[v].classList.add('article_none');
        };
        for(var y = 0; y < circle.length ; y++){
            circle[y].classList.remove('circle_orange');
        }
        time_article[Number(this.dataset.circle)].classList.toggle('article_none');
        this.classList.toggle('circle_orange');
        for(var s = 0; s < time_num.length ; s++){
            time_num[s].classList.remove('big_span');
        }
        time_num[Number(this.dataset.circle)].classList.add('big_span');
    }




    // 上選單選擇 - 顯現消失
    for(var i = 0; i < about_btn.length ; i++){
        // console.log(i);
        about_btn[i].addEventListener('click', GoTitle);
    };

    function GoTitle(){
        // console.log(this);
        // console.log(this.dataset.run);
        for(var j = 0; j < answer_box.length ; j++){
            answer_box[j].classList.add('here');
        };

        answer_box[Number(this.dataset.run)].classList.toggle('here');
        for(var k = 0; k < about_btn.length ; k++){
            about_btn[k].classList.remove('orange');
        }
        this.classList.toggle('orange');
    }

 

  


}



