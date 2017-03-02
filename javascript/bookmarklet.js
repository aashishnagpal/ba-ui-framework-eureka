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
    var bookmarkNode;
    var selectionString;
    var selectedText;
    var highlightNode;
    var bookmarkAnchorLink;
    var listNode;
    var closeIcon;

    selection = window.getSelection();

    // create span node for text hightlighting
    highlightNode = document.createElement('span');
    highlightNode.className = 'c-bookmarklet__highlight-text';

    // sets text highlight color if specified in data-highlight-color attribute - defaults to yellow;
    if (highlightColor) {
      highlightNode.style = 'background-color: ' + highlightColor;
    }

    if (selection.anchorNode) {

      bookmarkNode = selection.anchorNode.parentNode;

      if (bookmarkNode.dataset.bookmark === undefined) {

        // add data-bookmark atttribute to selected node and set bookmark ID
        bookmarkNode.setAttribute('data-bookmark', bookmarkId);

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

          // append li to widget ol
          bookmarkList.appendChild(listNode);

          // increment bookmarkId var
          bookmarkId += 1;

        } else {
          if (selectedText.startContainer !== selectedText.endContainer) {
            console.log("Don't cross the streams (nodes have been split)");
          }
          if (selectedText.startOffset === selectedText.endOffset) {
            console.log("Nothing selected");
          }
        }

        // convert selection to string
        selectionString = selection.toString();

        // show the bookmarklet component
        bookmarkListComponent.classList.add('c-bookmarklet--is-visible');
      } else {
        console.log('already bookmarked!');
      }
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

    spanParent.removeAttribute('data-bookmark');
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
    console.log('all closeIcons at time of clear all: ', closeIcons);
    closeIcons.forEach(function(listItem){
      _clearListItemAndNormalizeNode(listItem);
    });
  } // end of _clearAllBookmarks


})();
