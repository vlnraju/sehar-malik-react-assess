import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader as CardHeaderRaw,
  CardContent,
  withStyles,
  Theme,
} from '@material-ui/core';

import { toF } from '../utilities';
import { Store } from '../store';

const cardStyles = (theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  title: {
    color: 'white',
  },
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    flexGrow: 1,
    margin: '2em 5em',
    marginRight: '1em',
  },
};

interface Props {
  classes: any;
  latitude: number;
  longitude: number;
  temperatureinFahrenheit: number;
  temperatureinCelsius: number;
  lastReceived: string;
}

const Dashboard: React.SFC<Props> = ({
  classes,
  latitude,
  longitude,
  temperatureinFahrenheit,
  temperatureinCelsius,
  lastReceived,
}) => {
  const temperature = `${temperatureinFahrenheit}°F ${temperatureinCelsius}°C`;

  return (
    <Card className={classes.card}>
      <CardHeader title="Dashboard" />
      <CardContent>
        <p>Temperature: {temperature}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <p>Last Received: {lastReceived}</p>
      </CardContent>
    </Card>
  );
};

export default connect(
  ({
    drone: {
      data: [{ latitude, longitude, metric }],
      lastReceived,
    },
  }: Store) => ({
    latitude,
    longitude,
    temperatureinFahrenheit: toF(metric),
    temperatureinCelsius: metric,
    lastReceived,
  })
)(withStyles(styles)(Dashboard) as any);
