import {HIDE_MODAL, SHOW_MODAL} from './modalActions'

const MODAL_INITIAL = {
    modalType: null,
    modalProps: {}
}

function showModal(state, action) {
    const {payload} = action
    const {modalType, modalProps} = payload
    return {
        modalType,
        modalProps
    }
}

function hideModal() {
    return MODAL_INITIAL
}

export const modal = (state=MODAL_INITIAL, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return showModal(state, action)
        case HIDE_MODAL:
            return hideModal()
        default:
    }
    return state;
}
