import React from 'react';
import styles from './Popup.module.css';

const Popup = ({
    message
}) => (
    <div
        className={styles.popup}
    >
        {message}
    </div>
)

export default Popup;
