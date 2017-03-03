(function() {
  window.addEventListener('keydown', _keysDown, false);
  window.addEventListener('keyup', _keysUp, false);


  var bookmarkListComponent = document.querySelector('.c-bookmarklet');
  var bookmarkList = bookmarkListComponent.querySelector('.c-bookmaklet__bookmark-list');
  var highlightColor = bookmarkListComponent.dataset.highlightColor;
  var clearAllBtn = bookmarkListComponent.querySelector('.c-bookmarklet__clear-all');
  var keysPressed = [];
  var bookmarkId = 0;

  function _keysDown(e) {
    keysPressed[e.keyCode] = true;

    // keyboard shortcut Shift(16) + Control(17) + M(77)
    if (keysPressed[16] && keysPressed[17] && keysPressed[77]) {
      _bookmarkSelection();
    }

  }

  function _keysUp(e) {
    keysPressed[e.keyCode] = false;
  }

  function _bookmarkSelection() {
    // console.log('Shortcut initiated!');
    var selection;
    var alertNode;
    var selectionString;
    var selectedText;
    var highlightNode;
    var highlightNodeQueryString;
    var bookmarkAnchorLink;
    var listNode;
    var closeIcon;
    var googleSearchBtn;

    alertNode = bookmarkListComponent.parentNode;

    selection = window.getSelection();

    // create span node for text hightlighting
    highlightNode = document.createElement('span');
    highlightNode.className = 'c-bookmarklet__highlight-text';

    // sets text highlight color if specified in data-highlight-color attribute - defaults to yellow;
    if (highlightColor) {
      highlightNode.style = 'background-color: ' + highlightColor;
    }

    if (selection.anchorNode) {

      // get the range of selected text and surround it with the hightlighting span
      selectedText = selection.getRangeAt(0);

      if (selectedText.startContainer === selectedText.endContainer && selectedText.startOffset !== selectedText.endOffset) {

        // surround selected text with hightlighting span
        selectedText.surroundContents(highlightNode);

        // add unique id to highlighted span
        highlightNode.setAttribute('id', 'bookmarklet_' + bookmarkId);

        // create li node for widget ol
        listNode = document.createElement('li');
        listNode.className = 'c-bookmarklet__bookmark-list-item';

        // create close icon
        closeIcon = document.createElement('i');
        closeIcon.className = 'fa fa-times c-bookmarklet__close-icon';

        highlightNodeQueryString = encodeURIComponent(highlightNode.innerHTML);
        highlightNodeQueryString = highlightNodeQueryString.replace(/%20/g, '+');

        // create google search button
        googleSearchBtn = document.createElement('a');
        googleSearchBtn.classList.add('c-bookmarklet__google-button');
        googleSearchBtn.setAttribute('target', '_blank');
        googleSearchBtn.setAttribute('href', 'http://www.google.com/search?q=' + highlightNodeQueryString);
        googleSearchBtn.innerHTML = 'Google this bookmark <i class="fa fa-external-link" aria-hidden="true"></i>';

        // create anchor tag for widget li
        bookmarkAnchorLink = document.createElement('a');

        // set anchor link to bookmarklet ID
        bookmarkAnchorLink.setAttribute('href', '#' + 'bookmarklet_' + bookmarkId);

        // copy over the highlighted text
        bookmarkAnchorLink.innerHTML = highlightNode.innerHTML;

        // append anchor element and text to widget li
        listNode.appendChild(bookmarkAnchorLink);

        // append close icon to listNode
        listNode.appendChild(closeIcon);

        // append google search link
        listNode.appendChild(googleSearchBtn);

        // append li to widget ol
        bookmarkList.appendChild(listNode);

        // increment bookmarkId var
        bookmarkId += 1;

        // show the bookmarklet component
        bookmarkListComponent.classList.add('c-bookmarklet--is-visible');

      } else {
        if (selectedText.startContainer !== selectedText.endContainer) {

          console.log("Don't cross the streams!! (nodes have been split)");
          // create background div and add class
          var background = document.createElement('div');
          background.classList.add('c-bookmarklet__alert-background--warning');
          // create warning div and add class
          var warning = document.createElement('div');
          warning.classList.add('c-bookmarklet__alert--warning');
          // add in html and message
          warning.innerHTML = '<i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><p><strong>D\'oh!</strong> Your selection can\'t be a bookmarked.</p><p><small><em>(Keep your selection within a single HTML tag)</em></small></p>' + '<span class="c-alert__close-alert">' + '<i class="fa fa-times"></i>' + '</span>';
          // add event listener for dismissing of alert
          alertNode.addEventListener('click', _dismissAlert(warning, background), false);
          // append alert div and background to document
          alertNode.appendChild(warning);
          alertNode.appendChild(background);
        }
        if (selectedText.startOffset === selectedText.endOffset) {
          console.log("Nothing selected!");
          // create background div and add class
          var background = document.createElement('div');
          background.classList.add('c-bookmarklet__alert-background--caution');
          // create alert div and add class
          var caution = document.createElement('div');
          caution.classList.add('c-bookmarklet__alert--caution');
          // add in html and message
          caution.innerHTML = '<i class="fa fa-meh-o fa-3x" aria-hidden="true"></i><p><strong>Oops!</strong> You didn\'t select anything to bookmark. Nothing to see here...</p>' + '<span class="c-alert__close-alert">' + '<i class="fa fa-times"></i>' + '</span>';
          // add event listener for dismissing of alert
          alertNode.addEventListener('click', _dismissAlert(caution, background), false);
          // append alert div and background to document
          alertNode.appendChild(caution);
          alertNode.appendChild(background);

        }
      }

      // convert selection to string
      selectionString = selection.toString();

    }
    // create remove list item listeners
    _buildClearBookmarkListItemListeners();

  } // end of _bookmarkSelection

  function _buildClearBookmarkListItemListeners() {
    var closeIcons = document.querySelectorAll('.c-bookmarklet__close-icon');
    var numOfListItems = closeIcons.length;
    var i;

    // add event listeners to close icons
    for (i = 0; i < numOfListItems; i++) {
      closeIcons[i].addEventListener('click', _removeListItem);
    }

    // add event listener to clear all button
    clearAllBtn.addEventListener('click', _clearAllBookmarks);

  } // end of _buildClearBookmarkListItemListeners

  function _removeListItem(e) {

    e.preventDefault();

    var listItem = e.target;

    _clearListItemAndNormalizeNode(listItem);

  } // end of _removeListItem function

  function _clearListItemAndNormalizeNode(listItem) {

    var listItemId = listItem.previousSibling.getAttribute('href').slice(1);
    var bookmarkedSpan = document.getElementById(listItemId);
    var spanContent = document.createTextNode(bookmarkedSpan.innerHTML);
    var spanParent = bookmarkedSpan.parentNode;

    // spanParent.removeAttribute('data-bookmark');
    spanParent.replaceChild(spanContent, bookmarkedSpan);
    spanParent.normalize();

    // closing animation on list item
    listItem.parentNode.classList.add('c-bookmarklet--remove');

    // after animation runs remove alert from DOM
    listItem.parentNode.addEventListener('animationend', function() {

      listItem.parentNode.remove();
      bookmarkList.normalize();

      // hide bookmark list if no list items are present
      if (bookmarkList.children.length === 0) {
        bookmarkListComponent.classList.remove('c-bookmarklet--is-visible');
      }

    });
  } // end of _clearListItemAndNormalizeNode

  function _clearAllBookmarks() {
    var closeIcons = Array.prototype.slice.call(document.querySelectorAll('.c-bookmarklet__close-icon'));

    closeIcons.forEach(function(listItem) {
      _clearListItemAndNormalizeNode(listItem);
    });
  } // end of _clearAllBookmarks

  function _dismissAlert(alertMessageNode, bg) {
    return function(e) {
      alertMessageNode.classList.add('c-bookmarklet__alert--is-dismissed');
      bg.classList.add('c-bookmarklet__alert-background--is-dismissed');

      alertMessageNode.addEventListener('animationend', function() {
        alertMessageNode.remove();
        bg.remove();
      })
    };
  }

})();
