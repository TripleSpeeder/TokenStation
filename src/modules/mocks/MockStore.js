// A super-simple mock of a redux store
import {action} from '@storybook/addon-actions'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from '../address/addressActions'
import {BigNumber} from 'bignumber.js'
import {BALANCE_STATES} from '../balance/balanceActions'

const addresses = {
    allIds: ['0xAccountAddress1', '0xAccountAddress2', '0xAccountAddress3'],
    byId: {
        a1: {
            address: '0xAccountAddress1',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_OWNED,
        },
        a2: {
            address: '0xAccountAddress2',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_OWNED,
        },
        a3: {
            address: '0xAccountAddress3',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_EXTERNAL,
        }
    }
}

const tokens = {
    allIds: [1, 2, 3],
    byId: {
        1: {
            address: '0x1ContractAddress',
            decimals: BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'Arcade Network Token',
            supply: {
                loading: false,
                supply: BigNumber(20000000)
            },
            symbol: 'ANT',
            website: null,
        },
        2: {
            address: '0x2ContractAddress',
            decimals: BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'District0x Network Token',
            supply: {
                loading: false,
                supply: BigNumber(1000000000000000000000000000)
            },
            symbol: 'DNT',
            website: null,
        },
        3: {
            address: '0x3ContractAddress',
            decimals: BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'OmiseGo',
            supply: {
                loading: false,
                supply: BigNumber(1000000000000000000000000000)
            },
            symbol: 'OMG',
            website: null,
        }
    }
}

const balance = {
    allIds:['b1','b2','b3','b4','b5','b6'],
    byId: {
        b1: {
            balanceId: "b1",
            addressId: "a1",
            tokenId: "1",
            balance: BigNumber('100'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b2: {
            balanceId: "b2",
            addressId: "a2",
            tokenId: "1",
            balance: BigNumber('200'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b3: {
            balanceId: "b3",
            addressId: "a3",
            tokenId: "1",
            balance: BigNumber('300'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b4: {
            balanceId: "b4",
            addressId: "a1",
            tokenId: "2",
            balance: BigNumber('400'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b5: {
            balanceId: "b5",
            addressId: "a2",
            tokenId: "3",
            balance: BigNumber('200'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b6: {
            balanceId: "b6",
            addressId: "a3",
            tokenId: "3",
            balance: BigNumber('300'),
            balanceState: BALANCE_STATES.INITIALIZED
        }
    }
}

const mockStore = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens,
            addresses: addresses,

        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

export default mockStore
