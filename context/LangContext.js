import { hookstate, useHookstate } from '@hookstate/core';

const selectedLang = hookstate('en');

const LangContext = () => {
    return useHookstate(selectedLang);
}

export default LangContext;