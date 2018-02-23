import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'semantic-ui-react'

const TxHashDisplay = (props) => {
    const {txHash} = props
    const shortHash = txHash.slice(0, 10).concat('...')
    const trigger = <span>{shortHash}</span>
    return (
        <Popup
            trigger={trigger}
            content={txHash}
        />
    )
}

TxHashDisplay.propTypes = {
    //myProp: PropTypes.object.isRequired
    txHash: PropTypes.string.isRequired
}


export default TxHashDisplay
