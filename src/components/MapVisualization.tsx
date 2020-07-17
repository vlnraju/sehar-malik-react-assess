import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader as CardHeaderRaw,
  CardContent,
  withStyles,
  Theme,
} from '@material-ui/core';
import { Map, GoogleApiWrapper, Marker, GoogleAPI } from 'google-maps-react';

import * as secrets from '../secrets';
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
    margin: '0 5em',
  },
  content: {
    height: '110vh',
  },
};

interface MapContainerProps {
  google: GoogleAPI;
  dronePosition: google.maps.LatLngLiteral;
}

const MapContainer = GoogleApiWrapper({
  apiKey: secrets.googleMapKey,
})(({ google, dronePosition }: MapContainerProps) => {
  return (
    <Map
      google={google}
      zoom={6}
      centerAroundCurrentLocation
      center={dronePosition}
      // style={{ width: '85%', height: '100%', position: 'relative' }}
    >
      <Marker
        title={`Drone Position ${JSON.stringify(dronePosition)}`}
        position={dronePosition}
      />
    </Map>
  );
});

interface MapVisualizationProps {
  classes: any;
  lastReceived: number;
  latitude: number;
  longitude: number;
}

const MapVisualization: React.SFC<MapVisualizationProps> = ({
  classes,
  lastReceived,
  latitude,
  longitude,
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Map Visualization" />
      <CardContent className={classes.content}>
        <MapContainer dronePosition={{ lat: latitude, lng: longitude }} />
        <p>Last Received: {lastReceived}</p>
      </CardContent>
    </Card>
  );
};

export default connect(
  ({
    drone: {
      lastReceived,
      data: [{ latitude, longitude }],
    },
  }: Store) => ({
    latitude,
    longitude,
    lastReceived,
  })
)(withStyles(styles)(MapVisualization));
