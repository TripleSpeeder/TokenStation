import React, {Component} from 'react'
import PropTypes from 'prop-types'
import QueryAddressForm from "../../modules/queryAddress/QueryAddressForm"
import TokenListContainer from "../../modules/token/TokenListContainer"
import {Segment} from 'semantic-ui-react'
import BalancesListContainer from './BalancesListContainer'


class BalancesContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <Segment>
                    <QueryAddressForm/>
                </Segment>
                <BalancesListContainer></BalancesListContainer>
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
