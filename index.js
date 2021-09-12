
let score=0;
let cross=true;

const gameoversound = new Audio("gameoversound.wav")
const jumpsound = new Audio("jumpsound.wav")
const backgroundsound = new Audio("backgroundmusic.mp3")



// INPUT : "e" is the key
backgroundsound.play();
document.onkeydown = function(e)
{
    console.log("KEY CODE IS: ",e.keyCode); // to get key codes

    if(e.keyCode==38) // key code of up-arrow
    {
        dino=document.querySelector('.dino'); 
        dino.classList.add('animateDino'); // we will add this class in which we will make our dino jump
        setTimeout(() => {
            dino.classList.remove('animateDino'); // after 700 milli sec we again remove this class
        }, 700);
    }

    else if(e.keyCode==39) // key code of right-arrow
    {
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));  // it will give us left(x) position of dino in pixels
        dino.style.left=dinox + 100 + "px";
    }

    else if(e.keyCode==37) // key code of left-arrow
    {
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));  // it will give us left(x) position of dino in pixels
        dino.style.left=dinox - 100 + "px";
    }
}

// CHECK FOR COLLISION

setInterval(() => {

    dino=document.querySelector('.dino');
    gameover=document.querySelector('.gameover');
    obstacle=document.querySelector('.obstacle');
//parseInt for integer value else it would give answer in pixels
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));  // it will give us left(x) position of dino
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));   // it will give us top(y) position of dino

    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left')); // similar as dino
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top')); // similar as dino
    
    offsetx=Math.abs(dx-ox); // offsetx is a variable carry difference b/w the position of x cordinate
    offsetxy=Math.abs(dy-oy); // similarily of y coordinate

    if(offsetx<93 && offsetxy<104)
    {
        gameoversound.play();
        backgroundsound.pause();
        gameover.style.visibility='visible';
        obstacle.classList.remove('obstacleAni');
    }
      //else update score
    else if(offsetx<145 && cross) // basically when offsetx value if 145 , after that they are very near and take 1 sec to cross each other
    {
        
        score+=1;
        updatescore(score);
        cross=false;
        setTimeout(() => {
            jumpsound.play();
            cross=true;
        }, 1000);

// to increase the speed of obstacle 
        setTimeout(() => {
            anidur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));  // float bec we don not want 4.8 to become 4
        newdur= anidur - 0.05;
        obstacle.style.animationDuration=newdur + 's'; // s for seconds
        
        }, 600);
    }

}, 100);

function updatescore(score)
{
    scorecon.innerHTML = "YOUR SCORE: "+ score;
}
