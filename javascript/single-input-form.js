(function() {
  var nextBtns = document.querySelectorAll('.c-sif__btn--next');
  var nextBtnsArr = [].slice.call(nextBtns);
  var prevBtns = document.querySelectorAll('.c-sif__btn--prev');
  var prevBtnsArr = [].slice.call(prevBtns);
  var indicators = document.querySelectorAll('.c-sif__indicator');
  var inputWraps = document.querySelectorAll('.c-sif__input-wrap');
  var labels = document.querySelectorAll('.c-sif__label');
  var inputFields = document.querySelectorAll('.c-sif__input');
  var inputFieldsArr = [].slice.call(inputFields);
  var validator = {};
  var i;

  validator.isTrimmed = function(input) {
    var arr;
    if (!input) return false;
    if (typeof input !== 'string') return false;

    arr = input.split(' ');
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === '') return false;
    }
    return true;
  };

  validator.isNotEmpty = function(input) {
    if (validator.isTrimmed(input)) {
      if (input !== '') {
        return true;
      }
    }
    return false;
  };

  // Email validation
  validator.isEmail = function(email) {
    var local,
        domain,
        localSplit,
        domainSplit;

    if (!email) return false;
    if (email.indexOf(' ') !== -1) return false;

    if (email.indexOf('@') === -1 ||
        email.indexOf('@') !== email.lastIndexOf('@')) return false;

    local = email.split('@')[0];
    domain = email.split('@')[1];
    localSplit = local.split('.');
    domainSplit = domain.split('.');

    if (local === '') return false;
    for (var i = 0; i < localSplit.length; i++) {
      if (localSplit[i] === '')
        return false;
    }

    if (domain === '') return false;
    if (domain.indexOf('_') !== -1) return false;
    if (domain.indexOf("-") === 0 ||
        domain.lastIndexOf('-') === domain.length - 1) return false;
    if (domainSplit.length < 2) return false;
    for (i = 0; i < domainSplit.length; i++) {
      if (domainSplit[i] === '') return false;
      if (domainSplit[domainSplit.length - 1].length < 2) return false;
    }
    return true;
  };

  function showPlaceholderOrNot(input) {
    var index = inputFieldsArr.indexOf(input);

    input.addEventListener('blur', function (e) {
      e.preventDefault();
      if (input.value === '') {
        labels[index].style.opacity = 1;
        labels[index].style.visibility = 'visible';
      }
    });

    input.addEventListener('focus', function (e) {
      e.preventDefault();
      if (input.value === '') {
        labels[index].style.opacity = 0;
        labels[index].style.visibility = 'hidden';
      }
    });
  }

  function goNext(btn) {
    var index = nextBtnsArr.indexOf(btn);

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      if (!validator.isNotEmpty(inputFields[index].value)) {
        nextBtns[index].style.color = 'red';
      } else if (index == 1 && !validator.isEmail(inputFields[index].value)) {
        nextBtns[index].style.color = 'red';
      } else {
        this.style.color = '#51D0EF';
        indicators[index].style.animationName = 'fadeOutRight';
        nextBtns[index].style.animationName = 'fadeOut';
        labels[index].style.animationName = 'fadeOut';
        inputFields[index].style.animationName = 'fadeOut';
        inputWraps[index + 1].style.animationName = 'fadeOut';
        inputWraps[index].classList.add('c-sif-active');
      }
    });
  }

  function addListenerToBtns() {
    for (i = 0; i < nextBtns.length; i++) {
      goNext(nextBtns[i]);
      showPlaceholderOrNot(inputFields[i]);
    }

    for (i = 0; i <prevBtns.length; i++) {
      goBack(prevBtns[i]);
    }
  }

  function goBack(btn) {
    var index = prevBtnsArr.indexOf(btn);

    btn.addEventListener('click', function() {
      inputWraps[index + 1].classList.remove('c-sif-active');
      inputWraps[index + 2].classList.add('c-sif-active');
      inputWraps[index + 2].style.animationName = 'fadeIn';
      indicators[index + 1].style.animationName = 'fadeInLeft';
      nextBtns[index + 1].style.animationName = 'fadeIn';
      labels[index + 1].style.animationName = 'fadeIn';
      inputFields[index + 1].style.animationName = 'fadeIn';

      if (index < prevBtns.length - 1) {
        prevBtns[index + 1].style.animationName = 'fadeIn';
      }
    });
  }

  addListenerToBtns();
})();