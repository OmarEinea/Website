import React from 'react';
import { Grid, Typography, IconButton, Tooltip, Fade } from '@material-ui/core';
import { Introduction } from './introduction/Introduction';
import { TopProfiles } from './sections/TopProfiles';
import { TopSkills } from './sections/TopSkills';
import { TopCards } from './sections/TopCards';
import { IHomeData } from './interfaces';
import { get } from '../utils/db';
import './Home.css';

type ISectionProps = { visible: boolean, data: any };

interface IProps {
  goto: (title: string, event: React.MouseEvent) => void;
}

interface IState {
  data: IHomeData;
  entered: number;
}

export class Home extends React.Component<IProps, IState> {
  public state: IState = { data: { resume: '', papers: [], sections: [] }, entered: 0 };
  private tags: HTMLElement[] = [];
  private prevScroll = 0;
  private sections: Record<string, React.JSXElementConstructor<any>> = {
    projects: (props: ISectionProps) => <TopCards type="Project" {...props} />,
    skills: (props: ISectionProps) => <TopSkills {...props} />,
    events: (props: ISectionProps) => <TopCards type="Event" {...props} />,
    profiles: (props: ISectionProps) => <TopProfiles {...props} />,
    certificates: (props: ISectionProps) => <TopCards type="Certificate" {...props} />,
  };
  private onScroll = () => {
    const scroll = window.scrollY + window.innerHeight - 150;
    if (scroll - this.prevScroll <= 50) return;
    this.prevScroll = scroll;
    // TODO: should make this happen only once after mount is done
    if (this.tags.length === 0) this.tags = Array.from(document.getElementsByClassName('section')) as HTMLElement[];
    this.tags.map((section, index) => {
      if (scroll > section.offsetTop && index >= this.state.entered) {
        this.setState({ entered: index + 1 });
      }
    });
  }

  async componentWillMount() {
    const data = await get<IHomeData>('home');
    this.setState({ data });
  }

  render() {
    const { data, entered } = this.state;
    return (
      <Grid container>
        <Introduction papers={data.papers} resume={data.resume} />
        {data.sections.map(({ id, title, icon, items }, index) => {
          const Section = this.sections[id];
          return <Grid container key={index} style={{ background: index === 0 ? '#90A4AE55' : index % 2 === 1 ? '#FFFFFFAA' : '' }}>
            <Grid container className="container" style={{ paddingTop: 40, paddingBottom: 80, minHeight: 512 }}>
              <Fade in={index < entered} timeout={800}>
                <Grid container justifyContent="center" className="section">
                  <Typography variant="h3" className="headline" noWrap
                    style={{ padding: '40px 0', textTransform: 'capitalize' }}>
                    <i className={'fas fa-' + icon} style={{ paddingRight: 16 }} />
                    {title}
                    <Tooltip title="View More" placement="right" enterDelay={100}>
                      <IconButton onClick={event => this.props.goto(id, event)}
                        href={id} style={{ marginLeft: 8, marginTop: -12 }} className="mini">
                        <i className="fas fa-angle-right" style={{ fontSize: 20, opacity: .7 }} />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Grid>
              </Fade>
              <Section visible={index < entered} data={items} />
            </Grid>
          </Grid>;
        })}
      </Grid>
    );
  }

  componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
