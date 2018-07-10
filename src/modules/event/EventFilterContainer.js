import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AddressSelector from '../address/AddressSelector'
import {Container, Grid} from 'semantic-ui-react'
import TokenSelector from '../token/TokenSelector'
import {
    CHANGE_TOKEN_SELECTOR_FILTER_PROPS,
    changeTokenSelectorFilterProps,
    setFilterProps,
    setTokenSelectorFilter
} from '../token/tokenActions'
import {connect} from 'react-redux'

class EventFilterContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

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
    return {
        tokenValue: state.tokens.selector.filter,
        tokenResults: state.tokens.selector.matchedTokenIds.map(id => state.tokens.byId[id]),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTokenSearchChange: (e, data) => {
            dispatch(setTokenSelectorFilter(data.value))
        },
        onTokenSelect: (e, data) => {
            console.log("TODO")
            // dispatch(setFilterProps({filterString: ''}))
        },
        onAddressSearchChange: (e, data) => {
            console.log("TODO")
            // dispatch(setFilterProps({filterString: ''}))
        },
        onAddressSelect: (e, data) => {
            console.log("TODO")
            // dispatch(setFilterProps({filterString: ''}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFilterContainer)

