import React from 'react'
import PropTypes from 'prop-types'
import {Header, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BalancesList from '../balance/BalancesList'

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
                <p>There are no token balances on your accounts. Open the <Link to={'/todo'}>Account Manager</Link> to
                   add additional accounts, or open the <Link to={'/todo'}>Token Manager</Link> to add tracked
                   tokens.</p>
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
            {body}
        </React.Fragment>
    )
}

Overview.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
