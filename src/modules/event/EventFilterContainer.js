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

    // build up token selector results. State just contains matched tokenIDs, but in order
    // for the Search component to work correctly, results need to have "key" property.
    let tokenResults = state.tokens.selector.matchedTokenIds.map(id =>
        ({
            token: state.tokens.byId[id],
            key: id
        })
    )


    // value of address selector should either be the searchstring or the last selected address
    let addressValue = state.addresses.selector.filter
    if (state.addresses.selector.selectedAddressId) {
        addressValue = state.addresses.selector.selectedAddressId
    }

    // build up address selector results. State just contains matched addresses, but in order
    // for the Search component to work correctly, addresses need to have "key" property.
    let addressResults = state.addresses.selector.matchedAddressIds.map(id =>
        ({
            address: state.addresses.byId[id],
            key: id,
        })
    )

    return {
        tokenValue: tokenValue,
        tokenResults,
        addressValue: addressValue,
        addressResults,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTokenSearchChange: (e, data) => {
            dispatch(setTokenSelectorFilter(data.value))
        },
        onTokenSelect: (e, data) => {
            dispatch(changeSelectorTokenId(data.result.token.id))
        },
        onAddressSearchChange: (e, data) => {
            dispatch(setAddressSelectorFilter(data.value))
        },
        onAddressSelect: (e, data) => {
            dispatch(changeSelectorAddressId(data.result.address.address))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterContainer)

