import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeSelectorTokenId} from '../token/tokenActions'
import Events from './Events'
import {changeSelectorAddressId} from '../address/addressActions'

class EventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
        EventsContainer.mapRouteParamsToState(props)
    }

    /* If route params contain tokenId and/or address trigger according actions to have them in store */
    static mapRouteParamsToState(props) {
        if (props.match.params.tokenId) {
            props.setSelectedToken(props.match.params.tokenId)
            if (props.match.params.address) {
                props.setSelectedAddress(props.match.params.address)
            } else {
                // if a token is provided, but no address -> make sure to display events of all watched addresses
                props.setSelectedAddress(undefined)
            }
        }
    }

    componentWillReceiveProps(newProps) {
        EventsContainer.mapRouteParamsToState(newProps)
    }

    render() {
        return <Events/>
    }
}

EventsContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

EventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    setSelectedToken: (tokenId) => {
        dispatch(changeSelectorTokenId(tokenId))
    },
    setSelectedAddress: (address) => {
        dispatch(changeSelectorAddressId(address))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)
