var game = document.getElementById('game');
var player = document.getElementById('player');
var scoreElement = document.getElementById('score');
var levelElement = document.getElementById('level-text');
var level = 1;
var score = 0;
var speed = 0;
var prevScore = 0;
var freq = 1000;
var enemySpeedMult = 1;

function createEnemy() {
    var enemy = document.createElement('div');
    enemy.classList.add('enemy');
    game.appendChild(enemy);

    // Varying size based on the current score
    var enemySize = (Math.random() * 20) + 25; // Adjust the size range as needed
    enemy.style.width = enemySize + 'px';
    enemy.style.height = enemySize + 'px';

    // Varying speed based on the current score
    if (enemySpeedMult != 5)
    {
        enemySpeedMult = 1 + (score / 50); // Adjust the speed increase rate as needed
    }
    var enemyLeft = Math.random() * (game.offsetWidth - enemySize);
    enemy.style.left = enemyLeft + 'px';

    function step() {
        var speed = Math.random() * 2 * enemySpeedMult + 1;
        enemy.style.top = (enemy.offsetTop + speed) + 'px';

        if (enemy.offsetTop > game.offsetHeight) {
            enemy.remove();
            score++;
            scoreElement.textContent = "Score: " + score;
        } else if (!isColliding(player, enemy)) {
            requestAnimationFrame(step);
        } else {
            game.innerHTML = 'Game Over!';
        }
        if (score >= prevScore + 50)
            {
                prevScore = score;
                level++;
                levelElement.textContent = "LEVEL: " + level;
            }
    }

    step();
}

function isColliding(div1, div2) {
    var rect1 = div1.getBoundingClientRect();
    var rect2 = div2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
             rect1.left > rect2.right ||
             rect1.bottom < rect2.top ||
             rect1.top > rect2.bottom);
}
if (freq != 225){
    freq--;
}
setInterval(createEnemy, freq);

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        speed = -3;  // Move left
    } else if (event.key === 'ArrowRight') {
        speed = 3;  // Move right
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

animate()
