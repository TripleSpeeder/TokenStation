import React from "react"
import Enzyme, {shallow} from 'enzyme'
import {addressStates, QueryAddressFormContainer} from './QueryAddressFormContainer'
import Adapter from "enzyme-adapter-react-16"
import QueryAddressForm from './QueryAddressForm'
const Ens = require('ethjs-ens')

Enzyme.configure({adapter: new Adapter()})

jest.mock('ethjs-ens')

function setup() {
    const props = {
        ens: Ens
    }
    const wrapper = shallow(<QueryAddressFormContainer ens={props.ens}/>)
    return {
        props,
        wrapper
    }
}

describe("QueryAddressFormContainer", () => {
    const validAddress = '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
    const validENSName = 'michael.eth'
    const unknownENSName = 'not.resolving.eth'
    const invalidInput = 'invalid'

    test("renders", () => {
        const {wrapper} = setup()
        expect(wrapper.exists()).toBe(true)
    })

    test("Initial state", () => {
        const {wrapper} = setup()
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(true)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual('')
    })

    test("invalid input results in error", () => {
        const {wrapper} = setup()
        const event = {
            target: { value: invalidInput }
        };
        wrapper.instance().handleChange(event)
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(true)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual(invalidInput)
    })

    test("valid Eth address is accepted", () => {
        const {wrapper} = setup()
        const event = {
            target: { value: validAddress }
        };
        wrapper.instance().handleChange(event)
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(false)
        expect(inputProps.disabled).toBe(false)
        expect(inputProps.address).toEqual(validAddress)
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual(validAddress)
    })

    test("valid ENSname starts resolving", async () => {
        const {props, wrapper} = setup()
        const event = {
            target: { value: validENSName }
        };
        Ens.lookup.mockResolvedValue('0x1000000000000000000000000000000000000001')
        wrapper.instance().handleChange(event)
        // Now should be in "loading" state
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(true)
        expect(inputProps.error).toBe(false)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual(validENSName)
        expect(inputProps.value).toEqual(validENSName)
    })

    test("valid ENSName is accepted (test via setState)", () => {
        const {wrapper} = setup()
        // Manually set state like a resolving ens lookup would do.
        wrapper.setState({
            addressState: addressStates.ADDRESS_VALID,
            address: validAddress,
            ensName: validENSName,
            input: validENSName,
        })
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(false)
        expect(inputProps.disabled).toBe(false)
        expect(inputProps.address).toEqual(validAddress)
        expect(inputProps.ensName).toEqual(validENSName)
        expect(inputProps.value).toEqual(validENSName)
    })

    test("unknown ENSname results in error (test via setState)", () => {
        const {wrapper} = setup()
        // Manually set state like a rejected ens lookup would do.
        wrapper.setState({
            addressState: addressStates.ADDRESS_INVALID,
            address: '',
            ensName: unknownENSName,
            input: unknownENSName,
        })
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(true)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual(unknownENSName)
        expect(inputProps.value).toEqual(unknownENSName)
    })
})
