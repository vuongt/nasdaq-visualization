import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import {nasdaqAction} from "./_actions";
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment-timezone'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import WeekPicker from './components/weekPicker'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chart from './components/chart'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit * 10,
        padding: theme.spacing.unit * 2
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frame: "day",
            interval: "5min",
            head: null,
        };
    }

    componentDidMount() {
        this.props.dispatch(nasdaqAction.getNasdaqData("TIME_SERIES_INTRADAY"));
        this.props.dispatch(nasdaqAction.getNasdaqData("TIME_SERIES_DAILY"));
    }

    handleChangeFrame = event => {
        this.setState({frame: event.target.value});
    };

    handleChangeInterval = event => {
        this.setState({interval: event.target.value});
    };

    handleChangeDate = date => {
        this.setState({head: moment(date)});
    };

    render() {
        const {classes, daily, intraday, loading, error} = this.props;
        const {frame, head, interval} = this.state;
        let data = intraday;
        if (interval === "Daily") {
            data = daily
        }
        const timezone = data && data["Meta Data"]["6. Time Zone"];
        const lastRefreshed = data && moment(data["Meta Data"]["3. Last Refreshed"]).tz(timezone);
        return (
            <div>
                <Paper className={classes.root}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        NASDAQ Index
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container className={classes.grid} justify="space-around">
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="data-type">
                                    Data Interval
                                </InputLabel>
                                <Select
                                    value={interval}
                                    onChange={this.handleChangeInterval}
                                    id="data-type">
                                    <MenuItem value="5min">5 minutes</MenuItem>
                                    <MenuItem value="Daily">Daily</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="frame">
                                    Frame
                                </InputLabel>
                                <Select
                                    value={frame}
                                    onChange={this.handleChangeFrame}
                                    id="frame">
                                    <MenuItem value="day">Day</MenuItem>
                                    <MenuItem value="week">Week</MenuItem>
                                    <MenuItem value="month">Month</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="time">
                                    Date
                                </InputLabel>
                                {frame === "day" &&
                                <DatePicker
                                    margin="normal"
                                    value={head || lastRefreshed}
                                    onChange={this.handleChangeDate}
                                    id="time"
                                />}
                                {frame === "week" && <WeekPicker id="time" onChange={this.handleChangeDate}/>}
                                {frame === "month" &&
                                <DatePicker
                                    id="time"
                                    openTo="year"
                                    views={["year", "month"]}
                                    margin="normal"
                                    maxDate={new Date()}
                                    value={head || lastRefreshed}
                                    onChange={this.handleChangeDate}
                                />}
                            </FormControl>

                        </Grid>
                    </MuiPickersUtilsProvider>
                    {!loading && data &&
                    <Chart data={data} head={head || lastRefreshed} frame={frame} interval={interval}/>}
                    {loading && <Grid container justify="space-around" direction="column" alignItems="center">
                        <div><CircularProgress className={classes.progress}/></div>
                        <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
                            Loading data...
                        </Typography>
                    </Grid>}
                    {error && <Grid container justify="space-around" direction="column" alignItems="center">
                        <Typography component="h5" variant="h5" align="center" color="textSecondary" gutterBottom>
                            Error loading data, please try to reload the page.
                        </Typography>
                    </Grid>}
                    {interval === "5min" &&
                    <div>
                        <Typography component="subtitle1" variant="subtitle1" align="right" color="textSecondary" gutterBottom>
                            Time zone: {timezone}
                        </Typography>
                        <Typography component="subtitle1" variant="subtitle1" align="right" color="textSecondary" gutterBottom>
                            Last updated: {lastRefreshed && lastRefreshed.startOf('day').fromNow()}
                        </Typography>
                    </div>}
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {nasdaq} = state;
    return nasdaq;
}

export default withStyles(styles)(connect(mapStateToProps)(App));
