import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'semantic-ui-react'


const Balance = (props) => {
    const {balance, numDecimals} = props
    const trigger = <span>{balance.toFixed(numDecimals)}</span>
    return (
        <Popup
            trigger={trigger}
            content={balance.toFixed(Math.max(numDecimals, balance.dp()))}
        />
    )
}

Balance.propTypes = {
    balance: PropTypes.object.isRequired, // BigNum instance
    numDecimals: PropTypes.number
}

Balance.defaultProps = {
    numDecimals: 3
}

export default Balance
