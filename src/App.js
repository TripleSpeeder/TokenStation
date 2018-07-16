import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import configureStore from './store'
import { history } from './store'
import Web3Gate from './modules/web3/web3Gate'
import {Container} from 'semantic-ui-react'
import { PersistGate } from 'redux-persist/lib/integration/react'
import ModalRoot from './modules/modal/ModalRoot'
import LayoutContainer from './modules/layout/LayoutContainer'
import TokenLoaderGate from './modules/token/TokenLoaderGate'

let {store, persistor} = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Web3Gate>
                        <TokenLoaderGate>
                            <Router history={history}>
                                <Container>
                                    <ModalRoot/>
                                    <LayoutContainer/>
                                </Container>
                            </Router>
                        </TokenLoaderGate>
                    </Web3Gate>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
