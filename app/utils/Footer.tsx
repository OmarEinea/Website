import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { colors, age } from './db';

export class Footer extends React.PureComponent {
  render() {
    return (
      <Grid item id="footer" className="white-text">
        <div style={{ background: `linear-gradient(to top right, ${colors[0]}, ${colors[5]})`, zIndex: -2 }} />
        <Grid container className="container center-text">
          <Grid item sm={6} xs={12} style={{ paddingTop: 36 }}>
            <Typography variant="h5" gutterBottom>About Me</Typography>
            <Typography variant="subtitle1" gutterBottom>
              I'm a passionate {age} years old<br />
              self-taught Application Developer.
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} style={{ padding: '36px 0' }}>
            <Typography variant="h5" gutterBottom>Contact</Typography>
            <IconButton href="mailto:hello@omareinea.com">
              <i className="fas fa-envelope" />
            </IconButton>
            {['linkedin', 'instagram', 'facebook'].map((profile, i) =>
              <IconButton key={i} target="_blank" href={'my/' + profile}>
                <i className={'fab fa-' + profile} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
