import React, { useEffect } from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({
    handleInputChange,
    disabled
}) =>{

    const inputRef = React.createRef();

    useEffect(() => {

        inputRef.current.focus();

    }, []);

    return (
        <div
            className={styles.inputContiner}
        >
            <input
                type="text"
                className={styles.input}
                placeholder="請輸入您想搜尋的 Git Repository Name"
                disabled={disabled}
                onChange={(e) => {

                    handleInputChange(e.target.value);

                }}
                ref={inputRef}
            />
        </div>
    );

};

export default SearchInput;
