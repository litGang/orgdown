import React, { Component, PropTypes } from "react";

import {InputGroup, NonIdealState} from '@blueprintjs/core'

class DocList extends Component {
    render() {
        const description = <span>Your search didn't match any files.<br />Try searching for something else.</span>;

        return (
            <div className='orgdown-doclist'>
                123
                <InputGroup
                        className='doclist-search'
                        leftIconName="search"
                        placeholder="Filter histogram..."
                        type='search'
                    />

                <div className='docs'>
                    <NonIdealState title="No search results" visual="search" description={description}
                        />
                </div>
            </div>
        )
    }
}

export default DocList;