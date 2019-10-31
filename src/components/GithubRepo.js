import React from 'react';
import styles from './GithubRepo.module.css';

const GithubRepo = ({
    url,
    repoName,
    owner
}) => (
    <a
        href={url}
        title={owner}
        className={styles.link}
        rel="noopener noreferrer"
        target="_blank"
    >{repoName}</a>
);

export default GithubRepo;
