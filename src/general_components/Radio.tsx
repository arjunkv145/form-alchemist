import React from 'react';
import styled from 'styled-components';
import { Radio as AntRadio } from 'antd';

export const StyledRadio = styled(AntRadio)``;

const Radio: React.FC<{ defaultValue?: string; options?: { label: string; value: string; disabled?: boolean }[] }> = (
    props
) => {
    return <StyledRadio.Group options={props.options} defaultValue={props.defaultValue} />;
};

export default Radio;
