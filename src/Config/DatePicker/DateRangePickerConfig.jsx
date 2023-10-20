import { DatePicker } from 'antd';
import dayjs from 'dayjs';

// eslint-disable-next-line react/prop-types
const DateRangePickerWrapper = ({ value, onChange, ...otherProps }) => {
    const handleChange = (dates) => {
        if (dates && dates.length === 2) {
            // Format the selected dates to your desired format
            const formattedDates = dates.map((date) => dayjs(date).format('YYYY/MM/DD'));
            onChange(formattedDates);
        } else {
            onChange([]);
        }
    };

    // Ensure that value is always an array or default to an empty array
    const selectedValue = Array.isArray(value) ? value : [];

    return (
        <DatePicker.RangePicker
            value={selectedValue.length === 2 ? [dayjs(selectedValue[0]), dayjs(selectedValue[1])] : []}
            onChange={handleChange}
            {...otherProps}
        />
    );
};

export default DateRangePickerWrapper;
