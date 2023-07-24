import { hookstate, useHookstate } from '@hookstate/core';

const selectCityState = hookstate({
    id: '',
    nama: ''
});

const SelectCityContext = () => {
    const city = useHookstate(selectCityState);
    return city;
}

export default SelectCityContext;