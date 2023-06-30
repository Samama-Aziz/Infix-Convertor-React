import React from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import './Table.css';

function DynamicTable(props) {
  const [srnoarray, setsrnoarray] = useState('');
  const [Expressionarray, setExpressionarray] = useState('');
  const [Stackarray, setStackarray] = useState('');
  const [Postfixarray, setPostfixarray] = useState('');
  
  let srnoarr = [];
  let Expressionarr = [];
  let Stackarr = [];
  let Postfixarr = [];
  
  useEffect(() => {

    if(props.title ==='Postfix'){

      infixTOpostfix(props.infix);
    }
    else{
      infixTOprefix(props.infix);
    }
    setsrnoarray(srnoarr);
    setExpressionarray(Expressionarr);
    setStackarray(Stackarr);
    setPostfixarray(Postfixarr);
    console.log(srnoarray);
    console.log(Expressionarray);
    console.log(Postfixarray);
    console.log(Stackarray);
  }, []);
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
  if (temp === ')') {
      return true;
  }
  if (obj.Top() === '(') {
      return false;
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
    let Infix = Input;
    let obj = new Stack();
    let obj1 = new Stack();
    
    for (let i = 0; i < Infix.length; i++) {
        temp = Infix[i];
        stack='';
        if (oprend(temp)) {
            postfix = postfix.concat(temp);

        }
        else {
            while (!obj.isEmpty() && checkPrecedence(temp, obj)) {

                if (obj.Top() !== '(') {
                    postfix = postfix.concat(obj.Pop());

                }
                else {
                    obj.Pop();
                }
            }
            if (temp !== ')') {
                obj.Push(temp);

            }

        }
        while (!obj.isEmpty()) {
            let pop;
            pop=obj.Pop();
            stack = stack.concat(pop);
            obj1.Push(pop);
    
        }
        while (!obj1.isEmpty()) {
            obj.Push(obj1.Pop());
        }
        console.log(i,temp,stack,postfix);

        // { id: i, Expression: temp , stack:stack  ,postfix:postfix }
        srnoarr[i]=i+1;
        Expressionarr[i]=temp;
        Stackarr[i]=stack;
        Postfixarr[i]=postfix;
        
        
    }
    while (!obj.isEmpty()) {
        postfix = postfix.concat(obj.Pop());

    }
    srnoarr[Infix.length]=Infix.length;
    Expressionarr[Infix.length]=' ';
    Stackarr[Infix.length]=' ';
    Postfixarr[Infix.length]=postfix;

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

  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>Sr.no</th>
          <th>Expression</th>
          <th>Stack</th>
          <th>{props.title}</th>

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
  );
}

export default DynamicTable;
