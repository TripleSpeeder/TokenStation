import React, {Component} from 'react'
import OverviewContainer from '../segments/OverviewContainer'
import Web3Container from '../web3/web3Container'
import {Grid} from 'semantic-ui-react'
import {Route, Switch} from 'react-router-dom'
import Sidebar from '../segments/Sidebar'
import Accounts from '../segments/Accounts'
import TokenContracts from '../segments/TokenContracts'
import EventsContainer from '../segments/EventsContainer'
import NetworkWarningController from '../web3/NetworkWarningController'

class LayoutContainer extends Component {
    render() {
        const NoMatch = ({ location }) => (
            <div>
                <h3>No match for <code>{location.pathname}</code></h3>
            </div>
        )

        return (
            <Grid padded={'vertically'}>
                <NetworkWarningController/>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Switch>
                            <Route exact path='/' component={OverviewContainer}/>
                            <Route exact path='/overview/' component={OverviewContainer}/>
                            <Route path='/accounts/' component={Accounts}/>
                            <Route path='/events/:tokenId/:address' component={EventsContainer}/>
                            <Route path='/events/:tokenId/' component={EventsContainer}/>
                            <Route path='/events/' component={EventsContainer}/>
                            <Route path='/tokenContracts/' component={TokenContracts}/>

                            <Route component={NoMatch} />
                        </Switch>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Web3Container/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default LayoutContainer
