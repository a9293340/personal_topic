window.addEventListener("load", gogopower);

function gogopower(){


    let card = document.getElementsByClassName('card');



    //熱門食譜切換
    for(i = 0; i<card.length; i++){
        card[i].addEventListener('click',ChangeCard);
    }

    function ChangeCard(){
        console.log(this);
        for(j = 0; j<card.length; j++){
            card[j].classList.remove('card_top');
            card[j].style.zIndex = '1';
        }
        this.classList.toggle('card_top');
        this.style.zIndex = '2';
    }

}