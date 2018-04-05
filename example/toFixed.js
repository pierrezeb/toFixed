function toFixed(number,precision) {
//use native toFixed if usable (i.e: if no decimal point or if precision> number of decimals after the dot)
var string=String(number);
var split=string.split('.');
if (Boolean(!split[1]) || precision>=split[1].length){
  return number.toFixed(precision)
}
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
    }
    //remove the dot(replace the dot with nothing)
    var withoutDot=stringForm.replace(/\./, '');
    // combines string of number preceding new decimal position with,  the decimal point,  and the string of number after the new decimal position
    var withNewDot=withoutDot.substr(0, oldDotPosition+changePosition)+'.'+ withoutDot.substr(oldDotPosition+changePosition);
    return withNewDot;
  };

  /**helper : round numbers as a string
  **/
  function roundString(string){
    var splitArray=String(string).split('.');
    var beforeDot=splitArray[0];
    var afterDot=splitArray[1];

    // recursive function to increment by one a number as string
    function increment (substring){

      var allButLast=substring.slice(0,-1)
      var lastDigit=substring.slice(-1);
      //base case 1 : if digit <9 return allButLast + digit +1
      if (lastDigit<9){
        return allButLast + String(Number(lastDigit)+1)
      }
      //base case 2 if first digit  === 9 and string is only one digit long return 10
      if (lastDigit===9 && string.length===1){
        return '10'
      }
      //recursive case if lastDigit === 9 recurse with allButLast and add à '0' at the end of resulting string
      return increment(allButLast)+'0'
    }

    //if decimal point exist start rounding, else return string
  if (Boolean(afterDot)){
    //save value of digit after the dot
    var toEvaluate=Number(afterDot.slice(0,1))
    //if digit after the dot<5 return beforeDot
    if (toEvaluate<5){
      return beforeDot;
    }
    else {
      return increment(beforeDot)
    };
  } else
  return beforeDot

};

//move the decimal point to the right precision * number of time  and rounds the resulting string
var rounded= roundString(moveTheDot(number, precision));
// move the decimal point back, and use native toFixed to trim number to required precison
var result = Number(moveTheDot(rounded, -precision)).toFixed(precision);
return result
}
