import React, {Component} from 'react'
import PropTypes from 'prop-types'
import QueryAddressForm from "../address/QueryAddressForm"
import TokenListContainer from "../../modules/token/TokenListContainer"
import {Segment} from 'semantic-ui-react'
import BalancesListContainer from './BalancesListContainer'
import AddressListContainer from '../address/AddressListContainer'


class BalancesContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <Segment>
                    <AddressListContainer/>
                    <QueryAddressForm/>
                    <BalancesListContainer/>
                </Segment>
                <BalancesListContainer/>
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
