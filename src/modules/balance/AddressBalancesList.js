import React from 'react'
import PropTypes from 'prop-types'
import AddressBalanceItemContainer from './AddressBalanceItemContainer'

const AddressBalancesList = (props) => {
    const {balancesByAddress} = props
    return (
        <div>
            {Object.entries(balancesByAddress).map(entry =>
                <AddressBalanceItemContainer key={entry[0]} addressId={entry[0]} tokenBalances={entry[1]}/>
            )}
        </div>
    )
}

AddressBalancesList.propTypes = {
    balancesByAddress: PropTypes.object.isRequired
}

AddressBalancesList.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressBalancesList
