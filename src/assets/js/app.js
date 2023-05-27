/*===========================
| | | | Dropwn
=============================
 */

function dropdown(){
    //get all dropdown elements
    const dropdowns = document.querySelectorAll(".dropdown");
   
    //loop through all dropdown elemenets
    dropdowns.forEach(dropdown =>{

        //get inner elements from each dropdown
        const select = dropdown.querySelector(".select");
        const caret = dropdown.querySelector(".caret");
        const menu  = dropdown.querySelector(".menu");
        // const options  = dropdown.querySelector(".menu li");
        const selected  = dropdown.querySelector(".selected");
        /*using below o make */

        //add a click event to select element
        select.addEventListener('click', () =>{
            //add the rotate styles to caret element
            select.classList.toggle('select-clicked');
            //add the rotae styles to the caret element
            caret.classList.toggle('caret-rotate');
            //add the open styles to the menu element
            caret.classList.toggle('menu-open');
        })
    });

    const options  = dropdown.querySelector(".menu li");
    //loop through all options element
    options.forEach(option =>{
        //add a click event to the option element
        option.addEventListener('click', ()=>{
            //change selected inner text to clicked option inner text
            selected.innerText = option.innerText;
            //add the clicked select styles to the select element
            select.classList.remove('select-clicked');
             //add the rotae styles to the caret element
        caret.classList.remove('caret-rotate');
         //add the open styles to the menu element
         menu.classList.remove('menu-open');
         //remove active class from all option elements
         options.forEach(option =>{
            option.classList.remove('active');
         });
         //add active class to clicked option element
         option.classlist.add('active');
        }); 


    });
}

export {
   dropdown

}
