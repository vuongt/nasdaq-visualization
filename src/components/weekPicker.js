import React, {PureComponent} from "react";
import clsx from "clsx";
import isValid from "date-fns/isValid";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";
import {DatePicker} from "material-ui-pickers";
import {IconButton, withStyles} from "@material-ui/core";

class WeekPicker extends PureComponent {
    /**
     * A custom component to pick a week.
     * When selection changes, the end date of the week is passed to a handler.
     * See https://material-ui-pickers.dev/api/datepicker for more details
     * @type {{selectedDate: Date}}
     */
    state = {
        selectedDate: new Date(),
    };

    handleWeekChange = date => {
        this.setState({selectedDate: endOfWeek(date)});
        this.props.onChange(endOfWeek(date))
    };

    formatWeekSelectLabel = (date, invalidLabel) => {
        let dateClone = date;

        return dateClone && isValid(dateClone)
            ? `Week of ${format(endOfWeek(dateClone), "MMM do")}`
            : invalidLabel;
    };

    renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        const {classes} = this.props;
        let dateClone = date;
        let selectedDateClone = selectedDate;

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, {start, end});
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {format(dateClone, "d")} </span>
                </IconButton>
            </div>
        );
    };

    render() {
        const {selectedDate} = this.state;

        return (
            <DatePicker
                value={selectedDate}
                margin="normal"
                onChange={this.handleWeekChange}
                renderDay={this.renderWrappedWeekDay}
                labelFunc={this.formatWeekSelectLabel}
            />
        );
    }
}

const styles = theme => ({
    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
});

export default withStyles(styles)(WeekPicker);
