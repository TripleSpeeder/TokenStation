import React from 'react'
import PropTypes from 'prop-types'
import {Input, Icon, Divider} from 'semantic-ui-react'

const TokenListFilter = (props) => {
    const {filterString, handleChange, filterIsActive, clearFilter, displayed, total} = props
    let icon, message, label = null
    if (filterIsActive) {
        icon = <Icon name='eraser' circular link onClick={clearFilter} />
    }
    return (
        <Input label='Filter'
               name='filter'
               placeholder='Enter name, symbol or contract address'
               onChange={handleChange}
               value={filterString}
               icon={icon}
               fluid
        />
    )
}

TokenListFilter.propTypes = {
    filterString: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    filterIsActive: PropTypes.bool.isRequired,
    displayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    clearFilter: PropTypes.func.isRequired,
}

TokenListFilter.defaultProps = {
    //myProp: <defaultValue>
}

export default TokenListFilter
