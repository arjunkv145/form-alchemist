import { TimeAttributes } from '../../types/FormElements';
import { StyledTimePicker } from './style';

const Time: React.FC<TimeAttributes & { className: string }> = () => {
    return <StyledTimePicker />;
};

export default Time;
