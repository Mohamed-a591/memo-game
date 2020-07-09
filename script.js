var name;
var iconNames = [
  "fa-js-square",
  "fa-github",
  "fa-facebook",
  "fa-html5",
  "fa-css3",
  "fa-linkedin",
  "fa-vuejs",
  "fa-twitter",
  "fa-react",
  "fa-angular",
];

for(let i=0 ;i<2 ;i++){
    iconNames.map((ico)=>{
        let gameblock  = document.createElement("div"),
            blockBack  = document.createElement("div"),
            blockFront = document.createElement("div"),
            icon       = document.createElement("i"),
            iconFront  = document.createElement("i"),
            gameBlocks = document.querySelector(".game-blocks");
                
        icon.className = "fab fa-5x " +ico;
        
        blockBack.appendChild(icon);
        blockBack.className="face back d-inline-block";
        gameblock.appendChild(blockBack);
        
        iconFront.className = "fa fa-question fa-5x text-danger";

        blockFront.appendChild(iconFront);
        blockFront.className="face front d-inline-block ";
        gameblock.appendChild(blockFront);
        gameblock.className="game-block ";
        gameblock.setAttribute('id',ico);

        gameBlocks.appendChild(gameblock);
    });
};
    
var gameblocksSelect = document.querySelector(".game-blocks"),
    spanControl      = document.querySelector(".control span"),
    userName         = document.querySelector(".name span"),
    controldiv       = document.querySelector(".control"),
    backblock        = document.querySelectorAll(".game-block .back");


function start(){
    for(let i=0 ; i<backblock.length ; i++){
            backblock[i].classList.add("rotateY");
    }
    
}
   
    
spanControl.onclick = function(){
    name = prompt("enter your name: ");
    (name==null || name=="") ?(userName.innerHTML="unknown user",name="unknown user"):(userName.innerHTML=name)
    controldiv.remove();
    start();
}

// we can use the defferent way of this operator Array(...gameblocksSelect.children) or use Array.from(gameblocksSelect.children)
let blocks = Array.from(gameblocksSelect.children);
let orderRange = [...Array(blocks.length).keys()];

// console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);


blocks.forEach((block , index)=>{

    block.style.order = orderRange[index];

    block.addEventListener('click',function(){
        flip(block);
    })
})


function shuffle(array) {

        // Settings Vars
        let current = array.length,
            temp,
            random;
      
        while (current > 0) {
      
          // Get Random Number
          random = Math.floor(Math.random() * current);
      
          // Decrease Length By One
          current--;
          // [1] Save Current Element in Stash
            temp = array[current];

            // [2] Current Element = Random Element
            array[current] = array[random];

            // [3] Random Element = Get Element From Stash
            array[random] = temp;

        }

        return array;

}

function flip(selectedblock){

    selectedblock.classList.add("isflip");

    //select isflip
    let fliped = blocks.filter( flipedblock => flipedblock.classList.contains('isflip'));
    
    
    //calcolat number of fliped blocks
    if(fliped.length === 2){
        console.log("check");

        //stop clicking
        stopClicking();

        //checked blocks
        checkTowblock(fliped[0],fliped[1]);
    }
    
    
}


function stopClicking(){
    gameblocksSelect.classList.add("no-clicking");

    setTimeout(()=>{
        gameblocksSelect.classList.remove("no-clicking");
    },1000)
}

function checkTowblock(frist,second){
    let tries = document.querySelector(".tries span");

    if(frist.id == second.id){
        frist.classList.remove("isflip");
        second.classList.remove("isflip");

        frist.classList.add("has-match");
        second.classList.add("has-match");

        

    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        console.log(name + tries.innerHTML);
        setTimeout(()=>{
            frist.classList.remove("isflip");
            second.classList.remove("isflip");
        },1000);
        
    }

    if(tries.innerHTML > 7){
        tries.innerHTML = 0;
        trayAgain();
    }

    let match = blocks.filter( flipedblock => flipedblock.classList.contains('has-match'));
        if(match.length === 20){
            localStorage.setItem(name , tries.innerHTML);
            goodGame();    
        }
}

function goodGame(){
    let maindiv = document.createElement("div"),
        span    = document.createElement("span"),
        text    = document.createTextNode("Good Game");
    span.appendChild(text);
    maindiv.appendChild(span);
    maindiv.className = "good-game";
    document.body.appendChild(maindiv);
}

function trayAgain(){
    let maindiv = document.createElement("div"),
        span    = document.createElement("span"),
        text    = document.createTextNode("Tray Again");
    
    span.appendChild(text);
    maindiv.appendChild(span);
    maindiv.className = "tray-again";
    document.body.appendChild(maindiv);
}

document.addEventListener('click',function(e){
    if(e.target.parentNode.classList.contains("tray-again")){
        window.location.reload();
    }
})

    
//local storage for players

if(localStorage.length){
    for(let [key,value] of Object.entries(localStorage)){

        let playerscontainer = document.querySelector(".playerscontainer"),
            playerRow        = document.createElement("tr"),
            tdplayername     = document.createElement("td"),
            tdplayertrairs   = document.createElement("td"),
            playerName       = document.createTextNode(key),
            playerTraiers    = document.createTextNode(value);
        
    tdplayername.appendChild(playerName);
    playerRow.appendChild(tdplayername);
    tdplayertrairs.appendChild(playerTraiers);
    playerRow.appendChild(tdplayertrairs);

    playerscontainer.appendChild(playerRow);   
    }
}

