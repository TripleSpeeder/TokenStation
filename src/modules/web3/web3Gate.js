import React, {Children} from 'react'
import PropTypes from 'prop-types'
import {WEB3_STATES} from './web3Actions'
import ModalLoader from '../common/ModalLoader'
import {Button, Icon, Modal} from 'semantic-ui-react'

const Web3Gate = (props) => {
    const {state, onRetry, children} = props

    switch (state) {
        case WEB3_STATES.INITIALIZED: {
            // Gateway passed, render actual content.
            return Children.only(children)
        }
        case WEB3_STATES.ERROR:
            return (
                <Modal open={true}>
                    <Modal.Header>
                        <Icon name='exclamation'/> No web3 found
                    </Modal.Header>
                    <Modal.Content>
                        <p>Failed to initialize web3. Please enable web3 in your browser, e.g by using the Metamask extension.</p>
                        <p><Button onClick={onRetry}>Retry</Button></p>
                    </Modal.Content>
                </Modal>

            )
        case WEB3_STATES.LOADING:
        default: {
            return (
                <ModalLoader content={'Waiting on web3 initialization'}/>
            )
        }
    }
}

Web3Gate.propTypes = {
    state: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
}

export default Web3Gate
