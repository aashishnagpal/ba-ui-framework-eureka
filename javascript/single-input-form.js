(function() {
  var label = document.querySelectorAll('.c-sif__label')[0];
  var nextBtn = document.querySelectorAll('.c-sif__btn')[0];
  var inputArea = document.querySelectorAll('.c-sif__input-area')[0];

  nextBtn.addEventListener('click', function() {
    console.log('enter');
    label.style.animationName = 'moveToRight';
    // label.classList.add('c-sif-hidden');
  });

})();