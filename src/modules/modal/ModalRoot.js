import React, {Component} from 'react'
import {connect} from 'react-redux'
import TestModal from './TestModal'
import {hideModal} from './modalActions'

export const MODAL_COMPONENTS = {
    'TEST_MODAL': TestModal
    /* other modals */
}

class ModalRoot extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {modalType, modalProps, closeModal} = this.props

        if (!modalType){
            // currently no modal needs to be shown
            return null
        }

        const SpecificModal = MODAL_COMPONENTS[modalType]
        return <SpecificModal closeModal={closeModal} {...modalProps} />
    }
}

const mapStateToProps = state => (
    state.modal
)

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(hideModal())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot)
