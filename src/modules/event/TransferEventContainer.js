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
}

TransferEventContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const transferEvent = state.events.byId[ownProps.transferEventId]
    const addressId = state.addresses.selector.selectedAddressId
    const rawEvent = transferEvent.transferEvent
    const token = state.tokens.byId[transferEvent.tokenId]
    const quantity = rawEvent.args._value.dividedBy(token.decimals)
    const from = rawEvent.args._from
    const to = rawEvent.args._to
    // events that are not to/from one of the watched accounts are neutral
    let type = TRANSFER_EVENT_TYPES.NEUTRAL
    if (addressId) {
        // check if transfer is to/from own address
        type = addressId.toLowerCase() === from ? TRANSFER_EVENT_TYPES.NEGATIVE : TRANSFER_EVENT_TYPES.POSITIVE
    }
    return {
        txHash: rawEvent.transactionHash,
        blockNumber: rawEvent.blockNumber,
        from,
        to,
        type,
        quantity,
    }
}

export default connect(mapStateToProps)(TransferEventContainer)

