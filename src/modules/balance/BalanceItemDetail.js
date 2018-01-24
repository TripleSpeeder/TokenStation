import React from 'react'
import PropTypes from 'prop-types'
import {Table, Icon, Button} from 'semantic-ui-react'

const BalanceItemDetail = (props) => {
    const {address, balance, loading, reloadBalance} = props
    return (
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> {address}
            </Table.Cell>
            <Table.Cell>{balance.toFixed()}</Table.Cell>
            <Table.Cell>
                <Button size='mini'
                        circular
                        icon='refresh'
                        loading={loading}
                        onClick={reloadBalance} />
            </Table.Cell>

        </Table.Row>
    )
}

BalanceItemDetail.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

BalanceItemDetail.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItemDetail
