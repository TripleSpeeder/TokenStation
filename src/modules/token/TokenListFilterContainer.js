import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setFilterProps} from './tokenActions'
import TokenListFilter from './TokenListFilter'
import {setBalanceFilterString} from '../balance/balanceActions'

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
    target: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    displayed: PropTypes.number.isRequired,
    clearFilter: PropTypes.func.isRequired,
    filterIsActive: PropTypes.bool.isRequired,
    filterString: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const {target} = ownProps

    if (target === 'tokenlist') {
        return {
            total: state.tokens.allIds.length,
            displayed: state.tokens.listState.matchedTokenIds.length,
            filterIsActive: state.tokens.listState.filterIsActive,
            filterString: state.tokens.listState.filter,
            showOnlyTracked: state.tokens.listState.showOnlyTracked,
        }
    }
    if (target === 'balancelist') {
        return {
            total: state.balance.allIds.length,
            displayed: state.balance.listState.matchedBalanceIds.length,
            filterIsActive: state.balance.listState.filter.length > 0,
            filterString: state.balance.listState.filter,
        }
    }

    return {}
}


const mapDispatchToProps = (dispatch, ownProps) => {
    const {target} = ownProps

    if (target === 'tokenlist') {
        return {
            clearFilter: () => {
                dispatch(setFilterProps({filterString: ''}))
            },
            setFilterString: (filter) => {
                dispatch(setFilterProps({filterString: filter}))
            }
        }
    }

    if (target === 'balancelist') {
        return {
            clearFilter: () => {
                dispatch(setBalanceFilterString(''))
            },
            setFilterString: (filter) => {
                dispatch(setBalanceFilterString(filter))
            }
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TokenListFilterContainer)
