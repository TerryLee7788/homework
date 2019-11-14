import React, { PureComponent } from 'react';
import Dcard from '../libs/Dcard';
import Loading from './Loading';

class InfiniteScroll extends PureComponent {

    componentDidMount () {

        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillUnmount () {

        window.removeEventListener('scroll', this.handleScroll);

    }

    handleScroll = Dcard.throttle(() => {

        if (this.props.isFetching || this.props.hasError) { return; }

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)  {

            if (this.props.callback instanceof Function) {

                this.props.callback();

            }

        }

    });

    render () {

        return (
            <>
                {this.props.children}
                {
                    this.props.loader
                        ? (this.props.loader)
                        : (
                            <Loading
                                isFetching={this.props.isFetching}
                            />
                        )
                }
            </>
        );

    }

}

export default InfiniteScroll;
