import { useState } from "react";
import React from 'react'
import './convertor.css'
import './Table.css';


function Convertor() {
  const [selectedOption, setSelectedOption] = useState('Postfix');
  const [inputValue, setInputValue] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [outputtitle, setoutputtitle] = useState('');
  const [outputvalue, setoutputvalue] = useState('');
  const [srnoarray, setsrnoarray] = useState('');
  const [Expressionarray, setExpressionarray] = useState('');
  const [Stackarray, setStackarray] = useState('');
  const [Postfixarray, setPostfixarray] = useState('');
  
  let srnoarr = [];
  let Expressionarr = [];
  let Stackarr = [];
  let Postfixarr = [];
  let res="";
  let restitle="";

  const handleClick = () => {
    convert();
    setoutputtitle(restitle);
    setoutputvalue(res);
    setsrnoarray(srnoarr);
    setExpressionarray(Expressionarr);
    setStackarray(Stackarr);
    setPostfixarray(Postfixarr);
    setShowContent(true);

  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  class Stack {
    constructor() {
        this.items = [];
    }

    Push(temp) {
        return this.items.push(temp);
    }

    Pop() {
        if (this.items.length > 0) {
            return this.items.pop();
        }
    }

    Top() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        if (this.items.length === 0) {
            return true;
        };
        return false;

    }
  

}

function oprend(temp) {
    if (temp !== '+' && temp !== '-' &&
        temp !== '^' && temp !== '*' &&
        temp !== '/' && temp !== '(' &&
        temp !== ')') {
        return true;
    }
    else
        return false;
}


function checkPrecedence(temp, obj) {
  if (obj.Top() === '(') {
      return false;
  }
  else if (temp === ')') {
        return true;
  }
    else if ((obj.Top() === '^' && temp === '^') || (obj.Top() === '^' && temp === '/') || ( obj.Top() === '^' && temp === '*'
    )||( obj.Top() === '^' && temp === '+') ||( obj.Top() === '^' && temp === '-')) {

        return true;
    }

    else if ((obj.Top() === '/' && temp === '/') ||( obj.Top() === '/' && temp === '*') ||(
        obj.Top() === '/' && temp === '+') || (obj.Top() === '/' && temp === '-')
    ) {

        return true;
    }
    else if ((obj.Top() === '*' && temp === '*' )|| (obj.Top() === '*' && temp === '+') ||
        (obj.Top() === '*' && temp === '-')) {

        return true;
    }
    else if ((obj.Top() === '+' && temp === '+') ||
        (obj.Top() === '+' && temp === '-')) {

        return true;
    }
    else if (obj.Top() === '-' && temp === '-') {

        return true;
    }
    else {
        return false;
    }

}


function infixTOpostfix(Input) {
    let temp;
    let stack='';
    let postfix = "";
    let postfix1 = "";
    let Infix = Input;
    let obj = new Stack();
    let obj1 = new Stack();
    
    for (let i = 0; i < Infix.length; i++) {
        temp = Infix[i];
        stack='';
        Expressionarr[i]=temp;

        if (oprend(temp)) {
            postfix = postfix.concat(temp);

        }
        else {
            while (!obj.isEmpty() && checkPrecedence(temp, obj)) {

                if (obj.Top() !== '(') {
                    postfix = postfix.concat(obj.Pop());

                }
                
            }
            if (temp !== ')') {
                obj.Push(temp);

            }
            else if (obj.Top() === '(' && temp ===')') {
              obj.Pop();
              temp='';
          }

        }
        while (!obj.isEmpty()) {
            let pop;
            pop=obj.Pop();
            stack = stack.concat(pop);
            obj1.Push(pop);
    
        }
       
      stack = reverseString(stack);
        while (!obj1.isEmpty()) {
            obj.Push(obj1.Pop());
        }
        console.log(i,temp,stack,postfix);

        // { id: i, Expression: temp , stack:stack  ,postfix:postfix }
        srnoarr[i]=i+1;
        Stackarr[i]=stack;
        if(selectedOption !== 'Postfix'){
          postfix1=postfix;
          postfix1= reverseString(postfix1);
          Postfixarr[i]=postfix1;
          postfix1='';
        }
        else{
          
          Postfixarr[i]=postfix;
        }
        
        
    }
    while (!obj.isEmpty()) {
        postfix = postfix.concat(obj.Pop());

    }
    srnoarr[Infix.length]=Infix.length;
    Expressionarr[Infix.length]='';
    Stackarr[Infix.length]='';
    if(selectedOption !== 'Postfix'){
    Postfixarr[Infix.length]= reverseString(postfix);
    }
    else{

      Postfixarr[Infix.length]=postfix;
    }

    return postfix;

}

function reverseString(str) {

  const arrayStrings = str.split("");
 
  const reverseArray = arrayStrings.reverse();

  const joinArray = reverseArray.join("");
  
  return joinArray;
}
function infixTOprefix(input) {
  let prefix = "";
  Object.freeze(input);

const Infix = [...input];

  Infix.reverse();
  for (let i = 0; i < Infix.length; i++) {
      if (Infix[i] === '(') {
          Infix[i] = ')';
      }
      else if (Infix[i] === ')'){
          Infix[i] = '(';

      }
  }
  prefix = infixTOpostfix(Infix);
  prefix = reverseString(prefix);
  return prefix;

}

const convert=()=>{
  
  setShowContent(true);
    if (selectedOption === 'Postfix'){
      res = infixTOpostfix(inputValue);
      restitle="Postfix: ";
      
    }
    else{
      res = infixTOprefix(inputValue);
      restitle="Prefix: ";
    }
    console.log(res);
    console.log(restitle);

}


  return (
    <div className='main'>
      <div class="infixConverter">
        <h4>Enter the Infix expression below in box without space</h4>
        <input type="text" className="infixInput" id="infixInput" placeholder="A+B/C*(D-A)^F^H" onChange={handleInputChange} />
    
        <div className="PostfixOrPrefix">
          <input type="radio" className="radio" value="Postfix" checked={selectedOption === "Postfix"} onChange={handleOptionChange} />
          <label for="Prefix">
            <h4>Postfix</h4>
          </label>
          <input type="radio" className="radio" value="Prefix" checked={selectedOption === "Prefix"} onChange={handleOptionChange} />
          <label for="Prefix">
            <h4>Prefix</h4>
          </label>
        </div>
        <input type="button" value="Convert" id="convert" className="convertbtn" onClick={handleClick } />
        {showContent &&(
           <>
           <div className="Result">
           <h2 id="Resulttitle">{outputtitle}</h2>
           <h3 id="result">{outputvalue}</h3>
         </div>
         <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Expression</th>
          <th>Stack</th>
          <th>{outputtitle}</th>

        </tr>
      </thead>
      <tbody>
           {(() => {
        const rows = [];

        for (let i = 0; i < srnoarray.length; i++) {

          rows.push(
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{Expressionarray[i]}</td>
              <td>{Stackarray[i]}</td>
              <td>{Postfixarray[i]}</td>
            </tr>
          );
        }
        return rows;
      })()}
      </tbody>
    </table>
    </div>
         </>
      )}
      </div>
    </div>
  )
}

export default Convertor