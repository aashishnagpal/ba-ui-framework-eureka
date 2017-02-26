(function() {
  var alertComponents = document.querySelectorAll('[class^="c-alert--"], .c-alert');
  var numOfAlertComponents = alertComponents.length;
  var i;

  // add event listeners
  for (i = 0; i < numOfAlertComponents; i++) {
    alertComponents[i].addEventListener('click', _removeAlert(i));
  }

  function _removeAlert(i) {
    return function(e) {
      e.preventDefault();
      // grab targeted alert component
      var targetAlert = alertComponents[i];
      // grab the close icon
      var closeIcon = targetAlert.querySelector('.c-alert__close-alert');

      // set to true if target is the close icon span, the icon itself, or any element with the data-close-alert attribute
      var closeClicked = (e.target.nodeName === 'I' && e.target.parentNode.classList.contains('c-alert__close-alert')) || e.target.classList.contains('c-alert__close-alert') || e.target.dataset.closeAlert ? true : false;

      if (closeClicked) {
        // closing animation
        targetAlert.classList.add('c-alert--remove');
        // after animation runs remove alert from DOM
        targetAlert.addEventListener('animationend', function() {
          targetAlert.remove();
        });
      }

    };
  }

})();
