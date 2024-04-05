import React, { useState, useEffect, cloneElement } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FilteredValuesType, TaskType } from './App';
import { Button } from './Button';
import { PropsType } from './Todolist';

interface GlobalFrameHelperPropsType {
  children: React.ReactElement<PropsType>;
}

export const GlobalFrameHelper = ({ children }: GlobalFrameHelperPropsType) => {

  
  const todolistProps = children.props;
  const nameOfProps = todolistProps.propsName;
  const pathToProps = todolistProps. pathToProps;
  const componentName = todolistProps.componentName;

  const entriesFromProps = Object.entries(todolistProps);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }; 

  const entryElements = entriesFromProps.map(([key, value]) => {
    return (
      <div>
        {typeof value === 'object' 
          ? ( Array.isArray(value) 
            ? (<li key={key} onClick={handleClick}>
              <span className="frame-app-helper-span"  >
                <strong>{key}</strong>: type is {typeof value}<br />
              </span>
              <div className= {`content ${isOpen ? 'open' : ''}`}>
                {value.map((item, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(item).map(([k, v]) => (
                      <React.Fragment key={k}>
                        {k}: {v}<br />
                      </React.Fragment>
                    ))}
                    <br />
                  </React.Fragment>
                ))}</div>
                
              
              
            </li>)
            : (<li key={key} onClick={handleClick}>
              <span className="frame-app-helper-span">
                <strong>{key}</strong>: type is {typeof value}<br />
              </span>
              <div className={`content ${isOpen ? 'open' : ''}`} >
              {JSON.stringify(value)}<br /><br />
              </div>
          </li>)
          
          ) : (
            <li key={key}>
              <span >
                <strong>{key}</strong>: type is {typeof value}
                </span>
                <div className="frame-app-helper-content content" onClick={handleClick}> 
                {`${value}`}<br />
                </div>
                
              
            </li>
          )}
      </div>
    );
  });

  const childString = `<${componentName}\n` +
    entriesFromProps.map(([key, value]) => {
      return `  ${key}={${typeof value === 'object' ? JSON.stringify(value) : `'${value}'`}}`;
    }).join('\n') +
    '\n/>';

  const clonedTodolist = cloneElement(children, {
  });

  return (
    <div className="frame-body">
      <div className="frame-app">
        {clonedTodolist}
      </div>

      <div className="frame-app-helper">
        <p>Hello World</p>
        <div className="collapsible">
          <h3>{nameOfProps} of {componentName} component:</h3>
          {entryElements}
          <SyntaxHighlighter language="jsx" style={docco}>
            {childString}
          </SyntaxHighlighter>
        </div>

        <div>
          
          
        </div>
      </div>
    </div>
  );
};
