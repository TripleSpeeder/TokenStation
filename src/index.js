import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {Route, Router, Switch} from 'react-router'
import store from './store'
import { history } from './store'
import {Container, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import TokenListContainer from './modules/token/TokenListContainer'
import Web3Container from "./modules/web3/web3Container"
import BalancesContainer from './modules/balance/BalancesContainer'
import TokenLoader from './modules/token/TokenLoaderContainer'


const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
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
                    <TokenLoader/>
                    <Switch>
                        <Route exact path='/' component={BalancesContainer}/>
                        <Route path='/alltokens/' component={TokenListContainer}/>
                        <Route path='/:address/' component={BalancesContainer}/>
                        <Route component={NoMatch} />
                    </Switch>

                    <Web3Container />
                </Container>

            </div>
        </Router>
    </Provider>,
  document.getElementById('root')
)
