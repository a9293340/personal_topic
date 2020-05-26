window.addEventListener("load", gogopower);

function gogopower(){

    let big_pic = document.getElementById('big_pic');
    let pic_img = document.getElementsByClassName('pic_img');
    
    let collectbtn = document.getElementById('collectbtn');
    let collect_word = document.getElementById('collect_word');
    let collect = document.getElementById('collect');
    let collect_count = 0;

    let message_btn = document.getElementById('message_btn');
    let text = document.getElementById('text');
    let message_box = document.getElementById('message_box');
    let no_message_btn = document.getElementById('no_message_btn');


    let recipeChat = firebase.database().ref('recipeChat');
    
    //登入切換
    no_message_btn.addEventListener('click',()=>{
        document.getElementById('sign_in_box').classList.toggle('sign_box_display');
    })


    //留言日期
    const now = new Date();
    const m = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const month = m[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const hr = now.getHours();

    message_btn.addEventListener('click',()=>{
        // console.log(month,day,year);
        recipeChat.push({
            message:text.value,
            month,
            day,
            year,
            hr
        });
        // console.log(messageBox)
        text.value = '';
    })
    recipeChat.on('value',(snapshot)=>{
        message_box.innerHTML = ''
        message_box.innerHTML += `
        <div class="main_message">
            <img src="./pic/rcc_author4.jpg" alt="">
                <div class="message_words">
                    <div class="author_name">史帝芬周</div>
                    <div class="words">
                        <span>想問一下，會爆嗎?</span>
                    </div>
                    <div class="time">
                        2020年1月16日7時
                    </div>
                </div>
            <div class="words_line"></div>
        </div>
        `
        for(item in snapshot.val()){
            let data = snapshot.val();
            message_box.innerHTML += `
            <div class="main_message">
                <img src="./pic/rcc_author3.jpg" alt="">
                <div class="message_words">
                    <div class="author_name">小方塊</div>
                    <div class="words">
                        <span>${data[item].message}</span>
                    </div>
                    <div class="time">
                        ${data[item].year}年${data[item].month}月${data[item].day}日${data[item].hr}時
                    </div>
                </div>
                <div class="words_line"></div>
            </div>       
            `
        }
    })

    //收藏按鈕 - 切換
    collectbtn.addEventListener('click',()=>{
        if(collect_count === 0){
            collect_word.style.color = '#F86422';
            collect.src = './pic/collect_orange.svg';
            collect_count = 1;
        }else{
            collect_word.style.color = 'black';
            collect.src = './pic/collect.svg';
            collect_count = 0;
        }

    })

    //食譜內頁 - 照片牆

    for(var i = 0 ; i < pic_img.length ; i++){
        pic_img[i].addEventListener('click',Change_pic);
    }

    function Change_pic(){
        for(var j = 0 ; j < pic_img.length ; j++){
            pic_img[j].classList.remove('border_orange');
        }
        this.classList.add('border_orange');
        big_pic.src = this.src;
    }


}