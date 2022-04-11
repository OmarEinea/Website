import React from 'react';
import { Grid, Typography, Avatar, Paper, Button, Grow } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { url, colors } from '../../utils/db';
import './Intro.css';

interface IProps {
  data?: IData;
}

interface IState {
  content: IContent;
  resume: string;
  expand?: string;
}

type IData = { resume: any, [paper: string]: string[]; };
type IContent = Record<string, React.ReactElement | React.ReactElement[]>;
const third = 33.333;

export class Intro extends React.Component<IProps, IState> {
  public state: IState = { content: {}, resume: 'resume.pdf' };
  private papers = Object.entries({
    Occupation: { icon: 'address-card' },
    Origin: { style: { top: `${third}%` }, icon: 'globe-africa' },
    Discipline: { style: { top: `${2 * third}%` }, icon: 'pencil-ruler' },
    Goals: { style: { left: `${third}%`, top: `${2 * third}%` }, icon: 'check-double' },
    Education: { style: { left: `${third}%` }, icon: 'user-graduate' },
    Experience: { style: { left: `${2 * third}%` }, icon: 'briefcase' },
    Publications: { style: { left: `${2 * third}%`, top: `${third}%` }, icon: 'clipboard' }
  });

  private updateContent = (data: IData | undefined) => {
    if (!data) return;
    const content: IContent = {};
    const { resume, ...papers } = data;
    this.papers.map(([title, _], index) => {
      if (index <= 3) {
        content[title] = papers[title].slice(1).map(line => {
          const [text, icon] = line.split(';').reverse();
          const [body, head] = text.split(':').reverse();
          return <Typography className="line" variant="subtitle1">
            {icon && <i className={'fas fa-fw fa-' + icon} style={{ marginRight: 8 }} />}
            {head && <b>{head}:</b>}{body}
          </Typography>;
        });
      } else {
        content[title] = <Table style={{ marginTop: 8 }}>
          <TableBody>{papers[title].map(row =>
            <TableRow>{row.split(',').map(cell =>
              <TableCell dangerouslySetInnerHTML={{ __html: cell }}
                style={{ padding: '16px 12px', fontSize: '0.82rem' }} />
            )}</TableRow>
          )}</TableBody>
        </Table>;
      }
    });
    return content;
  };

  constructor(props: IProps) {
    super(props);
    this.updateContent(props.data);
  }

  componentWillReceiveProps(props: IProps) {
    this.updateContent(props.data);
  }

  openResume(event: React.MouseEvent) {
    event.preventDefault();
    window.open(url('my/' + this.state.resume), '_self');
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.state.expand !== nextState.expand;
  }

  render() {
    const { content, expand } = this.state;
    return (
      <Grow in>
        <Grid container className="container" style={{ paddingBottom: 80 }}>
          <Grid item md={4} xs={12} alignContent="center" id="intro">
            <div style={{ position: 'relative', width: 324, height: 324 }}>
              <Avatar className={'avatar' + (expand !== 'logo' ? ' expand' : '')} style={{ left: 0 }}
                src={url('my/photo.jpg')} onClick={() => this.setState({ expand: undefined })} />
              <Avatar className={'avatar' + (expand === 'logo' ? ' expand' : '')} style={{ right: 0 }}
                src={url('my/logo.jpg')} onClick={() => this.setState({ expand: 'logo' })} />
            </div>
            <Typography variant="h4" style={{ color: '#4F4D4E', margin: '12px 0' }}>
              Omar Einea
            </Typography>
            <Typography style={{ fontSize: 18, color: '#616161', whiteSpace: 'nowrap' }}>
              App Developer. Web, Mobile & PC.
            </Typography>
            <Button variant="contained" href="my/resume" onClick={this.openResume.bind(this)}>
              <i className="fas fa-file-download" style={{ marginRight: 8, fontSize: 16 }} />
              Resume
            </Button>
            <Button variant="contained" target="_self" href="mailto:hello@omareinea.com">
              <i className="fas fa-lg fa-envelope" />
            </Button>
            <Button variant="contained" target="_blank" href="my/linkedin">
              <i className="fab fa-lg fa-linkedin" />
            </Button>
            <Button variant="contained" target="_blank" href="my/github">
              <i className="fab fa-lg fa-github" />
            </Button>
          </Grid>
          <Grid item md={8} xs={12} id="bio">
            <Grid container>
              {this.papers.map(([title, paper], index) =>
                <Paper style={paper.style} elevation={expand === title ? 3 : 1}
                  className={'paper' + (expand === title ? ' expand' : '')}
                  onMouseEnter={() => this.setState({ expand: title })}
                  onMouseLeave={() => this.setState({ expand: undefined })}>
                  <div style={{ borderTopColor: colors[index] }} className="content">{content[title]}</div>
                  <Grid container className="title" direction="column" justify="center">
                    <i className={'fas fa-fw fa-' + paper.icon} />
                    <Typography><span>{title}</span></Typography>
                  </Grid>
                </Paper>
              )}
              <div className="paper" style={{ left: `${2 * third}%`, top: `${2 * third}%` }}>
                <Grid container className="title" direction="column" justify="center" onClick={() => {
                  const bioElement = document.getElementById('bio');
                  if (bioElement) window.scrollBy(0, bioElement.getBoundingClientRect().bottom + 100)
                }}>
                  <i className="fas fa-fw fa-arrow-down clickable" />
                  <Typography className="clickable">More&nbsp;Below</Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid >
      </Grow >
    );
  }
}
