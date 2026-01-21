const artifactItems = document.querySelectorAll('.artifact-item');
const artifactTexts = document.querySelectorAll('.artifact-text');

// audio objects

const hoverSound = new Audio('hover.mp3');
const clickSound = new Audio('click.mp3');

//  volume
hoverSound.volume = 0.3;
clickSound.volume = 0.5;

//hovering over images -> unblur text

artifactItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        artifactTexts[index].classList.add('active');
        
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
    
    item.addEventListener('mouseleave', () => {
        artifactTexts[index].classList.remove('active');
    });
    
    item.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});

// hover over text -> unblur images
artifactTexts.forEach((text, index) => {
    text.addEventListener('mouseenter', () => {
        artifactItems[index].classList.add('active');
        text.classList.add('active'); /*unblur text also*/
        
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
    
    text.addEventListener('mouseleave', () => {
        artifactItems[index].classList.remove('active');
        text.classList.remove('active');  /*reblur text*/
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