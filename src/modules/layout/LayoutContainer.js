import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import TokenListContainer from '../token/TokenListContainer'
import TokenEventsContainer from '../event/TokenEventsContainer'
import TransferFormContainer from '../forms/transferForm/TransferFormContainer'
import OverviewContainer from '../segments/OverviewContainer'
import AddressEventsContainer from '../event/AddressEventsContainer'
import BalancesContainer from '../balance/BalancesContainer'
import Web3Container from '../web3/web3Container'
import {Grid} from 'semantic-ui-react'
import {Route, Switch} from 'react-router'
import Sidebar from '../segments/Sidebar'
import Accounts from '../segments/Accounts'
import TokenContracts from '../segments/TokenContracts'

class LayoutContainer extends Component {
    constructor(props, context) {
        super(props, context)

        // Store layout/UI state locally, not in store. TODO: Recheck decision, eventually move
        // UI state to store?
        this.state = {
            activeScreen: 'overview'
        }
    }

    changeScreen = (newScreen) => {
        this.setState({
            activeScreen: newScreen
        })
        this.props.history.push(newScreen)
    }

    render() {
        const NoMatch = ({ location }) => (
            <div>
                <h3>No match for <code>{location.pathname}</code></h3>
            </div>
        )

        return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar activeItem={this.state.activeScreen}
                                 clickItem={this.changeScreen}
                        />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Switch>
                            <Route exact path='/' component={OverviewContainer}/>
                            <Route exact path='/overview/' component={OverviewContainer}/>
                            <Route path='/accounts/' component={Accounts}/>
                            <Route path='/tokenContracts/' component={TokenContracts}/>

                            /* old routes below */
                            <Route path='/transfer/' component={TransferFormContainer}/>
                            <Route path='/alltokens/' component={TokenListContainer}/>
                            <Route path='/token/:tokenId/' component={TokenEventsContainer}/>
                            <Route path='/:address/transfers/:tokenId' component={AddressEventsContainer}/>
                            <Route path='/:address/' component={BalancesContainer}/>

                            <Route component={NoMatch} />
                        </Switch>
                    </Grid.Column>
                </Grid.Row>
                <Web3Container />
            </Grid>
        )
    }
}

export default withRouter(LayoutContainer)
