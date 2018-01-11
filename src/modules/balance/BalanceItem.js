import React from 'react'
import PropTypes from 'prop-types'

const BalanceItem = (props) => {
    return (
        <li>
            {props.address}: {props.balance.toFixed(4)} {props.token}
        </li>
    )
}

BalanceItem.propTypes = {
    balance: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    reloadBalance: PropTypes.func.isRequired,
}

BalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItem
