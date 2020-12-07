import React from "react";
import styles from "./Button.module.scss";
import classnames from "classnames";

type Props = {
    children: any,
    style?: 'google' | 'facebook',
    func?: () => void,
}

function Button(props: Props) {
    const { children, style, func } = props;

    const handleClick = () => {
        if(func) {
            return func();
        }else {
            return null;
        }
    };

    return (
        <button onClick={handleClick} className={classnames(
            styles.root,
            { [styles.icon]: style },
            { [styles.google]: style === 'google' },
            { [styles.facebook]: style === 'facebook' },
        )}>
            {children}
        </button>
    );
}

export default Button;