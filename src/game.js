var game = document.getElementById('game');
var player = document.getElementById('player');
var scoreElement = document.getElementById('score');
var levelElement = document.getElementById('level-text');
var level = 1;
var score = 0;
var speed = 0;
var prevScore = 0;
var lose = false;
var eIntervalId;
var sIntervalId;
var spawn = 1000;
var player_speed = 2.5;

function createEnemy() {
    var enemy = document.createElement('div');
    var enemy_speed_mult = star_speed_mult = 1;
    enemy.classList.add('enemy');
    game.appendChild(enemy);

    var star = document.createElement('div');
    var star_speed_mult = 1;
    star.classList.add('star');
    star.style.left = Math.random() * 350 + 'px';
    game.appendChild(star);
  
    // Varying size based on the current score
    var enemySize = (Math.random() * 20) + 25; // Adjust the size range as needed
    enemy.style.width = enemySize + 'px';
    enemy.style.height = enemySize + 'px';

    // Varying speed based on the current score 
    var enemyLeft = Math.random() * (game.offsetWidth - enemySize);
    enemy.style.left = enemyLeft + 'px';
    
    function step() {
        var speed = Math.random() * 2 * enemy_speed_mult + 1;
        var starSpeed = Math.random() * 1 * star_speed_mult + 1;
        enemy.style.top = (enemy.offsetTop + speed) + 'px';
        star.style.top = (star.offsetTop + starSpeed) + 'px';
        if(!lose){
            if(star.offsetTop > game.offsetHeight){
                star.remove();
            }
            if (enemy.offsetTop > game.offsetHeight) {
                enemy.remove();
                score++;
                scoreElement.textContent = score;
            }
            if (!isColliding(player, enemy)) {
                requestAnimationFrame(step);
            } else {
                lose = true;
            }
        }
        if (score >= prevScore + 15)
            {
                prevScore = score;
                level++;
                levelElement.textContent = "LEVEL: " + level;
                enemy_speed_mult += 8;
                star_speed_mult += 2;
                clearInterval(eIntervalId);
                eIntervalId = null;
                eIntervalId = setInterval(createEnemy,spawn - 25 * (level -1));
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
    eIntervalId = setInterval(createEnemy,spawn);
}

function on() {
    document.getElementById('modal-level-value').textContent = level;
    document.getElementById('modal-score').textContent = score;
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

    var left = player.offsetLeft; // Change this value to make the player move faster or slower

    if (event.key === 'ArrowLeft') {
        player.style.left = Math.max(left - player_speed, 0) + 'px';  // Move left
    } else if (event.key === 'ArrowRight') {
        player.style.left = Math.min(left + player_speed, game.offsetWidth - player.offsetWidth) + 'px';  // Move right
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        speed = 0;  // Stop moving when key is released
    }
});

function animate() {
    var left = player.offsetLeft;
    player.style.left = Math.max(Math.min(left + speed, game.offsetWidth - player.offsetWidth), 0) + 'px';
    requestAnimationFrame(animate);
}

animate();