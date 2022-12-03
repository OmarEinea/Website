import React from 'react';
import { Grid, Typography, Tooltip } from '@material-ui/core';

export class Line extends React.PureComponent<{ name: string, rate: number }> {
  render() {
    const { name, rate } = this.props;
    return (
      <Grid item direction="column" style={{ padding: '12px 16px' }}>
        <Typography variant="h6" style={{ color: '#424242', marginBottom: 6, lineHeight: 1.3 }}>
          {name}
        </Typography>
        <Tooltip title={rate + '%'} placement="right">
          <div style={{ backgroundColor: '#ECECEC', height: 16, width: '100%' }}>
            <div style={{ backgroundColor: '#3F51B5', height: '100%', width: rate + '%' }} />
          </div>
        </Tooltip>
      </Grid>
    );
  }
}
