import React from 'react'
import PropTypes from 'prop-types'
import {Table, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const BalanceItemDetail = (props) => {
    const {address, balance, loading, reloadBalance, url} = props
    return (
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> <Link to={url}>{address}</Link>
            </Table.Cell>
            <Table.Cell>{balance.toFixed(3)}</Table.Cell>
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
    url: PropTypes.string.isRequired,
}

BalanceItemDetail.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItemDetail
