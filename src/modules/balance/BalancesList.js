import React from 'react'
import PropTypes from 'prop-types'
import BalanceItemContainer from './BalanceItemContainer'

const BalancesList = (props) => {
    return (
        <div>
            {Object.entries(props.balancesByToken).map(entry =>
                <BalanceItemContainer key={entry[0]} tokenId={entry[0]} tokenBalances={entry[1]}/>
            )}
        </div>
    )
}

BalancesList.propTypes = {
    balancesByToken: PropTypes.object.isRequired
}

BalancesList.defaultProps = {
    //myProp: <defaultValue>
}

export default BalancesList
