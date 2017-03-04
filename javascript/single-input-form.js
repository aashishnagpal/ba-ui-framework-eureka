(function() {
  var nextBtns = document.querySelectorAll('.c-sif__btn');
  var nextBtnsArr = [].slice.call(nextBtns);
  var indicators = document.querySelectorAll('.c-sif__indicator');
  var inputWraps = document.querySelectorAll('.c-sif__input-wrap');
  var inputWraps2 = document.querySelectorAll('.c-sif__input-wrap');
  var inputFields = document.querySelectorAll('.c-sif__input');

  // loop bases on the number of nextBtns
  // nextBtns.addEventListener('click', function() {
  //   console.log('enter');
  //
  //   // inputWraps2.style.visibility = "visible";
  //   indicators.style.animationName = 'fadeOutRight';
  //   nextBtns.style.animationName = 'fadeOut';
  //   inputFields.style.animationName = 'fadeOut';
  //   inputWraps.style.animationName = 'fadeOut';
  //   inputWraps2.style.animationName = 'fadeIn';
  //   // inputWraps.classList.remove('c-sif-active');
  //   //needs an animation delay
  // });

  // for (var i = 0; i < nextBtns.length - 1; i++) {
  //   nextBtns[i].addEventListener('click', function() {
  //     console.log('enter');
  //
  //     // inputWraps2.style.visibility = "visible";
  //     indicators[i].style.animationName = 'fadeOutRight';
  //     nextBtns[i].style.animationName = 'fadeOut';
  //     inputFields[i].style.animationName = 'fadeOut';
  //     inputWraps[i].style.animationName = 'fadeOut';
  //     // inputWraps[i + 1].style.animationName = 'fadeIn';
  //   });
  // }

  function inputFadeOut(input) {
    var index = nextBtnsArr.indexOf(input);
    console.log(index);

    input.addEventListener('click', function(e) {
      e.preventDefault();

      console.log("clicked: " + index);

      indicators[index].style.animationName = 'fadeOutRight';
      nextBtns[index].style.animationName = 'fadeOut';
      inputFields[index].style.animationName = 'fadeOut';
      inputWraps[index].style.animationName = 'fadeOut';
      inputWraps[index + 1].style.animationName = 'fadeIn';
    });
  }

  function addHandlerToBtns() {
    for (var i = 0; i < nextBtns.length; i++) {
      inputFadeOut(nextBtns[i]);
    }
  }

  addHandlerToBtns();
})();