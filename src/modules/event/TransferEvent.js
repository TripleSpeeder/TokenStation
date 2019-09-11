import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Table} from 'semantic-ui-react'
import TxHashDisplay from '../common/TxHashDisplay'
import AddressDisplay from '../common/AddressDisplay'
import Balance from '../balance/Balance'

export const TRANSFER_EVENT_TYPES = {
    NEUTRAL: 'neutral',
    POSITIVE: 'postivie',
    NEGATIVE: 'negative'
}

const TransferEvent = (props) => {
    const {txHash, blockNumber, from, fromENS, to, toENS, type, decimals, quantity} = props
    let icon = null
    let positive = false
    let negative = false
    switch(type) {
        case TRANSFER_EVENT_TYPES.POSITIVE:
            icon = <Icon name='plus' color='green' circular/>
            positive = true
            break
        case TRANSFER_EVENT_TYPES.NEGATIVE:
            icon = <Icon name='minus' color='red' circular/>
            negative = true
            break
        case TRANSFER_EVENT_TYPES.NEUTRAL:
        default:
            // no icon, neither positive nor negative hint
    }

    return (
        <React.Fragment>
            <Table.Row>
                <Table.Cell textAlign={'right'}>#: </Table.Cell>
                <Table.Cell><strong>{blockNumber}</strong></Table.Cell>
                <Table.Cell textAlign={'right'}>From: </Table.Cell>
                <Table.Cell><AddressDisplay address={from} ensName={fromENS}/></Table.Cell>
                <Table.Cell rowSpan='2' textAlign={'right'}>{icon}</Table.Cell>
                <Table.Cell rowSpan='2' positive={positive} negative={negative} textAlign={'right'}>
                    <Balance amount={quantity} numDecimals={decimals}/>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell textAlign={'right'}>Tx: </Table.Cell>
                <Table.Cell><strong><TxHashDisplay txHash={txHash}/></strong></Table.Cell>
                <Table.Cell textAlign={'right'}>To: </Table.Cell>
                <Table.Cell><AddressDisplay address={to} ensName={toENS}/></Table.Cell>
            </Table.Row>
        </React.Fragment>
    )
}

TransferEvent.propTypes = {
    txHash: PropTypes.string.isRequired,
    blockNumber: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    fromENS: PropTypes.string,
    toENS: PropTypes.string,
    type: PropTypes.oneOf([
        TRANSFER_EVENT_TYPES.NEUTRAL,
        TRANSFER_EVENT_TYPES.POSITIVE,
        TRANSFER_EVENT_TYPES.NEGATIVE
    ]).isRequired,
    quantity: PropTypes.object.isRequired, // BigNum
}

TransferEvent.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferEvent
