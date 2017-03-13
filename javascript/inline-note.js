(function() {
  var printBtn = document.querySelector('.c-inline-note__print-btn');
  var clearAllBtn = document.querySelector('.c-inline-note__clear-btn');
  var alertMsg = document.querySelector('.c-inline-note__alert');
  var alertBg = document.querySelector('.c-inline-note__alert-bg');
  var notes = {};
  var index = 0;
  var activeIndex;



  function createNote() {
    if (window.getSelection().rangeCount > 0) {
      var selectedRange = window.getSelection().getRangeAt(0);

      if (selectedRange.startContainer === selectedRange.endContainer
          && selectedRange.startOffset !== selectedRange.endOffset) {
        notes[index] = {
          'selectedText': selectedRange.toString(),
          'note': ''
        };

        console.log(notes[index]);
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

        // add openNote function to highlight span
        highlight.addEventListener('click', function(e) {
          console.log("style: " + noteWrap.style.display);
          var highlightId = this.getAttribute('id');
          if (highlightId.slice(2) === "" + activeIndex) return;
          e.stopPropagation();
          openNote(highlightId);
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
      } else {
        console.log('invalid');
        alertMsg.classList.add('c-inline-note__alert--in');
        alertBg.classList.add('c-inline-note__alert-bg--in');
        alertMsg.classList.remove('c-inline-note__alert--out');
        alertBg.classList.remove('c-inline-note__alert-bg--out');
      }
    }
  }
  
  function openNote(highlightId) {
    console.log('hightid ' + highlightId);
    closeNote();
    var i = highlightId.slice(2);
    document.getElementById('nWrap' + i).style.display = 'flex';
    activeIndex = i;
  }
  
  function closeNote() {
    console.log(JSON.stringify(notes));
    console.log('active index in close ' + activeIndex);
    if (activeIndex === undefined) return;
    var activeNWrap = document.getElementById('nWrap' + activeIndex);
    var activeNote = document.getElementById('note' + activeIndex);
    activeNWrap.style.display = 'none';
    // update note key value in notes obj
    notes[activeIndex].note = activeNote.value;
    console.log(notes[activeIndex]);
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

  function removeNote() {
    console.log('remove ' + activeIndex);
    if (activeIndex === undefined) return;

    remove(activeIndex);
    activeIndex = undefined;
  }

  function clearAllNotes() {
    for (var prop in notes) {
      remove(prop);
    }
  }

  function printNotes() {
    window.sessionStorage.setItem('inline-notes', JSON.stringify(notes));
    window.open('inline-note-print.html', '_blank');
  }

  function dismissAlert() {
    alertMsg.classList.add('c-inline-note__alert--out');
    alertBg.classList.add('c-inline-note__alert-bg--out');


    alertMsg.classList.remove('c-inline-note__alert--in');
    alertBg.classList.remove('c-inline-note__alert-bg--in');
  }

  document.body.addEventListener('click', closeNote);

  document.addEventListener('keydown', function(e) {
    // If shift, control and i keys are all pressed down, create a note
    if (e.keyCode === 73 && e.shiftKey && e.ctrlKey) {
      closeNote();
      createNote();
    }

    // If shift, control and d keys are all pressed down, remove a note
    if (e.keyCode === 68 && e.shiftKey && e.ctrlKey) {
      removeNote();
    }
  });

  printBtn.addEventListener('click', printNotes);
  clearAllBtn.addEventListener('click', clearAllNotes);

  alertMsg.addEventListener('click', dismissAlert);
  alertBg.addEventListener('click', dismissAlert);
})();