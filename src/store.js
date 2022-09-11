import { createState } from '@hookstate/core';

const store = createState({
    beaconList: [],
    region: {},
    bannerVisible: true,
    timeSinceLastDetection: 0,
})

export default store;