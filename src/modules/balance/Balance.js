import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'semantic-ui-react'
import BN from 'bn.js'
import bn2DisplayString from '@triplespeeder/bn2string'

const Balance = (props) => {
    const {amount, numDecimals} = props
    const roundToDecimals = new BN(3)
    const {precise, rounded} = bn2DisplayString({
        value: amount,
        decimals: numDecimals,
        roundToDecimals
    })
    const content = precise
    const trigger = <span>{rounded}</span>

    return (
        <Popup
            trigger={trigger}
            content={content}
        />
    )
}

Balance.propTypes = {
    amount: PropTypes.object.isRequired, // BN instance
    numDecimals: PropTypes.object.isRequired, // BN instance
}

export default Balance
