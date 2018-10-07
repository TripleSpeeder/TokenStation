import React from 'react'
import PropTypes from 'prop-types'
import {Table} from 'semantic-ui-react'
import TransferEventContainer from './TransferEventContainer'

const TransferEventsList = (props) => {
    return (
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='2' textAlign={'center'}>Block#/TransactionHash</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' textAlign={'center'}>From/To</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' textAlign={'right'}>Quantity</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.transferEventIds.map(transferEventId =>
                    <TransferEventContainer key={transferEventId}
                                            transferEventId={transferEventId}
                    />
                )}
            </Table.Body>
        </Table>
    )
}

TransferEventsList.propTypes = {
    //myProp: PropTypes.object.isRequired
    transferEventIds: PropTypes.array.isRequired,
}

TransferEventsList.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferEventsList
