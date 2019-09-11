import React from 'react'
import PropTypes from 'prop-types'
import {Button, Statistic, Table} from 'semantic-ui-react'
import BalanceItemDetailContainer from './TokenBalanceItemDetailContainer'
import {Link} from 'react-router-dom'
import Balance from './Balance'

const TokenBalanceItem = (props) => {
    const {expanded, tokenName, tokenSymbol, tokenBalances, total, tokenDecimals, reloadBalance, loading, tokenEventsLinkOptions, toggleCollapse} = props
    let eventLink = <Link to={tokenEventsLinkOptions}>{tokenName} ({tokenSymbol})</Link>

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
                <Table.HeaderCell width={8}>{eventLink}</Table.HeaderCell>
                <Table.HeaderCell width={5}>
                    <Statistic size='mini'>
                        <Statistic.Value><Balance amount={total} numDecimals={tokenDecimals}/></Statistic.Value>
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
                    <BalanceItemDetailContainer key={tokenBalance.balanceId}
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

TokenBalanceItem.propTypes = {
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenBalances: PropTypes.array.isRequired,
    tokenDecimals: PropTypes.object.isRequired,
    total: PropTypes.object.isRequired,
    reloadBalance: PropTypes.func.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    tokenEventsLinkOptions: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
}

TokenBalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default TokenBalanceItem
