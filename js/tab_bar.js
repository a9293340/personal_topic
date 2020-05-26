window.addEventListener("load", gogopower);

function gogopower(){
    let tab_bar =  document.getElementById('tab_bar');

    //分頁
    if(window.innerWidth > 1024){
        tab_bar.innerHTML += `
        <div class="left -gg">
            < Pref
        </div>
        `;
        for(var i = 0 ; i < 8 ; i++){
            if(i == 0){
                tab_bar.innerHTML +=`
                    <div class="tab_num -on">${i+1}</div>
                `
            }else{
                tab_bar.innerHTML +=`
                    <div class="tab_num">${i+1}</div>
                `
            }
        };
        tab_bar.innerHTML += `
        <div class="tab_num">...</div>
        <div class="right">
            Next >
        </div>
        `;
    }else{
        if(window.innerWidth <= 1024){
            tab_bar.innerHTML = '';
            tab_bar.innerHTML += `
            <div class="left -gg">
                < Pref
            </div>
            `;
            for(var i = 0 ; i < 5 ; i++){
                if(i == 0){
                    tab_bar.innerHTML +=`
                        <div class="tab_num -on">${i+1}</div>
                    `
                }else{
                    tab_bar.innerHTML +=`
                        <div class="tab_num">${i+1}</div>
                    `
                }
            };
            tab_bar.innerHTML += `
            <div class="tab_num">...</div>
            <div class="right">
                Next >
            </div>
            `;
        }
    };
    window.onresize = ()=>{
        if(window.innerWidth <= 1024){
            tab_bar.innerHTML = '';
            tab_bar.innerHTML += `
            <div class="left -gg">
                < Pref
            </div>
            `;
            for(var i = 0 ; i < 5 ; i++){
                if(i == 0){
                    tab_bar.innerHTML +=`
                        <div class="tab_num -on">${i+1}</div>
                    `
                }else{
                    tab_bar.innerHTML +=`
                        <div class="tab_num">${i+1}</div>
                    `
                }
            };
            tab_bar.innerHTML += `
            <div class="tab_num">...</div>
            <div class="right">
                Next >
            </div>
            `;
        }
    }
}