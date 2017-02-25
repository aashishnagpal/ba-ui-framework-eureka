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
      var content = currentComponent.querySelector('.c-collapse__content');
      var isVisible = content.classList.contains('c-collapse__content--is-visible');
      console.log('is visible: ', isVisible);
      var contentHeight = content.scrollHeight;
      console.log('content height: ', contentHeight);
      console.log('collapse component clicked!');
      if (e.target.classList.contains('c-collapse__toggle')) {
        console.log('toggle clicked!');
        if (!isVisible) {
          content.classList.toggle('c-collapse__content--is-visible');
          content.style.height = contentHeight + 'px';
        } else {
          content.classList.toggle('c-collapse__content--is-visible');
          content.style.height = 0 + 'px';
        }
      }
    };
  }




})();

