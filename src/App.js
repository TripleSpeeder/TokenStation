import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Route, Router, Switch} from 'react-router'
import configureStore from './store'
import { history } from './store'
import Web3Container from './modules/web3/web3Container'
import {Container, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import TokenLoaderContainer from './modules/token/TokenLoaderContainer'
import BalancesContainer from './modules/balance/BalancesContainer'
import TokenListContainer from './modules/token/TokenListContainer'
import { PersistGate } from 'redux-persist/lib/integration/react'
import TokenEventsContainer from './modules/event/TokenEventsContainer'

let {store, persistor} = configureStore()

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router history={history}>
                        <div>

                            <Menu fixed='top' inverted>
                                <Container>
                                    <Menu.Item header>
                                        <Link to='/'>Tokenstation</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to='/'>Home</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to='/alltokens'>Full token list</Link>
                                    </Menu.Item>
                                </Container>
                            </Menu>

                            <Container style={{ marginTop: '7em' }}>
                                <TokenLoaderContainer/>
                                <Switch>
                                    <Route exact path='/' component={BalancesContainer}/>
                                    <Route path='/alltokens/' component={TokenListContainer}/>
                                    <Route path='/token/:tokenId/' component={TokenEventsContainer}/>
                                    <Route path='/:address/' component={BalancesContainer}/>
                                    <Route component={NoMatch} />
                                </Switch>
                                <Web3Container />
                            </Container>
                        </div>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
