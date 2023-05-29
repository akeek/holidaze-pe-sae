import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";

const Calendar = ({ onChange }) => {
    const [state, setState] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }
    ]);

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        onChange(selection);
        setState([selection]);
    };

    return (
        <DateRangePicker
            onChange={handleOnChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
        />
    );
};

Calendar.propTypes = {
    onChange: PropTypes.func
};

export default Calendar;
