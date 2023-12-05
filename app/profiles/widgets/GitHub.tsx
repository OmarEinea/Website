import React from 'react';
import { Grid, Typography } from '@mui/material';
import { profile } from '../../utils/db';
import './GitHub.css';

export interface IGithubData {
  repos: number;
  followers: number;
  stars: number;
}

export class GitHub extends React.PureComponent<{ data: IGithubData }> {
  render() {
    const { repos, followers, stars } = this.props.data;
    return (
      <Grid item className="flair">
        <a href="my/github" target="_blank">
          <img height="45" src={profile('GitHub')} />
        </a>
        <Typography variant="h6">
          <i className="fas fa-fw fa-star" />
          <b>{stars}</b> Stars
        </Typography>
        <Typography variant="subtitle1">
          <i className="fas fa-fw fa-hdd" style={{ margin: '0 3px' }} />
          <b>{repos}</b> Repos & <b>{followers}</b> Followers
        </Typography>
      </Grid>
    );
  }
}
