import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Search} from "semantic-ui-react"
import {connect} from "react-redux"
import _ from 'lodash'

/*
const resultRenderer = ({ name, symbol, address }) => (
    <div>
        <div className='name'>{name} ({symbol}</div>
        <div className='address'>{address}</div>
    </div>
)
*/
const resultRenderer = ({ name }) => <Label content={name} />

resultRenderer.propTypes = {
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
}

class TokenSelector extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { value, onSearchChange, onTokenSelect, results} = this.props
        return (
            <Search
                loading={false}
                onResultSelect={onTokenSelect}
                onSearchChange={_.debounce(onSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
            />
        )
    }
}

TokenSelector.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
    results: PropTypes.array,
    value: PropTypes.string,
}

TokenSelector.defaultProps = {
    //myProp: <defaultValue>
}

export default connect()(TokenSelector)
