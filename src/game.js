var game = document.getElementById('game');
var player = document.getElementById('player');
var scoreElement = document.getElementById('score');
var score = 0;

function createEnemy() {
    var enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.random() * 350 + 'px';
    game.appendChild(enemy);

    var speed = Math.random() * 2 + 1;

    function step() {
        enemy.style.top = (enemy.offsetTop + speed) + 'px';

        if (enemy.offsetTop > game.offsetHeight) {
            enemy.remove();
            score++;
            scoreElement.textContent = score;
        } else if (!isColliding(player, enemy)) {
            requestAnimationFrame(step);
        } else {
            game.innerHTML = 'Game Over!';
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

setInterval(createEnemy, 1000);

window.addEventListener('keydown', function(event) {
    var left = player.offsetLeft;
    var speed = 10;  // Change this value to make the player move faster or slower

    if (event.key === 'ArrowLeft') {
        player.style.left = Math.max(left - speed, 0) + 'px';  // Move left
    } else if (event.key === 'ArrowRight') {
        player.style.left = Math.min(left + speed, game.offsetWidth - player.offsetWidth) + 'px';  // Move right
    }
});
