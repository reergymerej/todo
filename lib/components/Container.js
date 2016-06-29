'use babel';

// TODO: in /lib/components/Container

import React, {PropTypes} from 'react';
import Header from './Header';
import List from './List';
import Empty from './Empty';
import Status from './Status';
import Search from './Search';
import Tree from './Tree';
import service from '../service'; // TODO: do not transform here, feed it in through props

class Container extends React.Component {
    static get propTypes() {
        return {
            onRefresh: PropTypes.func.isRequired,
            onClose: PropTypes.func.isRequired,
            onItemClick: PropTypes.func.isRequired,
            items: PropTypes.array.isRequired,
            loading: PropTypes.bool.isRequired,
            pathsSearched: PropTypes.number,
        };
    }

    constructor() {
        super();
        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            searchValue: null,
        };
    }

    render() {
        const {props} = this;
        const filteredItems = this.getFilteredItems(props.items, this.state.searchValue);
        return (
          <atom-panel className='right'>
              <div className='padded'>
                <div className='inset-panel'>
                    <div className='panel-heading'>
                      <Header
                          onRefresh={this.onRefresh}
                          onClose={this.onClose}
                          count={props.items && props.items.length}
                      />

                      {
                          !props.loading
                          &&
                          <Search
                              onChange={this.onSearchChanged}
                          />
                      }
                    </div>
                    <div className='panel-body padded'>
                        <Status
                            loading={props.loading}
                            pathsSearched={props.pathsSearched}
                        />

                        <Tree
                          data={service.getTreeFormat(props.items)}
                        />

                        {
                            !props.loading
                            && (
                                props.items.length
                                ? <List
                                    items={filteredItems}
                                    onItemClick={props.onItemClick}
                                />
                                : <Empty />
                            )
                        }
                    </div>
                </div>
            </div>
          </atom-panel>
        );
    }

    getFilteredItems(items, searchValue) {
        if (!searchValue) {
            return items;
        } else {
            const filtered = [];

            items.map(item => {
                const filteredMatches = item.matches.filter(match => {
                    return match.matchText.indexOf(searchValue) > -1;
                });

                if (filteredMatches.length) {
                    filtered.push(
                        Object.assign({}, item, {
                            matches: filteredMatches,
                        })
                    );
                }
            });

            return filtered;
        }
    }

    onSearchChanged(event) {
        const {target: { value: searchValue }} = event;
        this.setState({ searchValue });
    }

    clearSearch() {
        this.setState({ searchValue: null });
    }

    onRefresh() {
        this.clearSearch();
        this.props.onRefresh();
    }

    onClose() {
        this.clearSearch();
        this.props.onClose();
    }
}

export default Container;
