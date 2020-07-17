import React from 'react';
import { connect } from 'react-redux';
import ChipRaw from '@material-ui/core/Chip';
import { withStyles, Theme } from '@material-ui/core/styles';

import { Store } from '../store';

const cardStyles = (theme: Theme) => ({
  root: {
    background: theme.palette.secondary.main,
  },
  label: {
    color: theme.palette.primary.main,
  },
});
const Chip = withStyles(cardStyles)(ChipRaw);

interface Props {
  name: string;
  weather_state_name: string;
  temperatureinFahrenheit: number;
}

const Weather: React.SFC<Props> = ({
  name,
  weather_state_name,
  temperatureinFahrenheit,
}) => {
  return (
    <Chip
      label={`Weather in ${name}: ${weather_state_name} and ${temperatureinFahrenheit}°`}
    />
  );
};

export default connect(
  ({
    weather: { name, weather_state_name, temperatureinFahrenheit },
  }: Store) => ({
    name,
    weather_state_name,
    temperatureinFahrenheit,
  })
)(Weather);
