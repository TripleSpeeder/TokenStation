import React, {Component} from 'react'
import AddressSelector from '../address/AddressSelector'
import {Container, Dropdown, Form, Grid} from 'semantic-ui-react'
import {changeSelectorTokenId} from '../token/tokenActions'
import {connect} from 'react-redux'
import {changeSelectorAddressId, setAddressSelectorFilter} from '../address/addressActions'

class EventFilterContainer extends Component {

    render() {
        const {
            onTokenSelect,
            onAddressSearchChange, onAddressSelect, addressResults, addressValue,
            tokenOptions, selectedTokenId,
        } = this.props

        return (
            <Container>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field inline>
                                <label>Show Transfers of token:</label>
                                <Dropdown fluid search selection
                                          options={tokenOptions}
                                          onChange={onTokenSelect}
                                          value={selectedTokenId}
                                />
                            </Form.Field>
                        </Form>
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

    const selectedTokenId = state.tokens.selector.selectedTokenId
    const tokenOptions = state.tokens.trackedIds.map(id => (
        {
            key: id,
            value: id,
            text: state.tokens.byId[id].name + " (" + state.tokens.byId[id].symbol + ")"
        }
    ))

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
        addressValue: addressValue,
        addressResults,
        tokenOptions,
        selectedTokenId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTokenSelect: (e, {value}) => {
            dispatch(changeSelectorTokenId(value))
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

