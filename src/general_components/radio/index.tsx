import React from 'react';
import { RadioProps, RadioChangeEvent } from 'antd';
import { StyledRadio } from './style';

const Radio: React.FC<RadioProps & { options: { label: string; value: string; disabled?: boolean }[] }> = (props) => {
    const onChange = (e: RadioChangeEvent) => props.onChange && props.onChange(e);
    return <StyledRadio.Group options={props.options} onChange={onChange} value={props.value} />;
};

export default Radio;
