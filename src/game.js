var game = document.getElementById('game');
var player = document.getElementById('player');
var scoreElement = document.getElementById('score');
var score = 0;
var prevScore = 0;
var lose = false;
var eIntervalId;
var sIntervalId;

function createEnemy() {
    var enemy = document.createElement('div');
    var enemy_speed_mult = star_speed_mult = 1;
    enemy.classList.add('enemy');
    enemy.style.left = Math.random() * 350 + 'px';
    game.appendChild(enemy);

    var star = document.createElement('div');
    var star_speed_mult = 1;
    star.classList.add('star');
    star.style.left = Math.random() * 350 + 'px';
    game.appendChild(star);

    var speed = Math.random() * 2 * enemy_speed_mult + 1;
    var starSpeed = Math.random() * 1 * star_speed_mult + 1;

    
    if (score === prevScore + 10){
        enemy_speed_mult += 1;
        flashtext();
        star_speed_mult += 1;
    }
    
    function step() {
        enemy.style.top = (enemy.offsetTop + speed) + 'px';
        star.style.top = (star.offsetTop + starSpeed) + 'px';
        if(!lose){
            if (enemy.offsetTop > game.offsetHeight) {
                enemy.remove();
                score++;
                scoreElement.textContent = score;
            }
            if(star.offsetTop > game.offsetHeight){
                star.remove();
            }
            if (!isColliding(player, enemy)) {
                requestAnimationFrame(step);
            } else {
                lose = true;
            }
        }
    }

    function flashtext() {
        var tmpColCheck = document.getElementById('score_cnt').style.color;
        if (tmpColCheck === 'white') {
            document.getElementById('score_cnt').style.color = 'red';
        } else {
            document.getElementById('score_cnt').style.color = 'white';
        }
    } 
    if(!lose){
        step();
    }else{
        on();
        enemy.remove();
        star.remove();
        return;
    }
}
if(lose){
    clearInterval(eIntervalId);
    clearInterval(sIntervalId);
    eIntervalId = null;
    sIntervalId = null;
}else{
    eIntervalId = setInterval(createEnemy,500);
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function restart(){
    lose=false;
    off();
    window.location.reload();
}
  
function off() {
    document.getElementById("overlay").style.display = "none";
} 

function isColliding(div1, div2) {
    var rect1 = div1.getBoundingClientRect();
    var rect2 = div2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}



window.addEventListener('keydown', function(event) {
    var left = player.offsetLeft;
    var speed = 2;  // Change this value to make the player move faster or slower

    if (event.key === 'ArrowLeft') {
        player.style.left = Math.max(left - speed, 0) + 'px';  // Move left
    } else if (event.key === 'ArrowRight') {
        player.style.left = Math.min(left + speed, game.offsetWidth - player.offsetWidth) + 'px';  // Move right
    }
});
