import React from 'react'
import PropTypes from 'prop-types'
import {Divider, Header, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BalancesList from '../balance/BalancesList'
import TokenListFilterContainer from '../token/TokenListFilterContainer'

const Overview = (props) => {
    const {hasAccounts, balancesByToken} = props

    let body
    if (hasAccounts) {
        if (Object.keys(balancesByToken).length) {
            body = <BalancesList balancesByToken={balancesByToken}/>
        }
        else {
            body = <Message>
                <Message.Header>
                    No balances
                </Message.Header>
                <Message.Content>
                    There are no token balances to display. Things you can try:
                </Message.Content>
                <Message.List>
                    <Message.Item>Change the filterstring</Message.Item>
                    <Message.Item>Open the <Link to={'/todo'}>Account Manager</Link> to add additional accounts</Message.Item>
                    <Message.Item>Open the <Link to={'/todo'}>Token Manager</Link> to tracked additional tokens</Message.Item>
                </Message.List>
            </Message>
        }
    } else {
        body = <Message>
            <Message.Header>
                No accounts
            </Message.Header>
            <p>You have no watched or unlocked accounts. Open the <Link to={'/todo'}>Account Manager</Link> to setup accounts.</p>
        </Message>
    }

    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Overview</Header>
            {hasAccounts && <TokenListFilterContainer target={'balancelist'} />}
            <Divider/>
            {body}
        </React.Fragment>
    )
}

Overview.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired,
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
