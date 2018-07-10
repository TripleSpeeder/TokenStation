import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Search} from "semantic-ui-react"
import {connect} from "react-redux"
import _ from 'lodash'
import AddressDisplay from "../common/AddressDisplay"

const resultRenderer = ({ address, ensName }) => <AddressDisplay address={address} ensName={ensName}/>

resultRenderer.propTypes = {
    address: PropTypes.string.isRequired,
    ensName: PropTypes.string,
}

class AddressSelector extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { value, onSearchChange, onAddressSelect, results} = this.props
        return (
            <Search
                input={{
                    fluid: true,
                    label: "Select Account"
                }}
                loading={false}
                onResultSelect={onAddressSelect}
                onSearchChange={_.debounce(onSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
            />
        )
    }
}

AddressSelector.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onAddressSelect: PropTypes.func.isRequired,
    results: PropTypes.array,
    value: PropTypes.string,
}

AddressSelector.defaultProps = {
    //myProp: <defaultValue>
}

export default connect()(AddressSelector)
