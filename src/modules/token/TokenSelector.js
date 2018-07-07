import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Search} from "semantic-ui-react"
import {connect} from "react-redux"
import _ from 'lodash'

class TokenSelector extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        this.setState({value: result.title})
        this.props.onTokenSelected(result.id)
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.tokenList, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state
        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
            />
        )
    }
}

TokenSelector.propTypes = {
    tokenList: PropTypes.array.isRequired,
/*    txHash: PropTypes.string.isRequired,
    blockNumber: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        TRANSFER_EVENT_TYPES.NEUTRAL,
        TRANSFER_EVENT_TYPES.POSITIVE,
        TRANSFER_EVENT_TYPES.NEGATIVE
    ]).isRequired,
    quantity: PropTypes.object.isRequired, // BigNum
    positive: PropTypes.bool.isRequired,
    negative: PropTypes.bool.isRequired,
*/}

TokenSelector.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state) => {
    return {}
}


const mapDispatchToProps = (dispatch) => {
    return {
        /*
        clearFilter: () => {
            dispatch(setFilterProps({filterString: ''}))
        },
        setFilterString: (filter) => {
            dispatch(setFilterProps({filterString: filter}))
        }
        */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenSelector)
