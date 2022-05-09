import React from 'react';
import { Grid, Typography, IconButton, Tooltip, Fade } from '@material-ui/core';
import { Intro } from './intro/Intro';
import { TopProfiles } from './sections/TopProfiles';
import { TopSkills } from './sections/TopSkills';
import { TopCards } from './sections/TopCards';
import { get } from '../utils/db';
import './Home.css';

type ISectionProps = { visible: boolean, data: any };

interface IProps {
  goto: (title: string, event: React.MouseEvent) => void;
}

export class Home extends React.Component<IProps> {
  public state = { data: {} as Record<string, any>, entered: 0 };
  private tags: HTMLElement[] = [];
  private prevScroll = 0;
  private sections: [string, [React.JSXElementConstructor<any>, string]][] = Object.entries({
    projects: [(props: ISectionProps) => <TopCards type="Project" {...props} />, 'laptop-code'],
    skills: [TopSkills, 'brain'],
    events: [(props: ISectionProps) => <TopCards type="Event" {...props} />, 'users'],
    profiles: [TopProfiles, 'globe'],
    certificates: [(props: ISectionProps) => <TopCards type="Cert" {...props} />, 'award']
  });
  private onScroll = () => {
    const scroll = window.pageYOffset + window.innerHeight - 150;
    if (scroll - this.prevScroll > 50) {
      this.prevScroll = scroll;
      this.tags.map((section, index) => {
        if (scroll > section.offsetTop && index >= this.state.entered)
          this.setState({ entered: index + 1 });
      });
    }
  }

  async componentWillMount() {
    const data = await get('home');
    this.setState({ data });
  }

  render() {
    const { sections, state: { data, entered }, props: { goto } } = this;
    return (
      <Grid container>
        <Intro data={data.intro} />
        {sections.map(([title, [Section, icon]], index) =>
          <Grid container key={index} style={{ background: index === 0 ? '#90A4AE55' : index % 2 === 1 ? '#FFFFFFAA' : '' }}>
            <Grid container className="container" style={{ paddingTop: 40, paddingBottom: 80, minHeight: 512 }}>
              <Fade in={index < entered} timeout={800}>
                <Grid container justifyContent="center" className="section">
                  <Typography variant="h3" className="headline" noWrap
                    style={{ padding: '40px 0', textTransform: 'capitalize' }}>
                    <i className={'fas fa-' + icon} style={{ paddingRight: 16 }} />
                    top {title}
                    <Tooltip title="View More" placement="right" enterDelay={100}>
                      <IconButton onClick={event => goto(title, event)}
                        href={title} style={{ marginLeft: 8, marginTop: -12 }} className="mini">
                        <i className="fas fa-angle-right" style={{ fontSize: 20, opacity: .7 }} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Fade>
              <Section visible={index < entered} data={data[title.replace('ificate', '')]} />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }

  componentDidMount() {
    this.tags = Array.from(document.getElementsByClassName('section')) as HTMLElement[];
    this.prevScroll = 0;
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
