(function() {
  var dropDowns = document.querySelectorAll('.c-dropdown__link');
  var numOfDropDowns = dropDowns.length;
  var i;

  // add event listeners
  for (i = 0; i < numOfDropDowns; i++) {
    dropDowns[i].addEventListener('click', _toggleCollapse(i));
  }

  function _toggleCollapse(i) {
    return function(e) {
      e.preventDefault();

      // grab targeted collapse component
      var currentComponent = dropDowns[i];
      // current dropdown link width
      var parentWidth = currentComponent.getBoundingClientRect().width;
      // grab dropdown id
      var dropId = currentComponent.dataset.dropControls;
      // get fixed height if specified
      var fixedHeight = currentComponent.dataset.fixedHeight;
      // grab the content container
      var dropDownList = document.querySelector('[data-drop-id="' + dropId + '"]');
      // grab drop down list items
      var dropDownListItems = dropDownList.querySelectorAll('.c-dropdown__list-item');
      // add event listeners to list items
      for (var j = 0; j < dropDownListItems.length; j++) {
        dropDownListItems[j].onclick = _toggleList;
      }
      // set drop down list to width of parent link
      dropDownList.style.width = parentWidth + 'px';
      // check to see if the content is currently visible
      var isVisible = dropDownList.classList.contains('c-dropdown__list--is-visible');
      // get the height of the components content
      var contentHeight = dropDownList.scrollHeight;
      if (e.target.classList.contains('c-dropdown__link') || (e.target.classList.contains('c-dropdown__list-item'))) {
        if (!isVisible) {
          // toggle visible class and set height
          dropDownList.classList.toggle('c-dropdown__list--is-visible');
          if (fixedHeight !== undefined) {
            dropDownList.style.height = fixedHeight + 'px';
          } else {
            dropDownList.style.height = contentHeight + 'px';
          }
        } else {
          // toggle visible class and set height
          dropDownList.classList.toggle('c-dropdown__list--is-visible');
          dropDownList.style.height = 0 + 'px';
        }
      }
    };
  }

  function _toggleList() {
    this.parentNode.classList.toggle('c-dropdown__list--is-visible');
    this.parentNode.style.height = 0 + 'px';
  }

})();

