import React from "react";
import styles from "./Button.module.scss";
import classnames from "classnames";

type Props = {
    children: any
}

function Button(props: Props) {
    const { children } = props;
    return (
        <button className={classnames(styles.root)}>
            {children}
        </button>
    );
}

export default Button;