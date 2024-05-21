function populateGamePage(){
    
    //Reset DOM, Set Blank space above
    itemContainer.textContent = '';
    //spacer
    const topSpacer = document.createElement('div');
    topSpacer.classList.add('height-240');
    //selected item
   /*  const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item'); */
    //Append
    itemContainer.append(topSpacer);
    //ctreat equations , build elements in DOM
    createEquations();
    equationsToDOM();
    //set blank space below
    const bottomSpacer = document.createElement('div');
    bottomSpacer.classList.add('height-500');
    itemContainer.append(bottomSpacer);
}