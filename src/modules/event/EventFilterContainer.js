import React, {Component} from 'react'
import {Container, Dropdown, Form, Grid} from 'semantic-ui-react'
import {changeSelectorTokenIdThunk} from '../token/tokenActions'
import {connect} from 'react-redux'
import {changeSelectorAddressId} from '../address/addressActions'

class EventFilterContainer extends Component {

    render() {
        const {
            tokenOptions, selectedTokenId, onTokenSelect,
            addressOptions, selectedAddressId, onAddressSelect,
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
                        <Form>
                            <Form.Field inline>
                                <label>To/From Account:</label>
                                <Dropdown fluid search selection
                                          options={addressOptions}
                                          onChange={onAddressSelect}
                                          value={selectedAddressId}
                                />
                            </Form.Field>
                        </Form>
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
    tokenOptions.sort((a, b) => (a.text > b.text))

    const selectedAddressId = state.addresses.selector.selectedAddressId
    const addressOptions = state.addresses.allIds.map(id =>
        ({
            key: id,
            value: id,
            text: state.addresses.byId[id].ensName ? state.addresses.byId[id].ensName : id
        })
    )
    addressOptions.sort((a, b) => (a.text > b.text))

    return {
        tokenOptions,
        selectedTokenId,
        addressOptions,
        selectedAddressId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTokenSelect: (e, {value}) => {
            dispatch(changeSelectorTokenIdThunk(value))
        },
        onAddressSelect: (e, {value}) => {
            dispatch(changeSelectorAddressId(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterContainer)

