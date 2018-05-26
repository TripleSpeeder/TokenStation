import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import BalancesListContainer from './BalancesListContainer'
import AddressListContainer from '../address/AddressListContainer'
import TokenListFilterContainer from '../token/TokenListFilterContainer'
import QueryAddressFormContainer from "../address/QueryAddressFormContainer"


class BalancesContainer extends Component {

    render() {
        return (
            <div>
                <Segment>
                    <AddressListContainer/>
                    <QueryAddressFormContainer/>
                </Segment>
                <Segment>
                    <TokenListFilterContainer/>
                </Segment>
                <BalancesListContainer/>
            </div>
        )
    }
}

export default BalancesContainer
