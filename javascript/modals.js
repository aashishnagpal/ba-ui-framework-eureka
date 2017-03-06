(function() {
  var modalTriggers = document.querySelectorAll('.c-modal-trigger');
  var modalTriggersArr = [].slice.call(modalTriggers);
  var fullModalTrigger = document.querySelector('.c-modal-trigger--f');
  var closeBtns = document.querySelectorAll('.c-modal__close');
  var closeBtnsArr = [].slice.call(closeBtns);
  var overlay = document.querySelector('.c-modal-overlay');
  var activeModal;
  var transitionClass;
  var overlayClass;
  var i;


  function closeModal() {
    activeModal.classList.remove(transitionClass);
    overlay.classList.remove(overlayClass);
    overlay.style.visibility = 'hidden';
  }

  function addOverlayHandler() {
    overlay.addEventListener('click', closeModal);
  }

  function addCloseHandler(closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal();
    });
  }

  function addTriggerHandler(trigger) {
    var index = modalTriggersArr.indexOf(trigger);

    trigger.addEventListener('click', function() {
      if (index == 1) {
        overlayClass = 'c-modal-overlay--full';
      } else {
        overlayClass = 'c-modal-overlay--gray';
      }
      activeModal = document.getElementById(this.getAttribute('href').slice(1));
      transitionClass = 'c-modal-transition--' + index;
      activeModal.classList.add(transitionClass);
      overlay.classList.add(overlayClass);
      overlay.style.visibility = 'visible';
    });
  }

  for (i = 0; i < modalTriggers.length; i++) {
    addTriggerHandler(modalTriggers[i]);
  }

  for (i = 0; i < closeBtns.length; i++) {
    addCloseHandler(closeBtns[i]);
  }

  addOverlayHandler();

})();