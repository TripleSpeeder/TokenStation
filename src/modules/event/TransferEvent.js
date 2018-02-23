import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Table} from 'semantic-ui-react'
import TxHashDisplay from '../common/TxHashDisplay'

const TransferEvent = (props) => {
    const {txHash, blockNumber, from, to, type, quantity, positive, negative} = props
    const icon = positive ? <Icon name='plus' color='green' circular/> : <Icon name='minus' color='red' circular/>
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
    type: PropTypes.string.isRequired,
    quantity: PropTypes.object.isRequired, // BigNum
    positive: PropTypes.bool.isRequired,
    negative: PropTypes.bool.isRequired,
}

TransferEvent.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferEvent
