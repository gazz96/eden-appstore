import { hookstate, useHookstate } from '@hookstate/core';

const shopParamsState = hookstate({
    keyword: '',
    tipe_listing: '',
    tipe_bangunan: '',
    harga_terendah: 100000,
    harga_tertinggi: 999999999999,
    kota: ''
});

const ShopContext = () => {
    const shopParams = useHookstate(shopParamsState);
    return shopParams;
}

export default ShopContext;