import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { colors } from './db';

export class Loading extends React.Component<{ style?: Record<string, any> }, { index: number }> {
  private colorChanger: NodeJS.Timer | undefined;
  public state = { index: colors.length - 1 };

  componentWillMount() {
    let direction = -1;
    this.colorChanger = setInterval(() => this.setState(prev => {
      if (prev.index + direction === colors.length) {
        direction = -1;
      } else if (prev.index + direction === 0) {
        direction = 1;
      }
      return { index: prev.index + direction };
    }), 1000);
  }

  render() {
    const { props: { style = {} }, state: { index } } = this;
    return (
      <Grid container justify="center" alignItems="center"
        style={{ flex: 1, marginBottom: 16, ...style }}>
        <CircularProgress size={64} style={{ color: colors[index] }} />
      </Grid>
    );
  }

  componentWillUnmount() {
    if (this.colorChanger) clearInterval(this.colorChanger);
  }
}
