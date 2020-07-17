import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader as CardHeaderRaw,
  CardContent,
  withStyles,
  Theme,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';

import { Store } from '../store';
import { DroneData } from '../store/reducers/Drone';

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
    marginLeft: '1em',
  },
};

interface Props {
  classes: any;
  dataset: DroneData[];
}

const GraphVisualization: React.SFC<Props> = ({ classes, dataset }) => {
  const data = {
    labels: dataset.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Drone Temperature',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: dataset.map(d => d.metric),
      },
    ],
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Graph Visualization" />
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default connect(({ drone: { data } }: Store) => ({
  dataset: data,
}))(withStyles(styles)(GraphVisualization));
