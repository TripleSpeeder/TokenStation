import React from 'react'
import PropTypes from 'prop-types'
import BalanceItemContainer from './BalanceItemContainer'

const BalancesList = (props) => {
    return (
        <list>
            {props.balanceIds.map((balanceId) =>
                <BalanceItemContainer key={balanceId} balanceId={balanceId}/>
            )}
        </list>
    )
}

BalancesList.propTypes = {
    balanceIds: PropTypes.array.isRequired
}

BalancesList.defaultProps = {
    //myProp: <defaultValue>
}

export default BalancesList
