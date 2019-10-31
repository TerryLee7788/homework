import React, { Component } from 'react';
import Dcard from './libs/Dcard';
import Service from './libs/Service';

import SearchInput from './componets/SearchInput';
import GithubRepoList from './componets/GithubRepoList';

import './normalize.css';

import styles from './App.module.css';

class App extends Component {

    constructor (props) {

        super(props);
        this.state = {
            inputValue: '',
            repos: [],
            moreData: false,
            page: 1
        };

        this.appRef = React.createRef();
        this.positioned = 0;

    }

    componentDidMount () {

        this.positioned = window.scrollY;

        window.addEventListener('scroll', this.handleWindowScroll);

    }

    componentWillUnmount () {

        window.removeEventListener('scroll', this.handleWindowScroll);

    }

    doingGithubRepoSearch = async () => {

        await Service.searchRepositories({
            q: this.state.inputValue,
            page: this.state.page
        })
            .then((res) => {

                this.setState((prevState) => {

                    const repos = [ ...prevState.repos.concat(res.data.items) ];

                    return {
                        repos,
                        moreData: res.data.items.length === 30
                    };

                });

            })
            .catch((err) => {

                console.log(err);

            });

    };

    handleWindowScroll = Dcard.throttle(() => {

        const nowPosition = window.scrollY,
            almostBottomRangeBuffer = Math.round(window.innerHeight / 2),
            currentScroll = window.innerHeight + window.scrollY,
            appHeight = this.appRef.current.offsetHeight;

        // 檢查他是往下滑
        if (
            nowPosition > this.positioned &&
            this.state.moreData
        ) {

            if (currentScroll > (appHeight - almostBottomRangeBuffer)) {

                const page = this.state.page + 1;

                this.setState({
                    page
                }, this.doingGithubRepoSearch);

            }

        }

        this.positioned = nowPosition;

    });

    handleInputChange = Dcard.debounce((inputValue) => {

        this.setState({
            inputValue,
            repos: [],
            page: 1
        }, () => {

            if (this.state.inputValue !== '') {

                this.doingGithubRepoSearch();

            }

        });

    });

    render () {

        return (
            <div
                className={styles.appMain}
                ref={this.appRef}
            >
                <main>
                    <section>
                        <div
                            className={styles.mainFocus}
                        >
                            <div className={styles.title}>Dcard HomeWork~</div>
                            <SearchInput
                                handleInputChange={this.handleInputChange}
                            />
                        </div>
                    </section>
                    {
                        this.state.repos.length
                            ? (
                                <section
                                    className={styles.repoSearchResult}
                                >
                                    <h1>Repository Lists:</h1>
                                    <ul>
                                        {
                                            this.state.repos.map((item, idx) => (
                                                <GithubRepoList
                                                    key={`${item.id}${idx}`}
                                                    url={item.html_url}
                                                    repoName={item.full_name}
                                                    owner={item.owner.login}
                                                />
                                            ))
                                        }
                                    </ul>
                                </section>
                            )
                            : (null)
                    }
                </main>
            </div>
        );

    }

}

export default App;
