import { FormElement } from '../types/FormElements';

function extractIndexAndElement(uid: string, data: FormElement[]) {
    const tempData: FormElement[] = JSON.parse(JSON.stringify(data));

    for (let i = 0; i < tempData.length; i++) {
        const fe = tempData[i];
        if (fe.uid === uid) {
            const filteredData = tempData.filter((fe) => fe.uid !== uid);
            return { index: i, element: fe, filteredData };
        }
    }
    return null;
}

export default extractIndexAndElement;
