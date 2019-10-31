import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({
    handleInputChange
}) => (
    <div
        className={styles.inputContiner}
    >
        <input
            type="text"
            className={styles.input}
            placeholder="請輸入您想搜尋的 Git Repository"
            onChange={(e) => {

                handleInputChange(e.target.value);

            }}
        />
    </div>
);

export default SearchInput;
