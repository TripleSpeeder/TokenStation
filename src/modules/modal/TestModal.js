import React from 'react'
import PropTypes from 'prop-types'
import {Header, Modal} from 'semantic-ui-react'

const TestModal = (props) => {
    const {closeModal} = props
    return (
        <Modal open onClose={closeModal}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>We've found the following gravatar image associated with your e-mail address.</p>
                    <p>Is it okay to use this photo?</p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

TestModal.propTypes = {
    closeModal: PropTypes.func.isRequired
}

TestModal.defaultProps = {
    //myProp: <defaultValue>
}

export default TestModal
