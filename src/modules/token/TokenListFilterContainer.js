import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Message} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setFilterString} from './tokenActions'

class TokenListFilterContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {name, value}) {
        this.props.setFilterString(value)
    }

    render() {
        return (
            <Form>
                <Input label='Filter'
                       name='filter'
                       icon='search'
                       placeholder='Enter name, symbol or contract address'
                       fluid
                       onChange={this.handleChange}
                       value={this.props.filterString}
                />
                <Message info icon size='small' hidden={!this.props.filterIsActive}>
                    <Icon size='small' name='info'/>
                    <Message.Content>
                        Showing {this.props.displayed} of {this.props.total} tokens. <a href='#' onClick={this.props.clearFilter}>Clear filter</a>
                    </Message.Content>
                </Message>
            </Form>
        )
    }
}

TokenListFilterContainer.propTypes = {
    total: PropTypes.number.isRequired,
    displayed: PropTypes.number.isRequired,
    clearFilter: PropTypes.func.isRequired,
    filterIsActive: PropTypes.bool.isRequired,
    filterString: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
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
