(function() {
  var inlineNote = document.querySelector('.c-inline-note');
  var printBtn = document.querySelector('.c-inline-note__print-btn');
  var clearAllBtn = document.querySelector('.c-inline-note__clear-btn');
  var notes = {};
  var index = 0;
  var activeIndex;


  // Create a note and all its elements inside
  function createNote() {
    // if a user don't select anything, a note won't be created
    if (window.getSelection().rangeCount > 0) {
      var selectedRange = window.getSelection().getRangeAt(0);
      var selectedStartContainer = selectedRange.startContainer;
      if (inlineNote.contains(selectedStartContainer)) {
        if (selectedRange.startContainer === selectedRange.endContainer &&
            selectedRange.startOffset !== selectedRange.endOffset) {
          // Add a property to notes obj. key is the index, value is
          // an obj. This obj's key is the selected text, value is
          // empty for now.
          notes[index] = {
            'selectedText': selectedRange.toString(),
            'note': ''
          };

          // Create and add elements to a note
          var highlight = document.createElement('span');
          var noteWrap = document.createElement('span');
          var note = document.createElement('textarea');
          var rmBtn = document.createElement('span');
          highlight.className = 'c-inline-note__highlight';
          highlight.setAttribute('id', 'hl' + index);
          noteWrap.className = 'c-inline-note__note-wrap';
          noteWrap.style.display = 'flex';
          noteWrap.setAttribute('id', 'nWrap' + index);
          note.setAttribute('id', 'note' + index);
          rmBtn.className = 'c-inline-note__remove-btn';
          rmBtn.innerHTML = 'remove';
          noteWrap.appendChild(note);
          noteWrap.appendChild(rmBtn);
          // highlight the selected text
          selectedRange.surroundContents(highlight);
          highlight.appendChild(noteWrap);

          activeIndex = index;
          index++;

          // add openNote function to highlighted span
          highlight.addEventListener('click', function(e) {
            // prevent click event propagates to body and closes the note area
            e.stopPropagation();
            openNote(this);
          });

          // add removeNote function to rmBtn
          rmBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeNote();
          });

          // stop propagation of noteWrap
          noteWrap.addEventListener('click', function(e) {
            e.stopPropagation();
          });

          // place the note
          placeNote(selectedRange, activeIndex);
        } else {
          // * Originally from bookmarklet.js *
          var alertNumber = document.querySelectorAll('.c-bookmarklet__alert--warning').length;
          if (alertNumber === 0) {
            // create background div and add class
            var alertBackground = document.createElement('div');
            alertBackground.classList.add('c-bookmarklet__alert-background--warning');
            // create warning div and add class
            var warning = document.createElement('div');
            warning.classList.add('c-bookmarklet__alert--warning');
            // add in html and message
            warning.innerHTML = '<i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i><p><strong>D\'oh!</strong> Cannot add note to selected section.</p><p><small><em>(Keep your selection within a single HTML tag)</em></small></p>' + '<span class="c-alert__close-alert">' + '<i class="fa fa-times"></i>' + '</span>';
            // append alert div and background to body
            document.body.appendChild(warning);
            document.body.appendChild(alertBackground);

            // add event listener for dismissing of alert
            alertBackground.addEventListener('click', function() {
              dismissAlert(warning, this);
            });
            warning.addEventListener('click', function() {
              dismissAlert(this, alertBackground);
            });
          }
        }
      }
    }
  }

  function placeNote(ele, i) {
    if (i === undefined) return;

    // get position of selectedRange and dimension of noteWrap
    var bodyWidth = document.body.clientWidth;
    var selectedTop = ele.getClientRects()[0].top;
    var selectedLeft = ele.getClientRects()[0].left;
    var selectedHeight = ele.getClientRects()[0].height;
    var activeNWrap = document.getElementById('nWrap' + i);

    // set noteWrap position based on selectedRange's position
    // Goes to top or bottom
    if (selectedTop < 170) { // 170 = height of noteWrap + margin to selected\
      activeNWrap.style.top = (selectedHeight + 12) + 'px';
    } else {
      console.log('else');
      activeNWrap.style.top = -120 + 'px';
      // 120 = height of noteWrap + margin to selected
    }

    // Aligns left or right
    if ((selectedLeft + 190) >= bodyWidth) { //align right
      activeNWrap.style.right = 0;
      activeNWrap.style.left = 'auto';
    } else { //align left
      activeNWrap.style.left = 0;
    }
  }
  
  function openNote(highlighted) {
    closeNote(); // close opened note
    var highlightId = highlighted.getAttribute('id');
    var i = highlightId.slice(2);
    if (i === '' + activeIndex) return;

    var activeNWrap = document.getElementById('nWrap' + i);
    activeNWrap.style.display = 'flex';

    placeNote(highlighted, i);

    activeIndex = i;
  }
  
  function closeNote() {
    // if no note is opened, return
    if (activeIndex === undefined) return;

    var activeNWrap = document.getElementById('nWrap' + activeIndex);
    var activeNote = document.getElementById('note' + activeIndex);
    activeNWrap.style.display = 'none';
    // update note key value in notes obj
    notes[activeIndex].note = activeNote.value;
    activeIndex = undefined;
  }

  function remove(index) {
    var highlighted = document.getElementById('hl' + index);
    var p = highlighted.parentNode;
    // highlighted.replaceWith(notes[activeIndex].selectedText);
    p.replaceChild(document.createTextNode(notes[index].selectedText), highlighted);
    delete notes[index];
    p.normalize();
  }

  // remove one note
  function removeNote() {
    if (activeIndex === undefined) return;

    remove(activeIndex);
    activeIndex = undefined;
  }

  // remove all notes
  function clearAllNotes() {
    for (var prop in notes) {
      remove(prop);
    }
  }

  function printNotes() {
    window.sessionStorage.setItem('inline-notes', JSON.stringify(notes));
    window.open('jr-components/inline-note-print.html', '_blank');
  }

  function dismissAlert(alert, bg) {
    alert.classList.add('c-bookmarklet__alert--is-dismissed');
    bg.classList.add('c-bookmarklet__alert-background--is-dismissed');

    alert.addEventListener('animationend', function() {
      alert.remove();
      bg.remove();
    });
  }

  window.addEventListener('resize', function() {
    var highlighted = document.getElementById('hl' + activeIndex);
    placeNote(highlighted, activeIndex);
  });

  document.body.addEventListener('click', closeNote);

  document.addEventListener('keydown', function(e) {
    // If shift, control and number 0 keys are all pressed down, create a note
    if (e.keyCode === 48 && e.shiftKey && e.ctrlKey) {
      closeNote();
      createNote();
    }
  });

  printBtn.addEventListener('click', printNotes);
  clearAllBtn.addEventListener('click', clearAllNotes);
})();