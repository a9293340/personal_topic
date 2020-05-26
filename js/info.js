window.addEventListener("load", gogopower);

function gogopower(){
    let body = document.getElementsByTagName('body');

    let info_main = document.getElementsByClassName('info_main');
    let light_box = document.getElementById('light_box');
    let lb_card = document.getElementById('lb_card');
    let lb_cross = document.getElementById('lb_cross');

    let titleY = document.getElementById('titleY');
    let titleX = document.getElementsByClassName('titleX');

    let picture = [
        ['./pic/info/i3.png','./pic/info/i3-1.jpeg'],
        ['./pic/info/i2.png','./pic/info/i2-1.jpeg'],
        ['./pic/info/i4.png','./pic/info/i6-1.png'],
        ['./pic/info/i5.png','./pic/info/i4-1.png'],
        ['./pic/info/i6.png','./pic/info/i5-1.png'],
        ['./pic/info/i7.png','./pic/info/i7-1.png'],
        ['./pic/info/i8.png','./pic/info/i8-1.jpeg'],
        ['./pic/info/i9.png','./pic/info/i9-1.jpeg']
    ]
    let lb_pic1 = document.getElementById('lb_pic1');
    let lb_pic2 = document.getElementById('lb_pic2');
    let lb_span = document.getElementsByClassName('lb_span');

    let span = [
        ['被視為一種健康飲品的南非國寶茶，源自於非洲南部，但現今在多個國家也都可以買到，味道有些特別的南非國寶茶因為不含咖啡因，所以不會影響睡眠，很適合用來取代咖啡等咖啡因含量較高的飲品，更棒的是南非國寶茶還含有多種營養成份，被科學家認為對人體有許多益處，待會就要大家分享是哪些益處，但首先要來認識一下南非國寶茶。','此外，飲用南非國寶茶還可以幫助抑制「血管收縮素轉化酶」，這種轉化酶會讓血管收縮並讓血壓上升，抑制它的話就可以幫助預防血管強烈收縮，進而達到降血壓的效果。南非國寶茶還能幫助減少壞膽固醇，在其中一個相關的研究中，先請醫師評估並挑選較容易在未來得到心臟疾病的男性做為實驗者，然後讓實驗者每日飲用 6 杯南非國寶茶，6 個星期後發現大多數實驗者的壞膽固醇（低密度脂蛋白）都明顯減少了，好膽固醇（高密度脂蛋白）也增加了，因此科學家認為南非國寶茶可以幫助預防心臟相關疾病，例如心肌梗塞或中風等等。'],
        ['每天三餐要如何掌握攝取均衡的營養呢？依據國民健康署公布的每日飲食指南，建議每天應攝取的六大類食物，包含全穀雜糧、豆魚肉蛋、蔬菜、水果、乳品以及堅果種子等，並透過「我的餐盤」的圖像呈現每餐的食用比例。本期愛料理主題菜單，幫大家精選超多健康食材，教你如何搭配每餐營養，一起來做屬於你的餐盤吧！趕快跟著愛料理看下去吧～','國民健康署，最新每日飲食指南建議，每天早晚一杯奶，每餐水果拳頭大，菜比水果多一點，飯跟蔬菜一樣多，豆魚蛋肉一掌心，堅果種子一茶匙。'],
        ['講到「味覺的感動」 東京健康麵包，就得提到這家麵包店的兩位靈魂人物，一位是以獨門作法烘焙出「世界不存在的麵包」的職人——志賀勝榮，老師是第一位使用複數自家培養天然酵母種的麵包主廚，也因此在烘焙圈有著「日本天然酵母麵包大師」的稱號。','另外一位則是遠赴日本東京藍帶學校學習、並以前三名優異之姿畢業，爾後於志賀老師麾下學習「志賀流」烘焙技法的弟子——謝佳陵 LISA 主廚，同時精於法式甜點與法式料理的她，延續志賀老師對酵母與麵包的堅持，將這樣的美味，帶到了台灣。'],
        ['近日 LINE 瘋傳一則資訊，說明「有人吃了韓產金針菇竟致死」，事實上確實有「韓製金針菇外銷美國，李斯特菌污染被召回」、「30 例住院、4 人死亡」的新聞。而美國疾病管制中心（CDC）也發佈了安全警示，帶有綠色標籤塑膠包裝的南韓金針菇已被全數召回','根據美國食品和藥物管理局（FDA）的資料，Guan’s Mushroom Co. 和 Sun Hong Foods, Inc. 這兩間公司的產品已經被召回。美國疾病管制中心（CDC）也已發布李斯特菌污染的金針菇安全警報，並呼籲國人切勿食用或銷售這些有問題的金針菇。'],
        ['起司類型百百種，其中有一種叫做 Labneh，被認為是源自於中東的一種新鮮軟起司，主要是以優格製成，口感吃起來有點像奶油起司，但是脂肪含量與熱量約是一般奶油起司的一半，雖然 Labneh 軟起司在傳統上是以牛奶優格製成，不過也有素食者會用椰奶或豆漿來製作喔！','Labneh 起司在中東等地很普遍，只要在超市就買得到，有些中東以外的國家也有在販售，那沒有販售 Labneh 起司的地區難道就吃不到了嗎？其實自己做不但很簡單，材料費也不貴，現在就跟著我們一起來做 Labneh 起司吧！'],
        ['想忘記時，就來吃點好吃的吧！」美食至上！心情不好時，吃著美味的料理，是否能讓你忘掉不開心的事，悄悄躲入美食的避風港中？日劇《忘卻的幸子》「忘却のサチコ」把品嚐料理時帶來的療癒力，表現得生動到位，讓你也只在乎當下的美味！','「吃好吃的美食＝忘記俊吾」，為此劇下了極佳的註解！美食能讓你遺忘傷心、忘記紛擾你平靜心情的人事物，至少在《忘卻的幸子》裡就成功辦到！日劇《忘卻的幸子》改編自阿部潤的漫畫，擔任出版社文學編輯的佐佐木幸子（高畑充希飾）。'],
        ['清明返鄉祭祖、掃墓在習俗上是僅次於過年的重要時節，台灣掃墓多半依傳統禮節，於國定民族掃墓節前後相約進行，其實心誠則靈，祭祀的時間並無特別規定。清明掃墓拜拜所擺放的食物多為冷食為主，究竟要準備什麼供品是必備的呢？','在清明節拜拜時常有剝去蛋殼丟在祖先的墳上、再把蛋吃掉的習俗，這是因為「殼」象徵著不好的習慣或東西，把殼剝去、只留下有用的身體，代表著子孫能夠擺脫過往的陋習，未來的日子也會過得更好。在祭墳時脫殼，丟到祖先墳上，有著象徵著擺脫過往不好習慣的意思。'],
        ['想要保持健康的飲食，食物的挑選就很重要，而根莖類蔬菜就是經常會出現在健康飲食中的一種食物類型，這些大多都生長在土裡的根莖類食物，例如紅蘿蔔、地瓜、薑、洋蔥等等，都富含多種對人體有益的營養素，但究竟哪些根莖類蔬菜的營養價值最高呢？今天就要請科學家來解答！','洋蔥在料理界是很受歡迎的根莖類蔬菜，它可以跟各式各樣的料理做搭配，能幫助料理增加甜味，而且洋蔥對人體很有益，它含有豐富的膳食纖維、維生素C，以及能夠幫助細胞對抗氧化壓力的槲皮素等抗氧化成份，還可以幫助預防某些疾病。']
    ]

    lb_cross.addEventListener('click',()=>{
        light_box.classList.toggle('shock');
        lb_card.classList.toggle('here');
        body[0].style.overflow = 'auto';
    })

    for(var i = 0 ; i < info_main.length; i++){
        info_main[i].addEventListener('click',LightBox);
    }

    function LightBox(){
        // console.log(this);
        light_box.classList.toggle('shock');
        lb_card.classList.toggle('here');
        titleY.innerText = titleX[Number(this.dataset.count)].innerText;
        lb_pic1.src = picture[Number(this.dataset.count)][0];
        lb_pic2.src = picture[Number(this.dataset.count)][1];
        lb_span[0].innerText = span[Number(this.dataset.count)][0];
        lb_span[1].innerText = span[Number(this.dataset.count)][1];
        body[0].style.overflow = 'hidden';
        // console.log(picture[Number(this.dataset.count)][1]);
    }


}