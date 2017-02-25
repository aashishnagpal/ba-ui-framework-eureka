(function() {
  var collapseComponents = document.querySelectorAll('.c-collapse');
  var numOfCollapseComponents = collapseComponents.length;
  var i;

  for (i = 0; i < numOfCollapseComponents; i++) {
    collapseComponents[i].addEventListener('click', _toggleCollapse(i));
  }

  function _toggleCollapse(i) {
    return function(e) {
      e.preventDefault();
      var currentComponent = collapseComponents[i];
      var contentContainer = currentComponent.querySelector('.c-collapse__content-container');
      var isVisible = contentContainer.classList.contains('c-collapse__content--is-visible');
      console.log('is visible: ', isVisible);
      var contentHeight = contentContainer.scrollHeight;
      console.log('content height: ', contentHeight);
      console.log('collapse component clicked!');
      if (e.target.classList.contains('c-collapse__toggle')) {
        console.log('toggle clicked!');
        if (!isVisible) {
          contentContainer.classList.toggle('c-collapse__content--is-visible');
          contentContainer.style.height = contentHeight + 'px';
        } else {
          contentContainer.classList.toggle('c-collapse__content--is-visible');
          contentContainer.style.height = 0 + 'px';
        }
      }
    };
  }




})();

