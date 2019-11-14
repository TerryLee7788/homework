import React from 'react';

import styles from './Loading.module.css';

const Loading = ({
    isFetching
}) => (
    <h3
        className={`
            ${styles.loading}
            ${isFetching ? styles.show : ''}
        `}
    >Loading...</h3>
);

export default Loading;
