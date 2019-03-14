import moment from "moment-timezone";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({data, head, frame, interval}) => {
    /**
     * Chart component that renders data based on user's choice of frame, data interval and specific date (head)
     */
    let visualizedPoints = [];
    const timezone = data["Meta Data"]["6. Time Zone"];
    const allPoints = data[`Time Series (${interval})`];

    // Filter data based on visualization options
    if (frame === "day") {
        allPoints && Object.keys(allPoints).forEach(key => {
            const timestamp = moment.tz(key, timezone);
            if (timestamp.isSame(head, 'day')) {
                visualizedPoints.unshift({
                    label: timestamp.format("HH:mm"),
                    y: parseFloat(allPoints[key]["1. open"])
                })
            }
        });
    } else if (frame === "month" || frame === "week") {
        allPoints && Object.keys(allPoints).forEach(key => {
            const timestamp = moment.tz(key, timezone);
            if (timestamp.isSame(head, frame)) {
                visualizedPoints.unshift({
                    label: timestamp.format("DD-MM"),
                    y: parseFloat(allPoints[key]["1. open"])
                })
            }
        });
    }

    // If there is no data, show an error message
    if (visualizedPoints.length === 0) {
        return <Typography component="h6" variant="h6" align="center" color="textSecondary" gutterBottom>
            No data available for this period. Please try to increase data interval.
        </Typography>
    }

    const options = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        axisY: {
            includeZero: false
        },
        data: [{
            type: "area",
            dataPoints: visualizedPoints
        }]
    };

    return <CanvasJSChart options={options}/>
};

export default Chart;