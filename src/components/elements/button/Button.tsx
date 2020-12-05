import React, { PureComponent, Fragment } from "react";
import styles from "./Text.module.scss";
import classnames from "classnames";

type Props = {
    text: string,
    variant?: any,
    link?: string,
    strong?: boolean,
    extraLarge?: boolean,
    clickFunc?: () => void,
}

class Text extends PureComponent<Props> {

    render() {
        const { text, variant = "p", strong = false, link, extraLarge = false, clickFunc } = this.props;
        let ComponentType = variant;

        return (
            <Fragment>
                {link ? (
                    <a className={classnames(styles.link)} href={link}>
                        <ComponentType
                            className={classnames(
                                styles.root, styles.link,
                                { [styles.strong]: strong },
                                { [styles.extraLarge]: extraLarge },
                                { [styles.notRendered]: !text }
                            )}
                            onClick={clickFunc}
                        >
                            {text}
                        </ComponentType>
                    </a>
                ) : (
                        <ComponentType
                            className={classnames(
                                styles.root,
                                { [styles.strong]: strong },
                                { [styles.extraLarge]: extraLarge },
                                { [styles.notRendered]: !text }
                            )}
                            onClick={clickFunc}
                        >
                            {text}
                        </ComponentType>
                    )}
            </Fragment>
        );
    }
}

export default Text;