(function() {
  var collapseComponents = document.querySelectorAll('.c-collapse');
  var numOfCollapseComponents = collapseComponents.length;
  var i;
  // add event listeners
  for (i = 0; i < numOfCollapseComponents; i++) {
    collapseComponents[i].addEventListener('click', _toggleCollapse(i));
  }

  function _toggleCollapse(i) {
    return function(e) {
      e.preventDefault();
      // grab targeted collapse component
      var currentComponent = collapseComponents[i];
      // get fixed height if specified
      var fixedHeight = currentComponent.dataset.fixedHeight;
      // grab the content container
      var contentContainer = currentComponent.querySelector('.c-collapse__content-container');
      // check to see if the content is currently visible
      var isVisible = contentContainer.classList.contains('c-collapse__content--is-visible');
      // get the height of the components content
      var contentHeight = contentContainer.scrollHeight;
      if (e.target.classList.contains('c-collapse__toggle')) {
        if (!isVisible) {
          // toggle visible class and set height
          contentContainer.classList.toggle('c-collapse__content--is-visible');
          if (fixedHeight !== undefined) {
            contentContainer.style.height = fixedHeight + 'px';
          } else {
            contentContainer.style.height = contentHeight + 'px';
          }
        } else {
          // toggle visible class and set height
          contentContainer.classList.toggle('c-collapse__content--is-visible');
          contentContainer.style.height = 0 + 'px';
        }
      }
    };
  }

})();

