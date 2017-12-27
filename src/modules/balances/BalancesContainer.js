import React, {Component} from 'react'
import PropTypes from 'prop-types'
import QueryAddressFormContainer from "../../modules/queryAddress/QueryAddressForm"
import TokenListContainer from "../../modules/token/TokenListContainer"


class BalancesContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <QueryAddressFormContainer/>
                <TokenListContainer showEmpty={false}/>
            </div>
        )
    }
}

BalancesContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

BalancesContainer.defaultProps = {
    //myProp: <defaultValue>
}

export default BalancesContainer
