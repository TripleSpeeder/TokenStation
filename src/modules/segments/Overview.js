import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Divider, Grid, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import TokenListFilterContainer from '../token/TokenListFilterContainer'
import ScreenHeader from '../screens/ScreenHeader'
import OverviewBodyContainer from "./OverviewBodyContainer"

const Overview = (props) => {
    const {hasAccounts} = props
    const [hideEmpty, setHideEmpty] = useState(false)
    const toggleHideEmpty = () => setHideEmpty(!hideEmpty)

    let body
    if (hasAccounts) {
        body = <OverviewBodyContainer hideEmpty={hideEmpty}/>
    } else {
        body = <Message>
            <Message.Header>
                No accounts
            </Message.Header>
            <p>You have no watched or unlocked accounts. Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to setup accounts.</p>
        </Message>
    }

    return (
        <React.Fragment>
            <ScreenHeader title={'Overview'}/>
            <Grid verticalAlign='middle' columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Checkbox toggle label='Hide empty balances' checked={hideEmpty} onChange={toggleHideEmpty} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <TokenListFilterContainer target={'balancelist'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider/>
            {body}
        </React.Fragment>
    )
}

Overview.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
