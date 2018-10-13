import React, {Component} from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'
import {Container} from 'semantic-ui-react'
import { PersistGate } from 'redux-persist/lib/integration/react'
import ModalRoot from './modules/modal/ModalRoot'
import LayoutContainer from './modules/layout/LayoutContainer'
import TokenLoaderGate from './modules/token/TokenLoaderGate'
import Web3GateContainer from './modules/web3/web3GateContainer'

let {store, persistor} = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Web3GateContainer>
                        <TokenLoaderGate>
                            <BrowserRouter>
                                <Container>
                                    <ModalRoot/>
                                    <LayoutContainer/>
                                </Container>
                            </BrowserRouter>
                        </TokenLoaderGate>
                    </Web3GateContainer>
                </PersistGate>
            </Provider>
        )
    }
}

export default App
