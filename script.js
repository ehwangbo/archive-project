const artifactItems = document.querySelectorAll('.artifact-item');
const artifactTexts = document.querySelectorAll('.artifact-text');

// audio objects

// per-artifact hover sounds (one per artifact-item, in DOM order)
const hoverSounds = [
    new Audio('audio/sound-hakk-vase.wav'),
    new Audio('audio/sound-jewelry-box.wav'),
    new Audio('audio/sound-earrings.wav'),
    new Audio('audio/sound-moon-vase.wav')
];
const clickSound = new Audio('audio/click.mp3');

// Set audio properties and preload
hoverSounds.forEach((sound, index) => {
    sound.preload = 'auto';
    sound.volume = 0.21;
});
clickSound.preload = 'auto';
clickSound.volume = 0.35;

//hovering over images -> unblur text

artifactItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        artifactTexts[index].classList.add('active');
        
        const s = hoverSounds[index];
        if (s) {
            s.currentTime = 0;
            s.play();
        }
    });
    
    item.addEventListener('mouseleave', () => {
        artifactTexts[index].classList.remove('active');
    });
    
    item.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
    
});

// hover over text -> unblur images (NO AUDIO)
artifactTexts.forEach((text, index) => {
    // Initialize Korean state
    text.dataset.isKorean = 'false';
    
    text.addEventListener('mouseenter', () => {
        artifactItems[index].classList.add('active');
        text.classList.add('active'); /*unblur text also*/
    });
    
    text.addEventListener('mouseleave', () => {
        artifactItems[index].classList.remove('active');
        text.classList.remove('active');  /*reblur text*/
    });
    
    // Click to toggle translation
    text.addEventListener('click', () => {
        const h3 = text.querySelector('h3');
        const desc = text.querySelector('.description');
        const isKorean = text.dataset.isKorean === 'true';
        
        if (isKorean) {
            h3.textContent = text.getAttribute('data-en-title');
            desc.innerHTML = text.getAttribute('data-en-desc');
            text.dataset.isKorean = 'false';
        } else {
            h3.textContent = text.getAttribute('data-kr-title');
            desc.innerHTML = text.getAttribute('data-kr-desc');
            text.dataset.isKorean = 'true';
        }
    });
});

// Toggle manual panel function
function toggleManual() {
    const panel = document.getElementById('manualPanel');
    const manualBtn = document.querySelector('.manual'); /*makes the manual turn white and bold*/

    panel.classList.toggle('active');
    manualBtn.classList.toggle('active'); /*makes the manual turn white and bold*/

    clickSound.currentTime = 0;
    clickSound.play();
}

// Artifact label hover translation
const artifactLabels = document.querySelectorAll('.artifact-label');
artifactLabels.forEach(label => {
    label.addEventListener('mouseenter', function() {
        this.textContent = this.getAttribute('data-kr');
    });
    label.addEventListener('mouseleave', function() {
        this.textContent = this.getAttribute('data-en');
    });
});

// Create thumbprint effect
function createThumbprint(x, y) {
    const thumbprint = document.createElement('div');
    thumbprint.className = 'thumbprint';
    thumbprint.style.left = x + 'px';
    thumbprint.style.top = y + 'px';
    
    // Create img element for thumbprint
    const img = document.createElement('img');
    img.src = 'images/thumbprint.png'; 
    thumbprint.appendChild(img);
    
    document.body.appendChild(thumbprint);
    
}

// Play jewelry box transition video
function playJewelryBoxVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const video = document.getElementById('jewelryBoxVideo');
    
    // Show video overlay
    videoOverlay.classList.add('active');
    
    // Play video
    video.play();
    
    // When video ends, pause and zoom
    video.addEventListener('ended', function() {
        video.pause();
        video.classList.add('zoom');
    }, { once: true });
}

