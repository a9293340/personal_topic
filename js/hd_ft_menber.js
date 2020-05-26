window.addEventListener("load", gogopower);

function gogopower(){
    let body = document.getElementsByTagName('body');
    let sign_btn = document.getElementById('sign_btn');
    let menber_head = document.getElementById('menber_head');

    let burger = document.getElementById('burger');
    let burger_lbox = document.getElementById('burger_lbox');
    let hd_black = document.getElementById('hd_black');

    let chat_mark =  document.getElementById('chat_mark');
    let chat = document.getElementById('chat');

    let shopping_btn = document.getElementById('shopping_btn');
    let shopping_cart = document.getElementById('shopping_cart');

    let shopping_close = document.getElementById('shopping_close');

    let shopping_bgc = document.getElementById('shopping_bgc');

    let sc_btn_pic = document.getElementById('sc_btn_pic');
    let sc_btn = document.getElementById('sc_btn');

    let chat_cross = document.getElementById('chat_cross');
    let burger_customer = document.getElementById('burger_customer');

    let chat_input = document.getElementById('chat_input');
    let chat_btn = document.getElementById('chat_btn');
    let chat_message = document.getElementsByClassName('chat_message')[0];
    let customerConversation = [
        '忙線中，請耐心等候',
        '我們會盡快為您服務',
        'B嘴好ㄇ？'
    ];

    let timeout = 0;


    //購物車按鈕
    sc_btn.addEventListener('mouseover',()=>{
        sc_btn_pic.src = './pic/arrow_right_orange.svg';
    })
    sc_btn.addEventListener('mouseout',()=>{
        sc_btn_pic.src = './pic/arrow_right_white.svg';
    })

    //會員登入點擊事件
    sign_btn.addEventListener('click',function(){
        document.getElementById('sign_in_box').classList.toggle('sign_box_display');
        // $('#sign_in_box').slideToggle();
    })

    //firebase member
    let accountBox = []
    //連結到firebase根目錄下的''member資料串上
    let memberRef = firebase.database().ref('member');
    // push remove 推入/刪除資料   child找到ref下面的目錄 
    // memberRef.push({account:'a9293340',password:'aA1234567'});
    // 取出object資料
    memberRef.on('value',(snapshot)=>{
        //取得帳號資訊
        for(var item in snapshot.val()){
            accountBox.push(snapshot.val()[item]);
        }
        //signin Vue
        const sign_inVue = new Vue({
            el: '#sign_in_box',
            data: {
                passwords: '',
                account:'',
                signin_password: '',
                signinCheck: false,
                signin_account:''
            },
            computed: {
                passwordSpanClass(){
                    let accountrun = accountBox.some((item)=>{
                        return item.account == this.account
                    })
                    let passwordrun='';
                    if(accountrun){
                        for(item in accountBox){
                            if(accountBox[item].account == this.account){
                                passwordrun = accountBox[item].password;
                            }
                        }
                    }
                    console.log(passwordrun)
                    if(passwordrun == this.passwords && this.passwords != ''){
                        this.signin_password = '密碼正確';
                        this.signinCheck = true;
                        return "warning warning_green"
                    }else{
                        this.signin_password = '密碼不正確';
                        this.signinCheck = false;
                        return "warning warning_red"
                    }
                },
                accountSpanClass(){
                    let accountrun = accountBox.some((item)=>{
                        return item.account == this.account
                    })
                    if(accountrun){
                        this.signin_account = '帳號正確';
                        return "warning warning_green"
                    }else{
                        this.signin_account = '無此帳號'
                        return "warning warning_red"
                    }
                },
                btnClass(){
                    if(this.signinCheck){
                        return 'signin_submit'
                    }else{
                        return 'signin_submit signin_submit_not'
                    }
                }
            },
            methods: {
                signinClose(){
                    document.getElementById('sign_in_box').classList.toggle('sign_box_display');
                    // $('#sign_in_box').slideToggle();
                },
                signinSubmit(){
                    if(this.signinCheck){
                        // $('#sign_in_box').slideToggle();
                        document.getElementById('sign_in_box').classList.toggle('sign_box_display');
                        sign_btn.style.opacity = 0;
                        menber_head.style.display = 'block';
                        // favorite_btn.style.display = 'block';
                        if(document.getElementById('no_message')){
                            document.getElementById('no_message').style.display = 'none';
                            document.getElementById('my_message').style.display = 'flex';
                        }
                    }
                },
                signinToSignup(){
                    document.getElementById('sign_in_box').classList.toggle('sign_box_display');
                    // $('#sign_in_box').slideToggle();
                    document.getElementById('sign_up_box').classList.toggle('sign_box_display');
                    // setTimeout(() => {
                    //     $('#sign_up_box').slideToggle();
                    // }, 500);
                }
            }
        })
        
        //signup Vue
        const sign_upVue = new Vue({
            el: '#sign_up_box',
            data: {
                signup_passwordfirst: '',
                signup_passwordOne: '',
                signup_passwordsecond: '',
                signup_passwordTwo: '',
                signup_check: false,
                signup_doublecheck: false,
                question: true,
                signup_account:'',
                signup_account_message:'',
            },
            computed: {
                passwordCheckOne(){
                    let score = this.signup_passwordfirst.length;
                    if(/[A-Z].*[A-Z]/.test(this.signup_passwordfirst)) score *= 2;
                    if(/[a-z].*[a-z]/.test(this.signup_passwordfirst)) score *= 2;
                    if(/\d.*\d/.test(this.signup_passwordfirst)) score *= 2;
                    if(/\W+/.test(this.signup_passwordfirst)) score *= 2;
                    // console.log(score);
                    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,}$/.test(this.signup_passwordfirst)){
                        if(score >= 80){
                            this.signup_passwordOne = '密碼強度：強';
                            this.signup_check = true;
                            this.question = true;
                            return "warning warning_green"
                        }else if(score >= 60){
                            this.signup_passwordOne = '密碼強度：中';
                            this.signup_check = true;
                            this.question = true;
                            return "warning warning_orange"
                        }else{
                            this.signup_passwordOne = '密碼強度：弱';
                            this.signup_check = true;
                            this.question = false;
                            return "warning warning_blue"
                        }
                    }else{
                        this.signup_passwordOne = '密碼格式不正確';
                        this.signup_check = false;
                        return "warning warning_red"
                    }
                },
                passwordCheckTwo(){
                    if(!(this.signup_passwordsecond == this.signup_passwordfirst)){
                        this.signup_passwordTwo = '與第一次輸入密碼不符合';
                        this.signup_doublecheck = false;
                        return "warning warning_red"
                    }else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,}$/.test(this.signup_passwordsecond)) && this.signup_passwordsecond == this.signup_passwordfirst){
                        this.signup_passwordTwo = '密碼不正確';
                        this.signup_doublecheck = false;
                        return "warning warning_red"
                    }else{
                        this.signup_passwordTwo = '格式符合';
                        this.signup_doublecheck = true;
                        return "warning warning_green"
                    }
                },
                accountCheck(){
                    let accountrun = accountBox.some((item)=>{
                        return item.account == this.signup_account
                    })
                    if(accountrun){
                        this.signup_account_message = '此帳號已存在'
                        this.signup_check = false;
                        return "warning warning_red"
                    }else if(this.signup_account.length < 5){
                        this.signup_account_message = '帳號至少五碼'
                        this.signup_check = false;
                        return "warning warning_red"
                    }else{
                        this.signup_account_message = '此帳號尚未使用過'
                        this.signup_check = true;
                        return "warning warning_green"
                    }
                },
                btnClass(){
                    if(this.signup_doublecheck && this.signup_check){
                        return 'signup_submit'
                    }else{
                        return 'signup_submit signup_submit_not'
                    }
                },
            },
            methods: {
                signupClose(){
                    document.getElementById('sign_up_box').classList.toggle('sign_box_display');
                    // $('#sign_up_box').slideToggle();
                },
                signupSubmit(){
                    if(this.signup_doublecheck && this.signup_check){
                        if(this.question){
                            // $('#sign_up_box').slideToggle();
                            memberRef.push({account:this.signup_account,password:this.signup_passwordfirst})
                            document.getElementById('sign_up_box').classList.toggle('sign_box_display');
                            sign_btn.style.opacity = 0;
                            menber_head.style.display = 'block';
                            if(document.getElementById('no_message')){
                                document.getElementById('no_message').style.display = 'none';
                                document.getElementById('my_message').style.display = 'flex';
                            }
                        }else{
                            let checkcheck = confirm('密碼強度醬子不好吧');
                            if(checkcheck){
                            memberRef.push({account:this.signup_account,password:this.signup_passwordfirst})
                                $('#sign_up_box').slideToggle();
                                sign_btn.style.opacity = 0;
                                menber_head.style.display = 'block';
                                if(document.getElementById('no_message')){
                                    document.getElementById('no_message').style.display = 'none';
                                    document.getElementById('my_message').style.display = 'flex';
                                }
                            }
                        }
                    }
                }
            }
        })
    })



    //關閉shopping cart(shopping_close)
    shopping_close.addEventListener('click',()=>{
        shopping_cart.classList.toggle('shopping_right');
        shopping_bgc.classList.toggle('shopping_bgc_open');
        // body[0].style.overflow = 'auto';
    })
    //點擊背景關閉shopping cart
    shopping_bgc.addEventListener('click',()=>{
        shopping_cart.classList.toggle('shopping_right');
        shopping_bgc.classList.toggle('shopping_bgc_open');
    })
    //開啟or關閉shopping cart
    shopping_btn.addEventListener('click',(e)=>{
        e.preventDefault();
        // console.log('x');
        shopping_cart.classList.toggle('shopping_right');
        shopping_bgc.classList.toggle('shopping_bgc_open');
        // body[0].style.overflow = 'hidden';
    })

    //漢堡
    burger.addEventListener('click',()=>{
        burger.classList.toggle('to_cross');
        // hd_black.style.position = 'fixed';
        burger_lbox.classList.toggle('burger_lbox_display');
        hd_black.classList.toggle('hd_black_position');
        body[0].classList.toggle('overflow_hd');
    })

    //聊天室-開關
    chat_mark.addEventListener('click',()=>{
        chat.classList.toggle('-open');
    })
    
    //聊天室-關閉
    chat_cross.addEventListener('click',()=>{
        chat.classList.toggle('-display');
    })

    burger_customer.addEventListener('click',(e)=>{
        e.preventDefault();
        burger.classList.toggle('to_cross');
        // hd_black.style.position = 'fixed';
        burger_lbox.classList.toggle('burger_lbox_display');
        chat.classList.toggle('-display');
        body[0].classList.toggle('overflow_hd');
        // console.log('xx');
    })

    $('.chat_input input').focus(function (e) { 
        // e.preventDefault();
        $(this).attr("placeholder", '');
    }).blur(function (e) { 
        // e.preventDefault();
        let ans = $(this).attr('placeholder');
        if(ans == ''){
            $(this).attr('placeholder', '請輸入......');
        }
    });

    chat_btn.addEventListener('click',chatConversation);
    chat_input.addEventListener('keyup',(e)=>{
        if(e.keyCode != 13) return;
        chatConversation();
    })

    function chatConversation(){
        if(!chat_input.value == ''){
            chat_message.innerHTML += `
            <div class="cm_content cm_content_inverse">
                <div class="img">
                    <img src="./pic/rcc_author3.jpg" alt="">
                </div>
                <span class="chat_span" >${chat_input.value}</span>
            </div>
            `

            let randomNum = Math.floor(Math.random()*10);
            if( randomNum >= 2){
                chat_message.innerHTML += `
                <div class="cm_content">
                    <div class="img">
                        <img src="./pic/rcc_author1.jpg" alt="">
                    </div>
                    <span>${customerConversation[randomNum%3]}</span>
                </div>
                `
            }
            chat_message.scrollTop = chat_message.scrollHeight;
            chat_input.value = '';
        }
    }


}



