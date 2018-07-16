import React, {Component} from 'react'
import AddressSelector from '../address/AddressSelector'
import {Container, Grid} from 'semantic-ui-react'
import TokenSelector from '../token/TokenSelector'
import {
    changeSelectorTokenId,
    setTokenSelectorFilter
} from '../token/tokenActions'
import {connect} from 'react-redux'
import {changeSelectorAddressId, setAddressSelectorFilter} from '../address/addressActions'

class EventFilterContainer extends Component {

    render() {
        const {
            onTokenSearchChange, onTokenSelect, tokenResults, tokenValue,
            onAddressSearchChange, onAddressSelect, addressResults, addressValue,
        } = this.props

        return (
            <Container>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <TokenSelector onSearchChange={onTokenSearchChange}
                                       onTokenSelect={onTokenSelect}
                                       results={tokenResults}
                                       value={tokenValue}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <AddressSelector onSearchChange={onAddressSearchChange}
                                         onAddressSelect={onAddressSelect}
                                         results={addressResults}
                                         value={addressValue}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
        )
    }
}

EventFilterContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

EventFilterContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state) => {
    // value of token selector should either be the searchstring or the last selected token
    let tokenValue = state.tokens.selector.filter
    if (state.tokens.selector.selectedTokenId) {
        const selectedToken = state.tokens.byId[state.tokens.selector.selectedTokenId]
        tokenValue = selectedToken.name
    }

    // value of address selector should either be the searchstring or the last selected address
    let addressValue = state.addresses.selector.filter
    if (state.addresses.selector.selectedAddressId) {
        addressValue = state.addresses.selector.selectedAddressId
    }

    return {
        tokenValue: tokenValue,
        tokenResults: state.tokens.selector.matchedTokenIds.map(id => state.tokens.byId[id]),
        addressValue: addressValue,
        addressResults: state.addresses.selector.matchedAddressIds.map(id => state.addresses.byId[id])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTokenSearchChange: (e, data) => {
            dispatch(setTokenSelectorFilter(data.value))
        },
        onTokenSelect: (e, data) => {
            dispatch(changeSelectorTokenId(data.result.id))
        },
        onAddressSearchChange: (e, data) => {
            dispatch(setAddressSelectorFilter(data.value))
        },
        onAddressSelect: (e, data) => {
            dispatch(changeSelectorAddressId(data.result.address))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterContainer)

