(function(){
    var stepperItems = document.querySelectorAll('.stepper__number');
    var nextStepButtons = document.querySelectorAll('.stepper__continue');
    /*console.log(stepperItems[0]);*/
    for(var i = 0; i < nextStepButtons.length; i++){
        nextStepButtons[i].addEventListener('click', function(){
            stepperItems[i].classList.remove('stepper__step--active');
            stepperItems[0].classList.add('stepper__step--complete');
        });
    }

    /*function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }*/


})();