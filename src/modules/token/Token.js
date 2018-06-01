import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Label, Item, Button, Icon} from 'semantic-ui-react'
import Blockies from 'react-blockies'
import {Link} from 'react-router-dom'

const Token = (props) => {

    const {address, name, symbol, description, website, decimals, supply, loading} = props.token
    const {tokenEventsLinkOptions} = props
    let imageUrl = props.token.imageUrl
    if (!imageUrl) {
        imageUrl = "Silvercoin.png"
    }
    let supplyValue = supply.supply ? supply.supply.toFixed(0) : <Icon loading name='spinner'/>

    let meta = null
    if (website) {
        meta = <Item.Meta><a href={website} target='_blank'>{website}</a></Item.Meta>
    }

    let eventLink = <Link to={tokenEventsLinkOptions}>{name}</Link>

    return (
        <Item>
            <Item.Image size='tiny'>
                <Blockies seed={address.toLowerCase()}
                          size={8}
                          scale={8}
                />
            </Item.Image>
            <Item.Content>
                <Item.Header>{eventLink} ({symbol})</Item.Header>
                {meta}
                <Button floated='right'
                        size='small'
                        circular
                        icon='refresh'
                        loading={loading}
                        onClick={props.handleRefresh}
                />
                <Item.Description>
                    {description}
                </Item.Description>
                <Label.Group>
                    <Label>
                        Supply:
                        <Label.Detail>{supplyValue}</Label.Detail>
                    </Label>
                    <Label>
                        Decimals:
                        <Label.Detail>{decimals.e}</Label.Detail>
                    </Label>
                    <Label as='a' href={props.etherscanUrl} target='_blank'>
                        Contract:
                        <Label.Detail>{address}</Label.Detail>
                    </Label>
                </Label.Group>
            </Item.Content>
        </Item>
    )
}

Token.propTypes = {
    token: PropTypes.object.isRequired,
    loadingBalance: PropTypes.bool,
    handleRefresh: PropTypes.func.isRequired,
    etherscanUrl: PropTypes.string.isRequired,
    tokenEventsLinkOptions: PropTypes.object.isRequired,
}

Token.defaultProps = {
    loadingBalance: false
}

export default Token
