import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';

export const StyledCheckboxGroup = styled(Checkbox.Group)``;

const CheckboxGroup: React.FC<{
    options?: { label: string; value: string }[];
    values?: string[];
    defaultValue?: string[];
    onChange?: (checkedValues: unknown[]) => void;
}> = (props) => {
    return <StyledCheckboxGroup {...props} />;
};

export default CheckboxGroup;
