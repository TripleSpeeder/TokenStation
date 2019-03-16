import React, {Component} from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store'
import {Container} from 'semantic-ui-react'
import ModalRoot from './modules/modal/ModalRoot'
import LayoutContainer from './modules/layout/LayoutContainer'
import TokenLoaderGate from './modules/token/TokenLoaderGate'
import Web3GateContainer from './modules/web3/web3GateContainer'
import LocalStorageGate from "./utils/LocalStorageGate"

let {store} = configureStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Web3GateContainer>
                    <TokenLoaderGate>
                        <LocalStorageGate>
                            <BrowserRouter>
                                <Container>
                                    <ModalRoot/>
                                    <LayoutContainer/>
                                </Container>
                            </BrowserRouter>
                        </LocalStorageGate>
                    </TokenLoaderGate>
                </Web3GateContainer>
            </Provider>
        )
    }
}

export default App
