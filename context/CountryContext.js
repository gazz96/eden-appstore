import { hookstate, useHookstate } from '@hookstate/core';

const selectCountryCode = hookstate(null);

const CountryContext = () => {
    const city = useHookstate(selectCountryCode);
    return city;
}

export default CountryContext;