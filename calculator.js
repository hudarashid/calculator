let runningTotal = 0;
let buffer = "0"; //display at the top black screen (note that number displayed is in string "12")
let previousOperator = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    //console.log("here");
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  //console.log(value);
  if (isNaN(parseInt(value))) {
    //is isNOTaNumber, which is symbol
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    //if hit 0, means dont append it
    buffer = value;
  } else {
    buffer += value; //if hit 2, and hit 5, it become 25 (note that it is a string)
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return; //do nothing
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0"; //if hit one num, backspace will become "0"
      } else {
        buffer = buffer.substring(0, buffer.length - 1); //take off the last number
      }
      break;
    default:
      //for operator
      handleMath(value);
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer; //keep previous num here, click 5, then click '+', we keep '5' in this var
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
