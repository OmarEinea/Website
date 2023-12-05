import React from 'react';
import { Grid, Typography, Grow, Fade } from '@mui/material';
import { get } from '../utils/db';
import { ICardsSection, ICertificateCard, IEventCard, IProjectCard } from './interfaces';
import { CertificateCard } from './widgets/CertificateCard';
import { EventCard } from './widgets/EventCard';
import { ProjectCard } from './widgets/ProjectCard';

interface IProps {
  section: string;
  wide?: boolean;
  children: React.ReactChild[];
}

export class CardsSection extends React.PureComponent<IProps> {
  render() {
    const { section, wide, children } = this.props;
    return (
      <Grid container justifyContent="center">
        <Fade in>
          <Typography variant="h4" className="category">{section}</Typography>
        </Fade>
        {children.map((card, index: number) =>
          <Grow in key={index} timeout={(index + 1) * 400}>
            <Grid item md={wide ? 6 : 4} sm={6} xs={12}>
              {card}
            </Grid>
          </Grow>
        )}
      </Grid>
    );
  }
}

export class Certificates extends React.Component {
  state = { sections: [] as ICardsSection<ICertificateCard>[] };
  async componentWillMount() {
    const sections = await get<ICardsSection<ICertificateCard>[]>('certificates');
    this.setState({ sections });
  }

  render() {
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {this.state.sections.map(({ section, items }, i) =>
          <CardsSection key={i} section={section}>
            {items.map((data, j) => <CertificateCard key={j} data={data} />)}
          </CardsSection>
        )}
      </Grid>
    );
  }
}

export class Events extends React.Component {
  state = { sections: [] as ICardsSection<IEventCard>[] };
  async componentWillMount() {
    const sections = await get<ICardsSection<IEventCard>[]>('events');
    this.setState({ sections });
  }

  render() {
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {this.state.sections.map(({ section, items }, i) =>
          <CardsSection key={i} section={section}>
            {items.map((data, j) => <EventCard key={j} data={data} />)}
          </CardsSection>
        )}
      </Grid>
    );
  }
}

export class Projects extends React.Component {
  state = { sections: [] as ICardsSection<IProjectCard>[] };
  async componentWillMount() {
    const sections = await get<ICardsSection<IProjectCard>[]>('projects');
    this.setState({ sections });
  }

  render() {
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {this.state.sections.map(({ section, items }, i) =>
          <CardsSection key={i} section={section}>
            {items.map((data, j) => <ProjectCard key={j} data={data} />)}
          </CardsSection>
        )}
      </Grid>
    );
  }
}