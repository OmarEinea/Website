import React from 'react';
import { Grid, Typography, Grow, Fade } from '@mui/material';
import { get } from '../utils/db';
import { Loading } from '../utils/Loading';
import { ProfileCard } from '../cards/widgets/ProfileCard';
import { GitHub, IGithubData } from './widgets/GitHub';
import { StackOverflow, IStackOverflowData } from './widgets/StackOverflow';
import { XdaDevelopers, IXdaDevelopersData } from './widgets/XdaDevelopers';
import './Profiles.css';

interface IProfilesSection {
  section: string;
  type?: 'custom';
  items: {
    title: string;
    images: string[];
    [key: string]: any;
  }[];
}

interface IState {
  otherProfiles: IProfilesSection[];
  customProfiles: {
    GitHub: IGithubData & { images: string[] };
    StackOverflow: IStackOverflowData & { images: string[] };
    XdaDevelopers: IXdaDevelopersData & { images: string[] };
  };
}

export class Profiles extends React.Component<any, IState> {
  async componentWillMount() {
    const profiles = await get<IProfilesSection[]>('profiles');
    const customSection = (profiles.find(p => p.type === 'custom') || {}).items || [];
    const customProfiles = customSection.reduce((map, p) => ({ ...map, [p.title]: p }), {} as any);
    const otherProfiles = profiles.filter(p => p.type !== 'custom');
    this.setState({ otherProfiles, customProfiles });
  }

  render() {
    const { customProfiles, otherProfiles } = this.state || {};
    if (!customProfiles) return <Loading />;
    return (
      <Grid container className="container" style={{ marginBottom: 24, marginTop: 8 }}>
        <Grid container justifyContent="center">
          <Grow in timeout={600}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="GitHub" images={customProfiles.GitHub.images}>
                <GitHub data={customProfiles.GitHub} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={800}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="StackOverflow" images={customProfiles.StackOverflow.images}>
                <StackOverflow data={customProfiles.StackOverflow} />
              </ProfileCard>
            </Grid>
          </Grow>
          <Grow in timeout={1000}>
            <Grid item md={4} sm={6} xs={12}>
              <ProfileCard name="XdaDevelopers" images={customProfiles.XdaDevelopers.images}>
                <XdaDevelopers data={customProfiles.XdaDevelopers} />
              </ProfileCard>
            </Grid>
          </Grow>
        </Grid>
        {otherProfiles.map(({ section, items }, i) =>
          <Grid container key={i} justifyContent="center">
            <Fade in>
              <Typography variant="h4" className="category">{section}</Typography>
            </Fade>
            {items.map((profile, i) =>
              <Grid item key={i} md={4} sm={6} xs={12}>
                <ProfileCard name={profile.title} images={profile.images} use={profile.use} />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
