import React from 'react';
import { Grid, Typography, CircularProgress, Tooltip } from '@mui/material';
import { skill } from '../../utils/db';

export class Circle extends React.PureComponent<{ name: string, rate: number }> {
  render() {
    const { name, rate } = this.props;
    return (
      <Grid item>
        <Grid container direction="column" alignItems="center" style={{ display: 'flex', padding: 16 }}>
          <Tooltip title={rate + '%'} placement="top">
            <div style={{ position: 'relative', marginBottom: 8 }}>
              <CircularProgress variant="determinate" value={100} thickness={7} size={150}
                style={{ position: 'absolute', left: 0, top: 0, color: '#ECECEC' }} />
              <CircularProgress variant="determinate" value={rate} thickness={7} size={150} />
              <img width="60" src={skill(name.replace(/\+/g, '%2B'))} style={{ position: 'absolute', left: 45, top: 45 }} />
            </div>
          </Tooltip>
          <Typography variant="h6" style={{ color: '#424242', maxWidth: 150 }} noWrap>
            {name}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
