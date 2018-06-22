import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import BalancesListContainer from './BalancesListContainer'
import AddressListContainer from '../address/AddressListContainer'
import TokenListFilterContainer from '../token/TokenListFilterContainer'


class BalancesContainer extends Component {

    render() {
        return (
            <div>
                <Segment>
                    <AddressListContainer/>
                </Segment>
                <Segment>
                    <TokenListFilterContainer target={'balancelist'}/>
                </Segment>
                <BalancesListContainer/>
            </div>
        )
    }
}

export default BalancesContainer
