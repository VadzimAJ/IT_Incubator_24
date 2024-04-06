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
  const pathToProps = todolistProps.pathToProps;
  const componentName = todolistProps.componentName;

  const entriesFromProps = Object.entries(todolistProps);

  interface IsOpenStateType {
    [key: number]: boolean;
  }
  interface toggleAllStateType {
    toogleAll: boolean;
  }
  
  const [isOpenState, setIsOpenState] = useState<IsOpenStateType>(Object.fromEntries(entriesFromProps.map((_, index) => [index, false])));
  const [toggleAllState, setToggleAllState] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setIsOpenState(prevState => ({
      ...prevState,
      [index]: !prevState[index] 
    }));
  };

  const toggleAllElements = () => {
    setIsOpenState(prevState => {
      const updatedState: IsOpenStateType = {};
      const newToggleAllState = !toggleAllState; 
      for (const index in prevState) {
        updatedState[index] = newToggleAllState; 
      }
      setToggleAllState(newToggleAllState);
      return updatedState;
    });
  };

  const toggleAllTitle = toggleAllState ? 'Close all' : 'Open all';

  const spanFragment = (key: string, value: any) => (
    <span className="frame-app-helper-span clicble"  >
      <strong>{key}</strong>: is {typeof value} type<br />
    </span>
  );

  const entryElements = entriesFromProps.map(([key, value], index) => {
    const isOpen = isOpenState[index] || false; 
    return (
      <div key={key}>
        {typeof value === 'object'
        //IF VALUE isObject
          ? ( Array.isArray(value) 
          //IF OBJECT is Array
            ? (<li key={key} onClick={() => handleClick(index)}>
              {spanFragment(key, value)}
              <div className={isOpen ? 'open' : 'close'}>

                {value.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {Object.entries(item).map(([k, v]) => (
                      <React.Fragment key={k}>{typeof v === "boolean"}
                        {k}: {v}<br />
                      </React.Fragment>
                    ))}
                    <br />
                  </React.Fragment>
                ))}
                
              </div>
            </li>)
            //IF OBJECT is !Array
            : (<li key={key} onClick={() => handleClick(index)}>
              {spanFragment(key, value)}
              <div className={isOpen ? 'open' : 'close'} >
              {JSON.stringify(value)}<br /><br />className={isOpen ? 'open' : 'content'}
              </div>
          </li>)
          //IF VALUE !isObject
          ) : (
            <li key={key} onClick={() => handleClick(index)}>
                {spanFragment(key, value)}
                <div className={isOpen ? 'open' : 'close'}> 
                {`${value}`}<br />
                </div>
            </li>
          )}
      </div>
    );
  });

  const clonedTodolist = cloneElement(children, {
  });

  

  return (
    <div className="frame-body">
      <div className="frame-app">
        {clonedTodolist}
      </div>

      <div className="frame-app-helper" >
        <div className="collapsible" >
          <h3>{nameOfProps} of {componentName} component:</h3>
          <Button
            propsName="ButtonPropsType"
            className={"Open-all"}
            title="{toggleAllTitle() as string}"
            onClick={toggleAllElements}
          
          />
          {entryElements}
        </div>

        <div>
          
          
        </div>
      </div>
    </div>
  );
};
