import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'
import {loadTokenList, TOKEN_LIST_STATES} from './tokenActions'

class TokenLoaderGate extends Component {
    constructor(props, context) {
        super(props, context)
        this.tokenListUrl = "/tokens_1.json"
    }

    componentDidMount() {
        if (this.props.listState === TOKEN_LIST_STATES.VIRGIN) {
            this.props.loadTokenList(this.tokenListUrl)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.listState === TOKEN_LIST_STATES.VIRGIN) {
            newProps.loadTokenList(this.tokenListUrl)
        }
    }

    render() {
        if (this.props.listState === TOKEN_LIST_STATES.INITIALIZED)
        {
            // Load the dapp.
            return Children.only(this.props.children)
        }

        return(
            // Display a loading indicator.
            <div>
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Loading token contracts</Loader>
                    </Dimmer>
                </Segment>
            </div>
        )
    }}

TokenLoaderGate.propTypes = {
    listState: PropTypes.string
}

const mapStateToProps = (state) => ({
    listState: state.tokens.listState.listState
})

const mapDispatchToProps = dispatch => ({
    loadTokenList: (url) => {
        dispatch(loadTokenList(url))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenLoaderGate)
