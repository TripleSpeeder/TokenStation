import React from 'react'
import PropTypes from 'prop-types'

const AddressDisplay = (props) => {
    const {address, ensName} = props
    if (ensName) {
        return <div>
            <div><strong>{ensName}</strong></div>
            <div><small>{address}</small></div>
        </div>
    } else {
        return <div><strong>{address}</strong></div>
    }
}

AddressDisplay.propTypes = {
    address: PropTypes.string.isRequired,
    ensName: PropTypes.string
}


export default AddressDisplay
