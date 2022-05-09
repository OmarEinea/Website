import React from 'react';
import { Grid, Typography, Grow, Fade } from '@material-ui/core';
import { get } from '../utils/db';
import { Loading } from '../utils/Loading';
import { ProfileCard } from '../cards/widgets/ProfileCard';
import { GitHub, IGithubData } from './widgets/GitHub';
import { StackOverflow, IStackOverflowData } from './widgets/StackOverflow';
import { XdaDevelopers, IXdaDevelopersData } from './widgets/XdaDevelopers';
import './Profiles.css';

interface IState {
  allProfiles: [string, [string, any]][];
  dev: {
    GitHub: IGithubData & { images: string };
    StackOverflow: IStackOverflowData & { images: string };
    XdaDevelopers: IXdaDevelopersData & { images: string };
  };
}

export class Profiles extends React.Component<any, IState> {
  async componentWillMount() {
    const { Development, order, ...profiles } = await get('profiles');
    for (const key in profiles) {
      profiles[key] = Object.entries(profiles[key]);
    }
    const profilesData = Object.entries(profiles);
    const orderedCategories = [];
    order.split(',').map((index: number) => orderedCategories.push(profilesData[index - 1]));
    this.setState({ dev: Development, allProfiles: profilesData });
  }

  render() {
    const { dev, allProfiles } = this.state || {};
    if (!dev) return <Loading />;
    return (
      <Grid container className="container" style={{ marginBottom: 24, marginTop: 8 }}>
        <Grid container justifyContent="center">
          <Grow in timeout={600}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="GitHub" images={dev.GitHub.images}>
                <GitHub data={dev.GitHub} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={800}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="StackOverflow" images={dev.StackOverflow.images}>
                <StackOverflow data={dev.StackOverflow} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="XdaDevelopers" images={dev.XdaDevelopers.images}>
                <XdaDevelopers data={dev.XdaDevelopers} />
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
        {allProfiles.map(([category, profiles], i) =>
          <Grid container key={i} justifyContent="center">
            <Fade in>
              <Typography variant="h4" className="category">{category}</Typography>
            </Fade>
            {profiles.map(([title, data], i) =>
              <Grid item key={i} md={4} sm={6} xs={12}>
                <ProfileCard name={title} images={data.images} use={data.use} />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
