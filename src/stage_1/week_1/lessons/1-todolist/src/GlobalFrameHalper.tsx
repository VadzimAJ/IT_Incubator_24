import React, { useState, useEffect, cloneElement } from 'react';
import { Button } from './Button';
import { PropsType } from './Todolist';

interface GlobalFrameHelperPropsType {
  children: React.ReactElement<PropsType>;
}

export const GlobalFrameHelper = ({ children }: GlobalFrameHelperPropsType) => {

  const todolistProps = children.props;
  const nameOfProps = todolistProps.propsName;
  const componentName = todolistProps.componentName;

  const entriesFromProps = Object.entries(todolistProps);

  type IsOpenStateType = {
    [key: number]: boolean;
  }

  const initialIsOpenState: IsOpenStateType = {};

  entriesFromProps.forEach((_, idx) => {
    initialIsOpenState[idx] = false;
  });

  const [isOpenState, setIsOpenState] = useState<IsOpenStateType>(initialIsOpenState);
  const [toggleAllState, setToggleAllState] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setIsOpenState(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const toggleAllElements = () => {
    setIsOpenState(prevState => {
      const areAllOpen = Object.values(prevState).every(isOpen => isOpen);
      const updatedState: IsOpenStateType = {};

      for (const index in prevState) {
        updatedState[index] = !areAllOpen;
      }

      setToggleAllState(prevToggleAllState => !prevToggleAllState);
      return updatedState;
    });
  };

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
                        {k}: {v.toString()}<br />
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
            title='Open All'
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
