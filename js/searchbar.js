window.addEventListener("load", gogopower);

function gogopower(){

    let all_extend = document.getElementById('all_extend');
    let sb_content1 = document.getElementById('sb_content1');
    let chose_extend =document.getElementById('chose_extend');
    let sb_content2 = document.getElementById('sb_content2');


    const vm = new Vue({
        el: '#app',
        data: {
            text: '',
        },
        computed: {
            btnClass(){
                return {
                    submit: true,
                    disable: this.text.length === 0,
                }
            }
        },
    })
    //搜尋列 - 開關
    all_extend.addEventListener("click",()=>{
        if(all_extend.innerText == '+'){
            all_extend.innerText = '-';
            all_extend.style.fontSize = '40px';
            sb_content1.style.height = '160px';
        }else{
            all_extend.innerText = '+';
            all_extend.style.fontSize = '30px';
            sb_content1.style.height = '0';
        }
    })

    chose_extend.addEventListener("click",()=>{
        if(chose_extend.innerText == '+'){
            chose_extend.innerText = '-';
            chose_extend.style.fontSize = '40px';
            sb_content2.style.height = '200px';
        }else{
            chose_extend.innerText = '+';
            chose_extend.style.fontSize = '30px';
            sb_content2.style.height = '0';
        }
    })
    



}