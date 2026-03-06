const sniptName = ['New', 'Check Odd Even logic', 'Factorial','Is Prime', 'ARRAY: Array Transformation']
const codeSnipts = [`// Start writing code here`,
`let num = prompt('Enter a number: ');
if(num % 2 == 0) {
    console.log("Even Number");
} else {
    console.log("Odd Number");
}`,
`// Factorial
const num = prompt("Enter a Number:");
let fact = 1;
for(let i = 1; num >= i; i++){
    fact *= i;
}
console.log("factorial of the " + num +" is "+ fact);`,
`//Method 1 ------ is Prime
let val = prompt("Enter a Number: ");
let count = 0;

for(let i = 1; i <= val; i++){
    if(val % i == 0) {
        count++;
    }
}
if(count == 2){
    console.log(val +" is a Prime Number");
} else {
    console.log(val +" is not a Prime number");
}
    
// METHOD2 : ------ isPrime
const val = prompt("Enter a number: ");
let isPrime = 0;
let i = 1;

while(val >= i){
    if(val % i == 0){
        isPrime++;
    }
    i++;
}

if(isPrime == 2){
    console.log("The number "+ val + " is a Prime");
}else{
    console.log("The number "+ val + " is not a prime");
}`,
`/* DOUBLE and PRINT elements of the array grater than 5*/

var arr = [2,3,6,64,4,73,5];

// METHOD 1-----------
var upgradedArr = new Array;
for(var i = 0; i <= arr.length-1; i++){
    var temp = arr[i];
    if(temp > 5){
        upgradedArr.push(temp*2);
    }
}
console.log(upgradedArr);

// METHOD 2---------
var upgradedArr1 = new Array;
arr.forEach(element => {
    if(element > 5){
        upgradedArr1.push(element*2);
    }
});
console.log(upgradedArr1);
`]
const sniptDis = [`<h1>Write your script</h1>`, 
`<h1>${sniptName[1]}</h1>
<p>Those numbers are completly devided by 2 are <strong>Even</strong> and Non divisible by 2 are <strong>Odd</strong></p>
<strong>Logic :</strong>
<ul style="margin-left: 20px;">
<li>Enter a nummber: 5</li>
<li>Now snipt check the divisiblity of Entered Number with moduls operator.</li>
<li>Output: Odd Number</li>`,
`<h1>${sniptName[2]}</h1>
<p>Factorial of a number is defined by multiple of self to all lower no.</p>
<p> Example: </p>
<ul style="margin-left:20px">
<li>Input: 5</li>
<li>Execution: 5x4x3x2x1</li>
<li>Output: 120</li>
</ul>`,
`<h1>${sniptName[3]}</h1>`,
`<h1>${sniptName[4]}</h1>
<ul style="margin-left: 20px;">
<li>var arr = [2, 3, 6, 64, 4, 73, 5]; Pre-Assinged Array.</li>
<li>Write a function that return a new array of the arr[].</li>
<li>Each number is doubled, but only if its grater than 5.</li>
<li>Output: [12, 128, 146].</li>
</ul>`]

let output = document.querySelector('.output');
output.innerHTML = sniptDis[0];
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const tfile = document.getElementById("tabs");
const statusbar = document.getElementById("statusBar");
tfile.innerText = sniptName[0];
const editor = document.getElementById('code-editor');
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const ul = document.querySelector('#js-select');
codeSnipts.forEach((_, index) => {
    const li = document.createElement('li');
    li.innerText = sniptName[index];
    li.onclick = () => changeSnip(index);
    ul.appendChild(li);
});

let editorVal;
require.config({
    paths:{vs:'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'}
});

require(['vs/editor/editor.main'], function() {
    editorVal = monaco.editor.create(document.getElementById('code-editor'), {
        value: codeSnipts[0],
        language: `javascript`,
        theme: 'vs-dark',
        automaticLayout: true,
        readOnly: false
    });
    editorVal.onDidChangeCursorPosition(updateStatusBar);
});

function changeSnip(index) {
    if(index == 0){
        editorVal.setValue(codeSnipts[index]);
        editorVal.updateOptions({readOnly: false});
        output.innerHTML = sniptDis[index];
    } else {
        editorVal.setValue(codeSnipts[index]);
        editorVal.updateOptions({readOnly: true});
        output.innerHTML = sniptDis[index];
    }
    tfile.innerText = sniptName[index];
}

function runCode() {
    const code = editorVal.getValue();
    output.innerHTML = "";
    const originalLog = console.log;
    console.log = function(...args){
        output.innerHTML += args.join(" ") + "<br>";
    };

    try{
        eval(code);
        document.getElementById("cursorStatus").innerText = "Code Executed Successfully";
    }catch(err){
        output.innerHTML += "<span style='color:red'>" + err + "</span>";
        document.getElementById("cursorStatus").innerText = "Error Occurred";
    }

    console.log = originalLog;
}

function updateStatusBar(e){
    const line = e.position.lineNumber;
    const col = e.position.column;
    document.getElementById("cursorStatus").innerText = "Ln " + line + ", Col " + col;
}