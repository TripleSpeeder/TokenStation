import React from 'react'
import PropTypes from 'prop-types'
import {addValidationRule} from 'formsy-react'
import {Grid, Header, List, Segment} from 'semantic-ui-react'
import {Label} from 'semantic-ui-react';
import {Form, Input} from 'formsy-semantic-ui-react'

const TransferForm = (props) => {
    const {onValidSubmit, web3} = props
    const toAddress = '0x1b7750e1db62610b0b58e679f3c8895680eb0c89'
    const tokenBalance = web3.toBigNumber('6522.45')
    const tokenName = 'Golem Network Token'
    const tokenUnit = 'GNT'
    const etherBalance = web3.toBigNumber('2.35')
    const etherUnit = 'ETH'
    const gasCosts = web3.toBigNumber('3422')

    const errorLabel = <Label color="red" pointing/>

    addValidationRule('isEthereumAddress', (values, value) => (web3.isAddress(value)))
    addValidationRule('isLessThanOrEqual', (values, value, max) => {
        try {
            const bnValue = web3.toBigNumber(value)
            const bnMax = web3.toBigNumber(max)
            return bnValue.lessThanOrEqualTo(bnMax)
        }
        catch(err) {
            // if anything goes wrong with BigNumber, just fail validation
            return false
        }
    })

    return (
        <Form instantValidation noValidate onValidSubmit={onValidSubmit}>
            <Header size="huge">Transfer '{tokenName}' Tokens</Header>
            <Segment>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <strong>Account address:</strong>
                        </Grid.Column>
                        <Grid.Column width={6}>{toAddress}</Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <strong>Account balance:</strong>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item>
                                    {tokenBalance.toFixed()} {tokenUnit}
                                </List.Item>
                                <List.Item>{etherBalance.toFixed()} {etherUnit}</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment>
            <Header size="medium">To Address</Header>
            <Form.Group>
                <Input width={6}
                            name="toAddress"
                            placeholder="Receiving ethereum address"
                            required
                            instantValidation
                            validations="isEthereumAddress"
                            validationErrors={{
                                isEthereumAddress: 'This is not a valid Ethereum address',
                                isDefaultRequiredValue: 'To Address is Required',
                            }}
                            errorLabel={ errorLabel }
                />
            </Form.Group>

            <Header size="medium">Amount to send</Header>
            <Form.Group>
                <Input width={6}
                            name="amount"
                            placeholder="Enter amount"
                            label={tokenUnit}
                            labelPosition="right"
                            required
                            instantValidation
                            validations={"isNumeric,isLessThanOrEqual:" + tokenBalance.toFixed()}
                            validationErrors={{
                                isNumeric: 'This is not a valid number',
                                isDefaultRequiredValue: 'Amount is Required',
                                isLessThanOrEqual: 'Maximum available balance is ' + tokenBalance.toFixed()
                            }}
                            errorLabel={ errorLabel }
                />
            </Form.Group>
            </Segment>

            <Segment>
            <Header size="medium">Estimated Gas costs</Header>
            <Form.Group>
                <Input width={6}
                       name="gasCosts"
                       label="ETH"
                       labelPosition="right"
                       readOnly
                       value={gasCosts}
                       validations={"isLessThanOrEqual:" + etherBalance.toFixed()}
                       instantValidation
                       validationErrors={{
                           isLessThanOrEqual: 'Not enough ether to cover gas costs'
                       }}
                       errorLabel={ errorLabel }
                />
            </Form.Group>
            </Segment>
            <Form.Group>
                <Form.Button content="Submit" color="green"/>
            </Form.Group>

        </Form>
    )
}

TransferForm.propTypes = {
    web3: PropTypes.object.isRequired
}

TransferForm.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferForm
