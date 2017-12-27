import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {Route, Router, Switch} from 'react-router'
import store from './store'
import { history } from './store'
import {Container, Header, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import TokenListContainer from './modules/token/TokenListContainer'
import Web3Container from "./modules/web3/web3Container"
import BalancesContainer from './modules/balances/BalancesContainer'


const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

const AllTokens= () => (
    <div>List all tokens here...</div>
)

const Balance = ( {match} ) => (
    <div>Balance for {match.params.address}</div>
)

ReactDOM.render(
    <Provider store={store}>
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

                    <Switch>
                        <Route exact path='/' component={Balance}/>
                        <Route path='/alltokens/' component={TokenListContainer}/>
                        <Route path='/:address/' component={Balance}/>
                        <Route component={NoMatch} />
                    </Switch>

                    <Web3Container />
                </Container>

            </div>
        </Router>
    </Provider>,
  document.getElementById('root')
)
