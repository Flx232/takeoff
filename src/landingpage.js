// Include anime.js library
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Wait for the anime.js library to load
window.onload = function() {
    // Set focus to the window
    window.focus();

    // Add event listener for the play button
    document.addEventListener('click', function(event) {
        // Animate the rocket
        anime({
            targets: '#rocket',
            bottom: '100%', // Move to top of screen
            duration: 2000,
            easing: 'easeInOutQuad',
            begin: function() {
                // Start the smoke animation when the rocket animation begins
                createSmoke();
            },
            complete: function() {
                // Fade out the page
                document.body.style.transition = "opacity 2s ease-in-out";
                document.body.style.opacity = 0;

                // Wait for the fade out animation to finish before redirecting
                setTimeout(function() {
                    if(event.target && event.target.id === 'play-button'){
                        window.location.href = 'game.html';
                    }else if(event.target && event.target.id === 'about-button'){
                        window.location.href = 'about.html';
                    }
                }, 2000);
            }
        });
    });
};

// Function to create smoke particles
function createSmoke() {
    var smokeContainer = document.getElementById('smoke-container');

    for (var i = 0; i < 100; i++) {
        var smokeParticle = document.createElement('div');
        smokeParticle.classList.add('smoke-particle');
        smokeParticle.style.width = Math.random() * 100 + 'px';
        smokeParticle.style.height = smokeParticle.style.width;
        smokeParticle.style.left = Math.random() * window.innerWidth + 'px';
        
        smokeContainer.appendChild(smokeParticle);

        anime({
            targets: smokeParticle,
            top: '-100%',
            left: '+=' + Math.random() * 200 - 100 + 'px',
            backgroundSize: ['100%', '0%'],
            duration: Math.random() * 3000 + 2000,
            easing: 'linear',
            complete: function() {
                //smokeParticle.remove();
            }
        });
    }
}
