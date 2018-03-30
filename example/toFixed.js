function toFixed(number,precision) {

/**helper to move the decimal position
Takes a number and returns a number.
changePosition is the desired change of position for the decimal point starting from the old position.
If positive : moves the dot to the right,  if negative : moves it to the left
**/
  function moveTheDot(number, changePosition){

    var stringForm=String(number);
    //save old dot position
    var oldDotPosition=stringForm.search(/\./);
    //handle case if there is no dot, .search returns -1
    if (oldDotPosition===-1 && changePosition<0){
      oldDotPosition=stringForm.length;
    } else if (oldDotPosition===-1 && changePosition>0){
        oldDotPosition=0;
    }
    //remove the dot(replace the dot with nothing)
    var withoutDot=stringForm.replace(/\./, '');
    // combines string of number preceding new decimal position with,  the decimal point,  and the string of number after the new decimal position
    var withNewDot=withoutDot.substr(0, oldDotPosition+changePosition)+'.'+ withoutDot.substr(oldDotPosition+changePosition);
    return Number(withNewDot);
  };
//move the decimal point to the right precision * number of time  and rounds the resulting number
var rounded= Math.round(moveTheDot(number, precision));
// move the decimal point back, and use native toFixed to trim number to required precison
var result = Number(moveTheDot(rounded, -precision).toFixed(precision));
return result;
}
