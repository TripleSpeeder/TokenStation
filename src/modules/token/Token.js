import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Label, Item, Statistic, Button, Divider} from "semantic-ui-react"
import TokenBalanceContainer from "../tokenBalance/TokenBalanceContainer"

class Token extends Component {
    constructor(props, context) {
        super(props, context)
        this.rendercount = 0;
    }

    render() {
        const {address, name, symbol, description, website, decimals, supply, loading} = this.props.token
        let imageUrl = this.props.token.imageUrl
        if (imageUrl === 'none') {
            imageUrl = "Silvercoin.png"
        }

        // TESTING
        this.rendercount+=1
        console.log("Rendering " + name + ", Rendercount: " + this.rendercount)

        return (
            <Item>
                <Item.Image size='tiny' src={imageUrl}></Item.Image>
                <Item.Content>
                    <Item.Header>{name} ({symbol})</Item.Header>
                    <Statistic floated='right'>
                        <Statistic.Value>
                            <TokenBalanceContainer tokenId={this.props.token.id}/>
                        </Statistic.Value>
                    </Statistic>
                    <Item.Meta>
                        <a href={website} target='_blank'>{website}</a>
                    </Item.Meta>
                    <Divider/>
                    <Button floated='right'
                            size='small'
                            circular
                            icon='refresh'
                            loading={loading}
                            onClick={this.props.handleRefresh}
                    />
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Label.Group>
                        <Label>
                            Supply:
                            <Label.Detail>{supply.toFixed(0)}</Label.Detail>
                        </Label>
                        <Label>
                            Decimals:
                            <Label.Detail>{decimals.toFixed(0)}</Label.Detail>
                        </Label>
                        <Label as='a' href='https://etherscan.io/address/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0'>
                            Contract:
                            <Label.Detail>{address}</Label.Detail>
                        </Label>
                    </Label.Group>
                </Item.Content>
            </Item>
        )
    }
}

Token.propTypes = {
    token: PropTypes.object.isRequired,
    loadingBalance: PropTypes.bool,
    handleRefresh: PropTypes.func.isRequired,
}

Token.defaultProps = {
    //myProp: <defaultValue>
    loadingBalance: false
}

export default Token
