import React, { Component } from 'react';
import Dcard from './libs/Dcard';
import Service from './libs/Service';

import SearchInput from './components/SearchInput';
import GithubRepo from './components/GithubRepo';
import Popup from './components/Popup';
import Loading from './components/Loading';
import InfiniteScroll from './components/InfiniteScroll';

import './normalize.css';

import styles from './App.module.css';

class App extends Component {

    constructor (props) {

        super(props);
        this.state = {
            inputValue: '',
            repos: [],
            haveSearched: false,
            moreData: false,
            page: 1,
            isFetching: false
        };

    }

    doingGithubRepoSearch = async () => {

        if (this.state.isFetching) return;

        this.setState({
            isFetching: true
        });

        try {

            const response = await Service.searchRepositories({
                q: this.state.inputValue,
                page: this.state.page
            })

            this.setState((prevState) => {

                console.log('response: ', response);
                const repos = [ ...prevState.repos, ...response.data.items ];

                return {
                    repos,
                    moreData: response.data.items.length === 30,
                    isFetching: false,
                    hasError: false,
                    haveSearched: true,
                    errorMessage: ''
                };

            });

        }
        catch (error) {

            const errorResponse = error.response;
            console.log('errorResponse: ', errorResponse);

            this.setState({
                hasError: true,
                isFetching: false,
                errorMessage: errorResponse.data.message
            });

        }

    };

    handleWindowScroll = () => {

        const page = this.state.page + 1;

        this.setState({
            page
        }, this.doingGithubRepoSearch);

    };

    handleInputChange = Dcard.debounce((inputValue) => {

        this.setState({
            inputValue,
            repos: [],
            haveSearched: false,
            page: 1
        }, () => {

            if (this.state.inputValue !== '') {

                this.doingGithubRepoSearch();

            }

        });

    });

    render () {

        return (
            <div className={styles.appMain}>
                <main>
                    {/* SearchInput */}
                    <section>
                        <div className={styles.mainFocus}>
                            <div className={styles.title}>Git Repository Search</div>
                            <SearchInput
                                handleInputChange={this.handleInputChange}
                                disabled={this.state.isFetching}
                            />
                            <Loading
                                isFetching={this.state.isFetching}
                            />
                        </div>
                    </section>
                    {/* GithubRepo */}
                    {
                        this.state.repos.length
                            ? (
                                <section>
                                    <h1>Repository Lists:</h1>
                                    <InfiniteScroll
                                        isFetching={this.state.isFetching}
                                        hasError={this.state.hasError}
                                        callback={this.handleWindowScroll}
                                    >
                                        <ul>
                                            {
                                                this.state.repos.map((item, idx) => (
                                                    <li
                                                        className={styles.list}
                                                        key={`${item.id}${idx}`}
                                                    >
                                                        <GithubRepo
                                                            url={item.html_url}
                                                            repoName={item.full_name}
                                                            owner={item.owner.login}
                                                        />
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </InfiniteScroll>
                                </section>
                            )
                            : (null)
                    }
                    {/* message Popup */}
                    {
                        this.state.hasError
                            ? (
                                <Popup
                                    message={this.state.errorMessage}
                                />
                            )
                            : (null)
                    }
                    {/* no search result */}
                    {
                        this.state.repos.length === 0 &&
                        this.state.haveSearched
                            ? (<h3>No Search Result. :'(</h3>)
                            : (null)
                    }
                    {/* no more data */}
                    {
                        !this.state.moreData &&
                        this.state.repos.length
                            ? (<h3>No more Repository. :'(</h3>)
                            : (null)
                    }
                </main>
            </div>
        );

    }

}

export default App;
