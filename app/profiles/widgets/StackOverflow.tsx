import React from 'react';
import { Grid, Typography } from '@mui/material';
import { profile } from '../../utils/db';
import './Flair.css';

export interface IStackOverflowData {
  reputation: number;
  gold: number;
  silver: number;
  bronze: number;
}

export class StackOverflow extends React.PureComponent<{ data: IStackOverflowData }> {
  render() {
    const { reputation, gold, silver, bronze } = this.props.data;
    return (
      <Grid item className="flair">
        <a href="my/stackoverflow" target="_blank">
          <img height="45" src={profile('StackOverflow')} />
        </a>
        <Typography variant="h6">
          <i className="fas fa-fw fa-thumbs-up" />
          {reputation} Up Votes
        </Typography>
        <Typography variant="subtitle1">
          <i className="fas fa-fw fa-trophy" style={{ marginLeft: 2 }} /> Badges
          <b style={{ color: '#c38b5f' }}>
            <i className="fas fa-fw fa-certificate" /> {bronze}
          </b>
          <b style={{ color: '#8c9298' }}>
            <i className="fas fa-fw fa-certificate" /> {silver}
          </b>
          <b style={{ color: '#cda400' }}>
            <i className="fas fa-fw fa-certificate" /> {gold}
          </b>
        </Typography>
      </Grid>
    );
  }
}
