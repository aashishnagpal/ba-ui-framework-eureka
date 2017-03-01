(function() {
  window.addEventListener('keydown', _keysDown, false);
  window.addEventListener('keyup', _keysUp, false);


  var bookmarkListComponent = document.querySelector('.c-bookmarklet');
  var bookmarkList = bookmarkListComponent.querySelector('.c-bookmaklet__bookmark-list');
  var highlightColor = bookmarkListComponent.dataset.highlightColor;
  var keysPressed = [];
  var bookmarkId = 0;

  function _keysDown(e) {
    keysPressed[e.keyCode] = true;

    // keyboard shortcut Shift(16) + Control(17) + M(77)
    if (keysPressed[16] && keysPressed[17] && keysPressed[77]) {
      _bookmarkSelection();
    }

    // keyboard shortcut Shift(16) + Control(17) + X(88)
    if (keysPressed[16] && keysPressed[17] && keysPressed[88]) {
      _clearBookmark();
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
    // console.log(selection);

    // create span node for text hightlighting
    highlightNode = document.createElement('span');
    highlightNode.className = 'c-bookmarklet__highlight-text';
    // sets text highlight color if specified in data-highlight-color attribute - defaults to yellow;
    if (highlightColor) {
      highlightNode.style = 'background-color: ' + highlightColor;
    }
    console.log(highlightNode);

    if (selection.anchorNode) {

      bookmarkNode = selection.anchorNode.parentNode;

      if (bookmarkNode.dataset.bookmark === undefined) {
        // add data-bookmark atttribute to selected node and set bookmark ID
        bookmarkNode.setAttribute('data-bookmark', bookmarkId);
        // bookmarkNode.style.color = 'red';
        // bookmarkId += 1;

        // get the range of selected text and surround it with the hightlighting span
        selectedText = selection.getRangeAt(0);
        console.log(selectedText);

        if (selectedText.startContainer === selectedText.endContainer && selectedText.startOffset !== selectedText.endOffset) {
          // surround selected text with hightlighting span
          selectedText.surroundContents(highlightNode);
          // add unique id to highlighted span
          highlightNode.setAttribute('id', 'bookmarklet_'+bookmarkId);

          // create li node for widget ol
          listNode = document.createElement('li');
          listNode.className = 'c-bookmarklet__bookmark-list-item';

          // create close icon
          closeIcon = document.createElement('i');
          closeIcon.className = 'fa fa-times c-bookmarklet__close-icon';

          // create anchor tag for widget li
          bookmarkAnchorLink = document.createElement('a');
          // set anchor link to bookmarklet ID
          bookmarkAnchorLink.setAttribute('href', '#'+'bookmarklet_'+bookmarkId);
          // copy over the highlighted text
          bookmarkAnchorLink.innerHTML = highlightNode.innerHTML;
          // append anchor element and text to widget li
          listNode.appendChild(bookmarkAnchorLink);
          // append close icon to listNode
          listNode.appendChild(closeIcon);
          // append li to widget ol
          bookmarkList.appendChild(listNode);


          bookmarkId += 1;

          console.log(selectedText.toString());
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
  }

  function _clearBookmark() {
    var selection;
    var bookmarkNode;

    selection = window.getSelection();
    bookmarkNode = selection.anchorNode.parentNode;

    if (bookmarkNode && bookmarkNode.dataset.bookmark) {
      bookmarkNode.removeAttribute('data-bookmark');
      bookmarkNode.style.color = 'green';
      console.log('bookmark removed!');
    }
  }

})();
