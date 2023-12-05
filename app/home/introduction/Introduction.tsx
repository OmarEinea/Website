import React from 'react';
import { Grid, Typography, Avatar, Paper, Button, Grow } from '@mui/material';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { IPaperData, IPaper, PaperType } from '../interfaces';
import { url, colors } from '../../utils/db';
import './Introduction.css';

interface IProps {
  papers: IPaperData[];
  resume: string;
}

interface IState {
  papers: IPaper[];
  resume: string;
  expand?: string;
}

const third = 33.333;

export class Introduction extends React.Component<IProps, IState> {
  public state: IState = { papers: [], resume: 'resume.pdf' };
  private papersStyles: Record<string, React.CSSProperties | undefined> = {
    Origin: { top: `${third}%` },
    Discipline: { top: `${2 * third}%` },
    Goals: { left: `${third}%`, top: `${2 * third}%` },
    Education: { left: `${third}%` },
    Experience: { left: `${2 * third}%` },
    Publications: { left: `${2 * third}%`, top: `${third}%` },
  };

  private updateContent = (data: IProps) => {
    if (!data.papers) return;
    const papers = data.papers.reduce((papers, { title, icon, type, items, mini }) => {
      if (type === PaperType.list) {
        papers.push({
          title, icon, mini, element: items.slice(1).map((line, i) => {
            const [text, icon] = line.split(';').reverse();
            const [body, head] = text.split(':').reverse();
            return <Typography key={i} className="line" variant="subtitle1">
              {icon && <i className={'fas fa-fw fa-' + icon} style={{ marginRight: 8 }} />}
              {head && <b>{head}:</b>}{body}
            </Typography>;
          })
        });
      } else if (type === PaperType.table) {
        papers.push({
          title, icon, mini, element: <Table style={{ marginTop: 8 }}>
            <TableBody>
              {items.map((row, i) =>
                <TableRow key={i}>
                  {row.split(',').map((cell, j) =>
                    <TableCell key={j} dangerouslySetInnerHTML={{ __html: cell }}
                      style={{ padding: '16px 12px', fontSize: '0.82rem' }} />
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        });
      }
      return papers;
    }, [] as IPaper[]);
    this.setState({ papers, resume: data.resume });
  };

  componentWillReceiveProps(props: IProps) {
    if (props.papers.length === this.state.papers.length) return;
    this.updateContent(props);
  }

  openResume(event: React.MouseEvent) {
    event.preventDefault();
    window.open(url('my/' + this.state.resume), '_self');
  }

  render() {
    const { papers, expand } = this.state;
    return (
      <Grow in>
        <Grid container className="container" style={{ paddingBottom: 80 }}>
          <Grid item md={4} xs={12} id="intro" className="center-text">
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
              {papers.map(({ title, element, icon, mini }, index) => {
                const style = this.papersStyles[title];
                return <Paper key={index} style={style} elevation={expand === title ? 3 : 1}
                  className={'paper' + (expand === title ? ' expand' : '') + (mini ? ' mini' : '')}
                  onMouseEnter={() => this.setState({ expand: title })}
                  onMouseLeave={() => this.setState({ expand: undefined })}>
                  <div style={{ borderTopColor: colors[index] }} className="content">{element}</div>
                  <Grid container className="title" justifyContent="center">
                    <i className={'fas fa-fw fa-' + icon} />
                    <Typography><span>{title}</span></Typography>
                  </Grid>
                </Paper>
              })}
              <div className="paper" style={{ left: `${2 * third}%`, top: `${2 * third}%` }}>
                <Grid container className="title" justifyContent="center" onClick={() => {
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
