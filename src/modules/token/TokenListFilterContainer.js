import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'semantic-ui-react'

class TokenListFilterContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {name, value}) {
        this.props.onFilterChange(value)
    }

    render() {
        return (
            <Input label='Filter'
                   name='filter'
                   icon='search'
                   placeholder='Enter name, symbol or contract address'
                   fluid
                   onChange={this.handleChange}
            />
        )
    }
}

TokenListFilterContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

TokenListFilterContainer.defaultProps = {
    //myProp: <defaultValue>
}

export default TokenListFilterContainer
