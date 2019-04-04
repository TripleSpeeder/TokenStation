import React from 'react'
import PropTypes from 'prop-types'
import {Button, Statistic, Table} from 'semantic-ui-react'
import AddressDisplay from '../common/AddressDisplay'
import AddressBalanceItemDetailContainer from './AddressBalanceItemDetailContainer'

const AddressBalanceItem = (props) => {
    const {expanded, address, ensName, tokenBalances, numTokens, reloadBalance, loading, toggleCollapse} = props

    const icon = expanded ? 'chevron up' : 'chevron down'

    const tableHeader = (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={1}>
                    <Button onClick={toggleCollapse}
                            circular
                            icon={icon}
                            size={'large'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell width={8}><AddressDisplay address={address} ensName={ensName}/></Table.HeaderCell>
                <Table.HeaderCell width={5}>
                    <Statistic size='mini'>
                        <Statistic.Value>{numTokens} token</Statistic.Value>
                    </Statistic>
                </Table.HeaderCell>
                <Table.HeaderCell width={2}>
                    <Button circular
                            icon='refresh'
                            onClick={reloadBalance}
                            loading={loading}/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )

    let tableBody = null
    if (expanded) {
        tableBody = (
            <Table.Body>
                {tokenBalances.map(tokenBalance =>
                    <AddressBalanceItemDetailContainer key={tokenBalance.balanceId}
                                                tokenBalanceId={tokenBalance.balanceId}
                    />
                )}
            </Table.Body>
        )
    }

    return <Table compact>
        {tableHeader}
        {tableBody}
    </Table>
}

AddressBalanceItem.propTypes = {
    ensName: PropTypes.string,
    address: PropTypes.string.isRequired,
    tokenBalances: PropTypes.array.isRequired,
    numTokens: PropTypes.number.isRequired,
    reloadBalance: PropTypes.func.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
}

AddressBalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressBalanceItem
