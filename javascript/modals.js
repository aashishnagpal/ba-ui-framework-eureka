(function() {
  var modalTriggers = document.querySelectorAll('.c-modal-trigger');
  var fullModalTrigger = document.querySelector('.c-modal-trigger--f');
  var closeBtns = document.querySelectorAll('.c-modal__close');
  var overlay = document.querySelector('.c-modal-overlay');
  var triggedId;
  var activeModal;

  function trigOverlay(classNm) {
    activeModal.classList.add('c-modal--active');
    overlay.classList.add(classNm);
    overlay.style.visibility = 'visible';
  }

  function closeOverlay() {
    activeModal.classList.remove('c-modal--active');
    overlay.classList.remove('c-modal-overlay--gray');
    overlay.classList.remove('c-modal-overlay--full');
    overlay.style.visibility = 'hidden';
  }


  fullModalTrigger.addEventListener('click', function() {
    triggedId = this.getAttribute('href').slice(1);
    activeModal = document.getElementById(triggedId);
    trigOverlay('c-modal-overlay--full');
  });

  for (var i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener('click', function() {
      triggedId = this.getAttribute('href').slice(1);
      activeModal = document.getElementById(triggedId);
      trigOverlay('c-modal-overlay--gray');
    });
  }

  for (var j = 0; j < closeBtns.length; j++) {
    closeBtns[j].addEventListener('click', closeOverlay);
  }

  overlay.addEventListener('click', closeOverlay);
})();