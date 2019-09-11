import React from 'react'
import PropTypes from 'prop-types'
import {Table, Button} from 'semantic-ui-react'
import Balance from './Balance'

const AddressBalanceItemDetail = (props) => {
    const {tokenName, tokenSymbol, tokenAmount, tokenDecimals, loading, reloadBalance} = props

    return (
        <Table.Row>
            <Table.Cell>
            </Table.Cell>
            <Table.Cell>
                {tokenName} ({tokenSymbol})
            </Table.Cell>
            <Table.Cell><Balance amount={tokenAmount} numDecimals={tokenDecimals}/></Table.Cell>
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

AddressBalanceItemDetail.propTypes = {
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenAmount: PropTypes.object.isRequired,
    tokenDecimals: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    reloadBalance: PropTypes.func.isRequired,
}

AddressBalanceItemDetail.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressBalanceItemDetail
