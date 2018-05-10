import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setFilterString} from './tokenActions'
import TokenListFilter from './TokenListFilter'

class TokenListFilterContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {name, value}) {
        this.props.setFilterString(value)
    }

    render() {
        return <TokenListFilter filterString={this.props.filterString}
                                handleChange={this.handleChange}
                                filterIsActive={this.props.filterIsActive}
                                displayed={this.props.displayed}
                                total={this.props.total}
                                clearFilter={this.props.clearFilter}/>
    }
}

TokenListFilterContainer.propTypes = {
    total: PropTypes.number.isRequired,
    displayed: PropTypes.number.isRequired,
    clearFilter: PropTypes.func.isRequired,
    filterIsActive: PropTypes.bool.isRequired,
    filterString: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    total: state.tokens.allIds.length,
    displayed: state.tokens.listState.matchedTokenIds.length,
    filterIsActive: state.tokens.listState.filter.length > 0,
    filterString: state.tokens.listState.filter,
})

const mapDispatchToProps = dispatch => ({
    clearFilter: () => {
        dispatch(setFilterString(''))
    },
    setFilterString: (filter) => {
        dispatch(setFilterString(filter))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TokenListFilterContainer)
