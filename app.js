/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("main").style.marginLeft = "0px";
}
// add event listeners to be able to record user information on 
// attribute, other Bonuses, and target AC.

// for attr and targetAC if a user deletes the input the number defaults to 0
// to get around that add an event listener
// if the Number(value) === 0 then set it to ""
let attr;
//

document.getElementById("attribute").addEventListener("keyup", function() {
attr = Number(document.getElementById("attribute").value)

});

/* document.getElementById("attribute").addEventListener("keyup", function() {
  if(Number(document.getElementById("attribute").value) === 0){
    document.getElementById("attribute").value) = "";
  }};
*/


let otherBonus;


document.getElementById("otherBonus").addEventListener("keyup", function() {
  otherBonus = Number(document.getElementById("otherBonus").value)
  });


let targetAC;


document.getElementById("targetAC").addEventListener("keyup", function() {
  targetAC = Number(document.getElementById("targetAC").value)
  });

// set up variable to detect which combat circumstances are present/selected
// ele contains all the elements in the combat circumstances
  var ele = document.getElementsByName('num_die'); 


//



  // add functions to make style.borderColor === ""
  // add more logic to the calculate button
// add calcChances() to openbtn
// assign openbtn 2

//const calc = document.getElementById('calc');

//document.getElementById('calc').addEventListener("onclick", function(){
 // calcChances();
//});

//var elem = document.querySelector('#some-element');
//elem.parentNode.removeChild(elem);
function calcChances() {
  // Prevent a user from spamming the button adding many headers
  document.getElementById("calc").disabled = true;
  setTimeout(() => {
    document.getElementById("calc").disabled = false;
  }, 1650)
  
  let check = document.getElementById('myTable');
  if(typeof(check) != 'undefined' && check != null){
    removeTable()
    document.getElementById("forTable").style.opacity = 0;
    return;
  }

  else if(document.getElementById("attribute").value === "" || document.getElementById("targetAC").value === ""){
    formValidate();
    setTimeout(returnToWhite, 1500);
  }
 
  //If it isn't "undefined" and it isn't "null", then it exists.
  else{
    
    // 
    document.getElementById("calc").style.backgroundColor = "red";
    document.getElementById("calc").innerHTML = "Delete & Recalculate";
    // function that gets all the relevant numbers to calculate the attacks based on
    document.getElementById("loading").style.display = "block";
    //document.getElementById("loading").style.opacity = 1;
    setTimeout(hideGif, 1500);

    setTimeout(buildRest, 1650);
    //document.getElementById("loading").style.opacity = 0;
  
//setTimeout(returnToWhite(), 2000)
  }
}

// set time out return inputs to default

function returnToWhite() {
  document.getElementById("targetAC").style.borderColor = "";
  document.getElementById("attribute").style.backgroundColor = "";

  document.getElementById("attribute").style.borderColor = "";
  document.getElementById("targetAC").style.backgroundColor = "";
}

function to_hit() {
// returns a number of spots on D20 that registers a hit

// define  attribute modifier
    // calculate attribute modifier
    let attrMod = Math.floor((attr-10)/2)
    // define the profiency bonus value as a number
    let profBonusValue = Number(profBonus.value);
    // let
    if(document.getElementById("otherBonus").value === ""){
      let otherBonus = 0;
    }
   
  let total =  Math.floor((attr-10)/2) + Number(profBonus.value) + Math.floor(Number(document.getElementById("otherBonus").value));
  
  let minRoll = targetAC - total;
 
  // ensure that if the minimum roll is outside of D20 range
  // the minimum roll goes back to 20 because a 20 always hits.
  if(minRoll > 20){
    // this gives you number of .05% that an attack has to it.
  
    minRoll = 20}
  return 21 - minRoll;
  // this gives you number of .05% that an attack has to it.
}


// REG function
// calculate chance to hit with regular circumstances
 function REG(toHitNum){
  let my_num = new Big(toHitNum);
  let chance = my_num.times(.05).times(100);
  return Number(chance.valueOf());
 }




// ADV function
// calculate the chance to hit with advantage circumstances
function ADV(toHitNum){


  let ToHit = new Big(toHitNum);
  let p = ToHit.times(.05);
  let x = p.minus(1).times(p.minus(1));
  return Number(x.minus(1).abs().times(100).valueOf())

}

// DIS function
// calculate the chances with disadvantage

function DIS(toHitNum) {
  let toHit = new Big(toHitNum);

  let p = toHit.times(.05);

  return Number(p.times(p).round(3).times(100).valueOf())
}

// EA function

// calculate the chances with Elven Accuracy
function EA(toHitNum){
  let ToHit = new Big(toHitNum);
  let p = ToHit.times(.05);
  let eaP = p.minus(1);
  let x = eaP.times(eaP).times(eaP);
  let endMinus = Number(x.abs().valueOf());
  return 100*(1-endMinus);
}


// function to determine which combat situation was chosen

function getCircumstances () {
  for(i = 0; i < ele.length; i++){
      if(ele[i].checked)
          return circumstance1 = ele[i+1].innerHTML}
  }


  // function to iterate over and insert table rows
  function buildTable(){
            //  the numbers in buildIt serve as placeholders to call
            // the functions REG, DIS, ADV, and EA
    let theCircumstance = getCircumstances();
    
    if(theCircumstance === "Regular"){
      buildIt(0)
    }
    
    else if(theCircumstance ==="Disadvantage"){
    buildIt(1)
    }
    
    else if(theCircumstance ==="Advantage"){
    buildIt(2)
    }
    
    else {
    buildIt(3)
    }}


    function buildIt(the_num) {

      let numSidesOfDieThatHit = to_hit();
      let SidesOfDieThatHit1 = to_hit();
      

      tableRef = document.getElementById("myTable")
      
      
      let tempAC = targetAC
      
      for (i=0; i<numSidesOfDieThatHit; i++){
      
        let newRow = tableRef.insertRow(-1);
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(tempAC);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(1);
         
      // create the next <td> which the number must be run through REG/ADV/DIS/EA function to get
      
      
      td2 = document.createElement("td");
      if (the_num === 0) {
        newText  = document.createTextNode(`${REG(SidesOfDieThatHit1)} %`)
      }
      else if(the_num === 1){
        newText  = document.createTextNode(`${DIS(SidesOfDieThatHit1)} %`)
      }
      else if(the_num === 2) {
        newText  = document.createTextNode(`${ADV(SidesOfDieThatHit1)} %`)
      }
      else {
        newText  = document.createTextNode(`${EA(SidesOfDieThatHit1)} %`)
      }
          newCell.appendChild(newText)
         
      
      // decrease numSidesOfDieThatHit
      SidesOfDieThatHit1--
     
      // increase the target AC by one for the next loop
      tempAC++
      }
      }


// function to hide UI loading gif

function hideGif(){
  document.getElementById("loading").style.display = "none";
}

function buildRest(){
  toHitNum = to_hit();

      // loop to continually calculate the chance to hit.
   


  
    // create a new table and append it into the div .forTable 
  
    var x = document.createElement("table");
    x.setAttribute("id", "myTable");
    document.getElementById("forTable").appendChild(x);

    // create a tr element
    // set to myTr id
    // append it into myTable
  
    var y = document.createElement("tr");
    y.setAttribute("id", "myTr");
    document.getElementById("myTable").appendChild(y);

    // create a table header element
    // create a text node "Target AC"
    // append the TextNode to the th element
    // then append the th element to 
    
    var th1 = document.createElement("th")
    var th1node = document.createTextNode("Target AC")
    th1.appendChild(th1node)
    document.getElementById("myTr").appendChild(th1)


    // create another table header
    // create the text node
    // put the text node inside the header
    // then append the child

    var th2 = document.createElement("th")
    var th2node = document.createTextNode("Your Chances")
    th2.appendChild(th2node)
    document.getElementById("myTr").appendChild(th2)

    // UI X

    // create X for user to delete old table
    removeX = document.createElement('a');

    removeX.id = 'forRemove';

   removeX.innerHTML = '&#10006;'

    document.getElementById("forTable").appendChild(removeX);
    document.getElementById("forRemove").addEventListener("click", function(){removeTable()}, false); 


    buildTable();
    document.getElementById("forTable").style.opacity = 1;
   
}

// function to remove the table

function removeTable (e){
  document.getElementById("myTable").remove();
  document.getElementById("forRemove").remove();
  document.getElementById("calc").style.backgroundColor = "";
    document.getElementById("calc").innerHTML = "Calculate";
}



// functions to make border colors red temporarily
function formValidate() {
    if(document.getElementById("attribute").value ===""){
      document.getElementById("attribute").style.borderColor = "red";
      document.getElementById("attribute").style.backgroundColor = "red";
    }
    if(document.getElementById("targetAC").value ===""){
      document.getElementById("targetAC").style.borderColor = "red";
      document.getElementById("targetAC").style.backgroundColor = "red";
    }
}
// put all the odds into an array?

// then use the forEach.() to each into a <td> 

// how will I make a function to put everything into an array?

// element.insertAdjacentHTML(position, text);
/* beforebegin': Before the element itself.
'afterbegin': Just inside the element, before its first child.
'beforeend': Just inside the element, after its last child.
'afterend'

*/

// document.getElementById('tag-id').innerHTML = '<ol><li>html data</li></ol>';
  //var x = document.createElement("TABLE");
 // x.setAttribute("id", "myTable");
 // document.body.appendChild(x);

 // var y = document.createElement("TR");
 // y.setAttribute("id", "myTr");
  //document.getElementById("myTable").appendChild(y);

 // var z = document.createElement("TD");
 // var t = document.createTextNode("cell");
 // z.appendChild(t);
 // document.getElementById("myTr").appendChild(z);
//}
//</script>


// Confirms how to see if radio dial is submitted.
// console.log says "on"

//console.log(document.getElementById("DIS").value)