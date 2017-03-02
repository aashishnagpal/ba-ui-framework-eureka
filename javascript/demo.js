(function(){

    /* Get all demo items from page */
    var demoItems = document.querySelectorAll('.c-tooltip-help');

    /* Add items from nodeList into an array */

    var i;
    var numDemos = demoItems.length;

    var demoItemsArray = [];
    var width = window.innerWidth;
    var height = window.innerHeight;

    for(i=0; i < numDemos; i++){
        demoItems[i].innerHTML = '<span class="c-tooltip-help__message-icon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span>' + demoItems[i].innerHTML;
        /*demoItems[i].addEventListener('mouseover', function(){
            if(this.style.right > width + 'px'){
                this.style.right = width + 'px';
            }
        });*/

    }

    var block4 = document.querySelector('.block4');
    var block4Tooltip = block4.querySelector('.c-tooltip-help__message-icon');
    var block4Message = block4.querySelector('.c-tooltip-help__message');
    var leftOffSet = block4Message.offsetLeft;
    var screenwidth = block4Message.clientWidth;
    var scrollX;
    block4Tooltip.addEventListener('mouseover', function(){
        scrollX = window.scrollX;
        if(scrollX > (screenwidth)){
            console.log('wider than screen');
        }
        console.log(leftOffSet);
    });



    console.log(width);
    console.log(height);


})();