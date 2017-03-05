(function() {
  var nextBtns = document.querySelectorAll('.c-sif__btn');
  var nextBtnsArr = [].slice.call(nextBtns);
  var indicators = document.querySelectorAll('.c-sif__indicator');
  var inputWraps = document.querySelectorAll('.c-sif__input-wrap');
  var labels = document.querySelectorAll('.c-sif__label');
  var inputFields = document.querySelectorAll('.c-sif__input');
  var inputFieldsArr = [].slice.call(inputFields);
  var validator = {};

  validator.isTrimmed = function(input) {
    var arr;
    if (!input) return false;
    if (typeof input !== 'string') return false;

    arr = input.split(' ');
    for (var i = 0; i < arr.length; i++) {
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
    for (var j = 0; j < domainSplit.length; j++) {
      if (domainSplit[j] === '') return false;
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

  function inputFadeOut(btn) {
    var index = nextBtnsArr.indexOf(btn);

    btn.addEventListener('click', function(e) {
      e.preventDefault();

      if (!validator.isNotEmpty(inputFields[index].value)) {
        nextBtns[index].style.color = 'red';
        return;
      }

      if (index == 1 && !validator.isEmail(inputFields[index].value)) {
        nextBtns[index].style.color = 'red';
        return;
      }

      indicators[index].style.animationName = 'fadeOutRight';
      nextBtns[index].style.animationName = 'fadeOut';
      labels[index].style.animationName = 'fadeOut';
      inputFields[index].style.animationName = 'fadeOut';
      inputWraps[index + 1].style.animationName = 'fadeOut';
      inputWraps[index].classList.add('c-sif-active');
    });
  }

  function addHandlerToBtns() {
    for (var i = 0; i < nextBtns.length; i++) {
      inputFadeOut(nextBtns[i]);
      showPlaceholderOrNot(inputFields[i]);
    }
  }

  addHandlerToBtns();
})();