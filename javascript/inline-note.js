(function() {
  var inlineNote = document.querySelector('.c-inline-note');
  var notes = {};
  var index = 0;
  var activeIndex;
  // var selectedTxt = '';



  function createNote() {
    var selectedRange = window.getSelection().getRangeAt(0);

    if (selectedRange.startContainer === selectedRange.endContainer
        && selectedRange.startOffset !== selectedRange.endOffset) {
      notes[index] = {
        'selectedText': selectedRange.toString(),
        'note': ''
      };

      console.log(notes[index]);
      var highlight = document.createElement('span');
      var note = document.createElement('textarea');
      highlight.className = 'c-inline-note__highlight';
      highlight.setAttribute('id', 'hl' + index);
      note.className = 'c-inline-note__note';
      note.setAttribute('id', 'note' + index);
      note.style.display = 'block';
      activeIndex = index;
      index++;
      // highlight the selected text
      selectedRange.surroundContents(highlight);

      // add note
      highlight.appendChild(note);

      // add open feature to highlight
      highlight.addEventListener('click', function(e) {
        console.log("style: " + note.style.display);
        var highlightId = this.getAttribute('id');
        if (highlightId.slice(2) === "" + activeIndex) return;
        e.stopPropagation();
        openNote(highlightId);
      });

      note.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    } else {
      console.log('invalid');
    }
  }
  
  function openNote(highlightId) {
    console.log('hightid ' + highlightId);
    closeNote();
    var i = highlightId.slice(2);
    document.getElementById('note' + i).style.display = 'block';
    activeIndex = i;
  }
  
  function closeNote() {
    console.log('active index in close ' + activeIndex);
    if (activeIndex === undefined) return;
    var activeNote = document.getElementById('note' + activeIndex);
    activeNote.style.display = 'none';
    // update note key value in notes obj
    notes[activeIndex].note = activeNote.value;
    console.log(notes[activeIndex]);
    console.log(JSON.stringify(notes));
    activeIndex = undefined;
  }
  function removeNote() {
    console.log('remove ' + activeIndex);
    if (activeIndex === undefined) return;

    var hightlighted = document.getElementById('hl' + activeIndex);
  }
  function clearNotes() {
    
  }
  function printNotes() {
    
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
})();