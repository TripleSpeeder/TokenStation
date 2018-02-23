import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransferEvent from './TransferEvent'

class TransferEventContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {txHash, blockNumber, from, to, type, quantity, positive, negative} = this.props
        return (
            <TransferEvent blockNumber={blockNumber}
                           from={from}
                           to={to}
                           quantity={quantity}
                           txHash={txHash}
                           type={type}
                           positive={positive}
                           negative={negative}
            />
        )
    }
}

TransferEventContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    transferEventId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
}

TransferEventContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const transferEvent = state.events.byId[ownProps.transferEventId]
    const rawEvent = transferEvent.transferEvent
    const token = state.tokens.byId[transferEvent.tokenId]
    const quantity = rawEvent.args._value.dividedBy(token.decimals)
    const from = rawEvent.args._from
    const to= rawEvent.args._to
    const type = ownProps.address === from ? 'out' : 'in'
    const positive = (type === 'in')
    const negative = (type === 'out')
    return {
        txHash: rawEvent.transactionHash,
        blockNumber: rawEvent.blockNumber,
        from,
        to,
        type,
        quantity,
        positive,
        negative
    }
}

export default connect(mapStateToProps)(TransferEventContainer)

