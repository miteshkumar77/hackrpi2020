import React, { useState } from 'react'



import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { algoliaConfig } from './helpers/config';
const searchClient = algoliasearch(
    algoliaConfig.ALGOLIA_ID,
    algoliaConfig.ALGOLIA_SEARCH_KEY
);

class Hit extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        console.log(`https://storage.googleapis.com/${this.props.hit.bucket}/${this.props.hit.location}`);
        return (
            <div>
                <div className="hit-username">
                    {this.props.hit.username}
                </div>
                <div className="hit-text">
                    {this.props.hit.text}
                </div>
            </div>
        )
    }
}

class Search extends React.Component {



    render() {
        return (
            <InstantSearch
                indexName='transcription'
                searchClient={searchClient}
                className="instant-search"
            >
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        );
    }
}

export default Search
