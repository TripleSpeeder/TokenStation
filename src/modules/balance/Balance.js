import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'semantic-ui-react'
import BN from 'bn.js'
import bn2DisplayString from '@triplespeeder/bn2string'

// TODO: Refactor to make rounding/string-formating reusable
const Balance = (props) => {
    const {amount, numDecimals} = props
    const roundToDecimals = new BN(3)
    const formatted = bn2DisplayString({amount, numDecimals, roundToDecimals})
    const content = formatted.precise.whole + '.' + formatted.precise.fraction
    const trigger = <span>{formatted.rounded.whole + '.' + formatted.rounded.fraction}</span>

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
