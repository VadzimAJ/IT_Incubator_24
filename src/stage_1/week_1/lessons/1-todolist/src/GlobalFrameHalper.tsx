import React, { useState, useEffect, cloneElement } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FilteredValuesType, TaskType } from './App';
import { Button } from './Button';
import { PropsType } from './Todolist';
import { Todolist } from './Todolist';

interface GlobalFrameHelperProps {
  children: React.ReactElement<PropsType>;
}

export const GlobalFrameHelper = ({ children }: GlobalFrameHelperProps) => {
  const todolistProps = children.props;

  const entries = Object.entries(todolistProps);

  const entryElements = entries.map(([key, value]) => (
    <div className="">
      <li key={key}>
        <strong>{key}</strong>: type is {typeof value}<br />
        {`${value}`}
      </li>
    </div> 
  ));
  

  console.log(entryElements);

  const clonedTodolist = cloneElement(children, {
    // здесь вы можете добавить новые пропсы, если вам это нужно
  });

  return (
    <div className="frame-body">
      <div className="frame-app">
        {clonedTodolist}
      </div>
      
      <div className="frame-app-helper">
        <p>Hello World</p>
        {entryElements}
      </div>
    </div>
  );
};