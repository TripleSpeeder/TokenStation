import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Table} from 'semantic-ui-react'
import TxHashDisplay from '../common/TxHashDisplay'

export const TRANSFER_EVENT_TYPES = {
    NEUTRAL: 'neutral',
    POSITIVE: 'postivie',
    NEGATIVE: 'negative'
}

const TransferEvent = (props) => {
    const {txHash, blockNumber, from, to, type, quantity, positive, negative} = props
    let icon = null
    if (type !== TRANSFER_EVENT_TYPES.NEUTRAL) {
        icon = positive ? <Icon name='plus' color='green' circular/> : <Icon name='minus' color='red' circular/>
    }
    return (
        <Table.Row>
            <Table.Cell>
                <TxHashDisplay txHash={txHash}/>
            </Table.Cell>
            <Table.Cell>{blockNumber}</Table.Cell>
            <Table.Cell><TxHashDisplay txHash={from}/></Table.Cell>
            <Table.Cell><TxHashDisplay txHash={to}/></Table.Cell>
            <Table.Cell>{icon}</Table.Cell>
            <Table.Cell positive={positive} negative={negative} textAlign={'right'}>{quantity.toFixed(6)}</Table.Cell>
        </Table.Row>
    )
}

TransferEvent.propTypes = {
    txHash: PropTypes.string.isRequired,
    blockNumber: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        TRANSFER_EVENT_TYPES.NEUTRAL,
        TRANSFER_EVENT_TYPES.POSITIVE,
        TRANSFER_EVENT_TYPES.NEGATIVE
    ]).isRequired,
    quantity: PropTypes.object.isRequired, // BigNum
    positive: PropTypes.bool.isRequired,
    negative: PropTypes.bool.isRequired,
}

TransferEvent.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferEvent
