import React from 'react'
import PropTypes from 'prop-types'
import BalanceItemContainer from './TokenBalanceItemContainer'

const TokenBalancesList = (props) => {
    const {balancesByToken} = props
    return (
        <div>
            {balancesByToken.map(entry =>
                <BalanceItemContainer key={entry[0]} tokenId={entry[0]} tokenBalances={entry[1]}/>
            )}
        </div>
    )
}

TokenBalancesList.propTypes = {
    balancesByToken: PropTypes.array.isRequired
}

TokenBalancesList.defaultProps = {
    //myProp: <defaultValue>
}

export default TokenBalancesList
