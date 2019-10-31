import React from 'react';
import styles from './GithubRepoList.module.css';

const GithubRepoList = ({
    url,
    repoName,
    owner
}) => (
    <li className={styles.list}>
        <a
            href={url}
            title={owner}
            className={styles.link}
            rel="noopener noreferrer"
            target="_blank"
        >{repoName}</a>
    </li>
);

export default GithubRepoList;
