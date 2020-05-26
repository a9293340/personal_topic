window.addEventListener("load", gogopower);

function gogopower(){

    let collect_btn = document.getElementsByClassName('collect_btn');
    let collect_img = document.getElementsByClassName('collect_img');
    let collect_span = document.getElementsByClassName('collect_span');


    //收藏按鈕
    for(var x = 0 ; x < collect_btn.length ; x++){

        collect_btn[x].addEventListener("click",Collect_active);
    }

    function Collect_active(){
        // console.log(parseInt(this.dataset.num));
        if(Number(this.dataset.count) == 0){
            collect_img[parseInt(this.dataset.num)].src = './pic/collect_orange.svg';
            collect_span[parseInt(this.dataset.num)].style.color = '#F86422';
            this.dataset.count = 1;
        }else{
            collect_img[parseInt(this.dataset.num)].src = './pic/collect.svg';
            collect_span[parseInt(this.dataset.num)].style.color = '#2A2A2A';
            this.dataset.count = 0;
        }
    }




}