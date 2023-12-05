import React from 'react';
import { Grid, Typography } from '@mui/material';
import { profile } from '../../utils/db';
import './Flair.css';

export interface IXdaDevelopersData {
  thanks: number;
  posts: number;
  threads: number;
}

export class XdaDevelopers extends React.PureComponent<{ data: IXdaDevelopersData }>{
  render() {
    const { thanks, posts, threads } = this.props.data;
    return (
      <Grid item className="flair">
        <a href="my/xda-developers" target="_black">
          <img height="45" src={profile('XdaDevelopers')} />
        </a>
        <Typography variant="h6">
          <i className="fas fa-fw fa-thumbs-up" />
          {thanks} Thanks
        </Typography>
        <Typography variant="subtitle1">
          <i className="fas fa-fw fa-user-edit" style={{ margin: '0 3px' }} />
          <b>{posts}</b> Posts
          in <b>{threads}</b> Threads
        </Typography>
      </Grid>
    );
  }
}
