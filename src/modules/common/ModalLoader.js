import React from 'react'
import PropTypes from 'prop-types'
import {Header, Icon, Modal} from 'semantic-ui-react'

const ModalLoader = (props) => {
    const {content} = props
    return (
        <Modal open={true}>
            <Header>
                <Icon loading name={'spinner'}></Icon>
                <Header.Content>
                    {content}
                </Header.Content>
            </Header>
        </Modal>
    )
}

ModalLoader.propTypes = {
    content: PropTypes.string.isRequired
}

ModalLoader.defaultProps = {
    //myProp: <defaultValue>
}

export default ModalLoader
