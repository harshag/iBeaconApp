import { createState } from '@hookstate/core';

const store = createState({
    beaconList: [],
    region: {},
    bannerVisible: true
})

export default store;