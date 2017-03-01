(function(){

    /* Get all demo items from page */
    var demoItems = document.querySelectorAll('[c-demo-order^="demo"]');

    /* Add items from nodeList into an array */

    var i,j;
    var numDemos = demoItems.length;

    var demoItemsArray = [];

    for(i=0; i < numDemos; i++){
        demoItemsArray.push(demoItems[i]);
    }

    /* Sort array to ensure we have the correct ordering */

    demoItemsArray.sort(function(a,b){
        if (a.attributes['c-demo-order'] < b.attributes['c-demo-order'])
            return -1;
        if (a.attributes['c-demo-order'] > b.attributes['c-demo-order'])
            return 1;
        return 0;
    });

    for(j = 0; j < demoItemsArray.length; j++){
        console.log(demoItemsArray[j].children);
    }

  /*  console.log(demoItemsArray);*/


})();