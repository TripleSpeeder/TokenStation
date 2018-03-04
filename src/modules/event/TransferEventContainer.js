import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransferEvent, {TRANSFER_EVENT_TYPES} from './TransferEvent'

class TransferEventContainer extends PureComponent {
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
    let type = TRANSFER_EVENT_TYPES.NEUTRAL
    let positive = false
    let negative = false
    if (ownProps.address.length) {
        // check if transfer is to/from own address
        type = ownProps.address === from ? TRANSFER_EVENT_TYPES.NEGATIVE : TRANSFER_EVENT_TYPES.POSITIVE
        positive = (type === TRANSFER_EVENT_TYPES.POSITIVE)
        negative = (type === TRANSFER_EVENT_TYPES.NEGATIVE)
    }
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

