window.addEventListener("load", gogopower);

function gogopower(){
    let span_top = document.getElementsByClassName('span_top');
    let box1 = document.getElementById('box1');
    let box2 = document.getElementById('box2');
    let box3 = document.getElementById('box3');
    let box4 = document.getElementById('box4');

    let member_close = document.getElementById('member_close');
    let member_data = document.getElementById('member_data');
    let set_btn = document.getElementById('set_btn');
    let recipe_btnX = document.getElementById('recipe_btnX');
    let recipe_btnY = document.getElementById('recipe_btnY');
    let recipew_close = document.getElementById('recipew_close');
    let count = 0;
    let rw_step_input = [];
    let havedata=false;
    let totalobject = {
        title:'',
        content:'',
        count:null,
        step:[]
    }

    let recipeRef = firebase.database().ref('recipeWrite');

    recipeRef.once('value',(snapshot)=>{
        box1.classList.remove('box_none');
        box2.classList.remove('box_none');
        box3.classList.remove('box_none');
        box4.classList.remove('box_none');
        if(snapshot.val()){
            box1.classList.add('box_none');
            box2.classList.add('box_none');
            box3.classList.add('box_none');
            havedata = true
            for(item in snapshot.val()){
                totalobject.title = snapshot.val()[item].title;
                totalobject.content = snapshot.val()[item].content;
                totalobject.count = snapshot.val()[item].count;
                totalobject.step = snapshot.val()[item].step;
                count = totalobject.count;
            }
            // console.log(totalobject)
        }else{
            box2.classList.add('box_none');
            box3.classList.add('box_none');
            box4.classList.add('box_none');
            havedata = false
        }

        const gogo_rw = new Vue({
            el: '#recipew_form',
            data: {
                vueRWTitle:totalobject.title,
                vueTitle:'',
                vueContent:totalobject.content,
                vueCount:totalobject.step,
                checkA: false,
                vuehaveData: havedata,
    
            },
            methods: {
                ADDD(){
                    if(this.vueCount.length <= 8){
                        this.vueCount.push('');
                        count++
                        // console.log(this.vueCount)
                    }else{
                        alert('最多只能加入9個步驟')
                    }
                    // console.log(count)
                },
                Minus(){
                    this.vueCount.pop();
                    count--;
                    if(snapshot.val()){
                        for(item in snapshot.val()){
                            recipeRef.child(item).update({count,step:this.vueCount})
                        }
                    }
                    // console.log(minus)
                },
                check(e){
                    e.preventDefault();
                    if(this.checkA){
                        for(var xx = 0; xx<count; xx++){
                            rw_step_input.push(document.getElementsByClassName('rw_step_input')[xx].value)
                        }
                        recipeRef.once('value',(snapshot)=>{
                            if(snapshot.val()){
                                for(item in snapshot.val()){
                                    recipeRef.child(item).update({count,title:this.vueRWTitle,content:this.vueContent,step:rw_step_input})
                                }
                            }else{
                                recipeRef.push({count,title:this.vueRWTitle,content:this.vueContent,step:rw_step_input})
                            }
                            alert('資料已送出');
                            document.getElementById('recipe_write').classList.toggle('-open_member');
                            setTimeout(()=>{
                                window.location.reload();
                            },1000)
        
                        })
                    }else{
                        alert('資料有誤');
                    }
                    // console.log(rw_step_input)
                },
                remove(){
                    alert('確定刪除？')
                    recipeRef.remove();
                },
                dragOver(e){
                    e.preventDefault();
                },
                dropped(e){
                    e.preventDefault();
                    let file = e.dataTransfer.files[0];
                    this.vueRWTitle = file.name;
                    let readFile = new FileReader();
                    readFile.readAsText(file);
                    let content = this.vueContent;
                    readFile.addEventListener('load',()=>{
                        //讀到的內容(readFile.result)
                        this.vueContent = readFile.result;
                    })
                }
            },
            computed:{
                rwSpan(){
                    if(this.vueRWTitle == ''){
                        this.checkA = false
                        this.vueTitle = '標題不得為空'
                        return 'warning warning_red'
                    }else{
                        this.checkA = true
                        this.vueTitle = '';
                        return 'warning'
                    }
                }
            }
        })

        recipew_close.addEventListener('click',()=>{
            document.getElementById('recipe_write').classList.toggle('-open_member');
        })
    
        recipe_btnX.addEventListener('click',()=>{
            if(window.innerWidth > 768){
                document.getElementById('recipe_write').classList.add('-open_member');
            }else{
                alert('請於平板或電腦編輯食譜，不要用手機喔傷眼睛>Q<')
            }
        })
        recipe_btnY.addEventListener('click',()=>{
            if(window.innerWidth > 768){
                document.getElementById('recipe_write').classList.add('-open_member');
            }else{
                alert('請於平板或電腦編輯食譜，不要用手機喔傷眼睛>Q<')
            }
        })
    })

    //打開member
    set_btn.addEventListener('click',()=>{
        member_data.classList.add('-open_member');
    })

    member_close.addEventListener('click',()=>{
        member_data.classList.toggle('-open_member');
    })

    //頁面切換
    for(var i = 1 ; i < span_top.length ; i++){
        span_top[i].addEventListener('click', ChangePage);
    }

    function ChangePage(){
        for(var j = 0 ; j < span_top.length ; j++){
            span_top[j].classList.remove('change_color');
        }
        this.classList.add('change_color');

        box1.classList.remove('box_none');
        box2.classList.remove('box_none');
        box3.classList.remove('box_none');
        box4.classList.remove('box_none');

        if(Number(this.dataset.change) == 0){
            box2.classList.add('box_none');
            box3.classList.add('box_none');
            box4.classList.add('box_none');
        }else if(Number(this.dataset.change) == 1){
            box1.classList.add('box_none');
            box3.classList.add('box_none');
            box4.classList.add('box_none');
        }else{
            box1.classList.add('box_none');
            box2.classList.add('box_none');
            box4.classList.add('box_none');

        }
    }

    span_top[0].addEventListener('click',()=>{
        for(var j = 0 ; j < span_top.length ; j++){
            span_top[j].classList.remove('change_color');
        }
        span_top[0].classList.add('change_color');
        recipeRef.once('value',(snapshot)=>{
            box1.classList.remove('box_none');
            box2.classList.remove('box_none');
            box3.classList.remove('box_none');
            box4.classList.remove('box_none');
            if(snapshot.val()){
                box1.classList.add('box_none');
                box2.classList.add('box_none');
                box3.classList.add('box_none');
            }else{
                box2.classList.add('box_none');
                box3.classList.add('box_none');
                box4.classList.add('box_none');
            }
        })

    })



    const gogo = new Vue({
        el: "#member_data_form",
        data: {
            name: '',
            member_names: '',
            member_id: '',
            member_ids: '',
            sexboy: '',
            sexgirl: '',
            member_sex: '',
            birth: '',
            member_birth: '',
            addres: '',
            member_addres: '',
            cellphone: '',
            member_cellphone: '',
            email: '',
            member_email: '',
            check:false,
        },
        methods: {
            alertopen(e){
                e.preventDefault();
                if(!this.check){alert('表單有誤!'); return }
                let checked = confirm('確認修改?');
                if(checked){
                    alert('已送出!');
                }
            },
        },
        computed: {
            namespanClass(){
                if(this.name.length > 0 && /^[\u4e00-\u9fa5_a-zA-Z]{2,}$/.test(this.name)){
                    this.member_names = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else{
                    this.member_names = '請輸入名稱';
                    this.check =false;
                    return "member_span member_span_red"
                }
            },
            idspanClass(){
                if(/^[A-Za-z][12]\d{8}$/.test(this.member_id)){
                    this.member_ids = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else if(this.member_id.length > 0){
                    this.member_ids = '身分證字號不正確';
                    this.check =false;
                    return "member_span member_span_red"
                }else{
                    this.member_ids = '請輸入您的身分證字號';
                    this.check =false;
                    return "member_span member_span_red"
                }
            },
            sexspanClass(){
                if(this.sexboy || this.sexgirl){
                    this.member_sex = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else{
                    this.member_sex = '請勾選性別';
                    this.check =false;
                    return "member_span member_span_red"
                }
            },
            birthspanClass(){
                if(this.birth.length > 0){
                    this.member_birth = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else{
                    this.member_birth = '請填寫生日日期';
                    this.check =false;
                    return "member_span member_span_red"
                }
            },
            addresspanClass(){
                if(/[!@#$%^&*()_-]/.test(this.addres) || this.addres.length <= 9){
                    this.member_addres = '請填寫正確地址格式';
                    this.check =false;
                    return "member_span member_span_red"
                }else{
                    this.member_addres = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }
            },
            cellphonespanClass(){
                if(/^09\d{2}-?\d{3}-?\d{3}$/.test(this.cellphone)){
                    this.member_cellphone = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else{
                    this.member_cellphone = '請填寫正確手機號碼';
                    this.check =false;
                    return "member_span member_span_red"
                }
            },
            emailspanClass(){
                if(/^([A-Za-z0-9_\-\.])+\@[A-Za-z]{2,6}\.com(\.[A-Za-z]{2,6})?$/.test(this.email)){
                    this.member_email = '輸入正確';
                    this.check =true;
                    return "member_span member_span_green"
                }else{
                    this.member_email = '請填寫正確電子信箱格式';
                    this.check =false;
                    return "member_span member_span_red"
                }
            }
        },
    })



}



