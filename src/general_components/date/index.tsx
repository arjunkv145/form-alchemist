import { DateAttributes } from '../../types/FormElements';
import { StyledDatePicker } from './style';

const Date: React.FC<DateAttributes & { className: string }> = (props) => {
    return <StyledDatePicker {...props} />;
};

export default Date;
