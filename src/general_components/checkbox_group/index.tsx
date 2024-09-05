import React from 'react';
import { StyledCheckboxGroup } from './style';

const CheckboxGroup: React.FC<{
    options?: { label: string; value: string }[];
    values?: string[];
    onChange?: (checkedValues: unknown[]) => void;
}> = (props) => {
    return <StyledCheckboxGroup {...props} />;
};

export default CheckboxGroup;
