import React from 'react';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import { DateAttributes } from '../types/FormElements';

export const StyledDatePicker = styled(DatePicker)``;

const Date: React.FC<DateAttributes & { className: string }> = (props) => {
    return <StyledDatePicker {...props} />;
};

export default Date;
