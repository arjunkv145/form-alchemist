import { OptionsApiConfig } from '../types/FormElements';

async function getOptionsFromApi({ url, dataPath, labelKey, valueKey }: OptionsApiConfig) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        const dataPathArray = dataPath.replace(/\[(\w+)\]/g, '.$1').split('.');
        const options = dataPathArray.reduce((acc, key) => (acc !== undefined ? acc[key] : undefined), data);

        if (Array.isArray(options))
            return options.map((option) => ({ label: option[labelKey], value: option[valueKey] }));

        return undefined;
    } catch (e) {
        return undefined;
    }
}
export default getOptionsFromApi;
