import styled from 'styled-components';
import { TimePicker } from 'antd';
import { TimeAttributes } from '../types/FormElements';

export const StyledTimePicker = styled(TimePicker)``;

const Time: React.FC<TimeAttributes & { className: string }> = () => {
    return <StyledTimePicker />;
};

export default Time;
