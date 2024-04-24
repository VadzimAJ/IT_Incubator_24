import React, { MouseEvent } from 'react';
import './index.css';

type ButtonProps = {
    onClick: () => void;
};

export function Button(props: ButtonProps) {
    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log((typeof e) === 'object');
    };

    return <button onClick={onClickHandler}>Click</button>;
}