import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import SelectableToken from "./SelectableToken"
import {changeTokenTracking} from './tokenActions'


class SelectableTokenContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, data) {
        const {checked} = data
        this.props.onChange(this.props.tokenId, checked)
    }

    render() {
        return <SelectableToken id={this.props.tokenId}
                                address={this.props.tokenAddress}
                                name={this.props.tokenName}
                                symbol={this.props.tokenSymbol}
                                onChange={this.handleChange}
                                checked={this.props.checked}
        />
    }
}

SelectableTokenContainer.propTypes = {
    tokenId: PropTypes.number.isRequired,
    tokenAddress: PropTypes.string.isRequired,
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
        tokenTracked: token.tracked,
    }
}

const mapDispatchToProps = dispatch => ({
    onChange: (tokenId, checked) => {
        dispatch(changeTokenTracking(tokenId, checked))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenContainer)
