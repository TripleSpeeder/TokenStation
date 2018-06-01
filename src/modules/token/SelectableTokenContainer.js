import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import SelectableToken from "./SelectableToken"


class SelectableTokenContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle(e, obj) {
        this.props.onToggle(this.props.tokenId)
    }

    render() {
        return <SelectableToken id={this.props.tokenId}
                                address={this.props.tokenAddress}
                                name={this.props.tokenName}
                                symbol={this.props.tokenSymbol}
                                onToggle={this.handleToggle}/>
    }
}

SelectableTokenContainer.propTypes = {
    tokenId: PropTypes.number.isRequired,
    tokenAddress: PropTypes.string.isRequired,
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
}

SelectableTokenContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const token = state.tokens.byId[ownProps.tokenId]
    return {
        tokenAddress: token.address,
        tokenName: token.name,
        tokenSymbol: token.symbol,
    }
}

const mapDispatchToProps = dispatch => ({
    onToggle: (tokenId) => {
        // dispatch(toggleTrackToken(tokenID))
        console.log("TODO: dispatch(toggleTrackToken(" + tokenId + "))")
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenContainer)