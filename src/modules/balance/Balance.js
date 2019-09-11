import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'semantic-ui-react'
import BN from 'bn.js'

// TODO: Refactor to make rounding/string-formating reusable
const Balance = (props) => {
    const {amount, numDecimals} = props
    const roundToDecimals = new BN(3)
    const divisor = new BN(10).pow(numDecimals)

    // popup content should contain exact value
    const whole = amount.div(divisor)
    const fraction = amount.mod(divisor).abs()
    const content = whole.toString() + '.' + fraction.toString()

    // popup trigger should contain human-readable, rounded value
    let roundedWhole = whole
    let roundedFraction = fraction
    if (numDecimals.gt(roundToDecimals)) {
        let roundingPow = numDecimals.sub(roundToDecimals)
        if (roundingPow.lt(roundToDecimals)) {
            roundingPow = roundToDecimals
        }
        const roundingDivisor = new BN(10).pow(roundingPow)
        const remainingDivisor = new BN(10).pow(roundToDecimals)
        const roundedAmount = amount.divRound(roundingDivisor)
        roundedWhole = roundedAmount.div(remainingDivisor)
        roundedFraction = roundedAmount.mod(remainingDivisor).abs()
    }
    const trigger = <span>{roundedWhole.toString() + '.' + roundedFraction.toString()}</span>

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
