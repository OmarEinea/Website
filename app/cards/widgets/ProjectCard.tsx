import React from 'react';
import { ClickAwayListener, Collapse, CardActions, CardHeader, Tooltip } from '@material-ui/core';
import { Card, CardMedia, Button, IconButton, Avatar, Typography } from '@material-ui/core';
import { Gallery } from '../../utils/gallery/Gallery';
import { IProjectCard } from '../interfaces';
import { url, skill } from '../../utils/db';
import './Card.css';

export class ProjectCard extends React.PureComponent<{ full?: boolean, data: IProjectCard }> {
  state = { text: false, image: false, scroll: false };

  render() {
    const { state: { text, image, scroll }, props: { full = false, data } } = this;
    const { title, subtitle, type, images, skills, repo, demo = '' } = data;

    return (
      <Card className="card">
        <ClickAwayListener onClickAway={() => { if (text) this.setState({ text: !text }) }}>
          <Collapse collapsedSize={`${full ? 75 : 54}px`} timeout="auto" className={'collapse down' + (scroll ? ' scroll' : '')}
            in={text} onEntered={() => this.setState({ scroll: true })} onExit={() => this.setState({ scroll: false })}>
            <CardHeader subheader={full && type} style={{ padding: '14px 16px', height: full ? 'auto' : 26 }}
              title={<b style={{ fontSize: 19, color: '#424242' }}>{title}</b>}
              avatar={full && <Avatar src={url(`projects/${title}/logo.png`)} />}
              action={
                <IconButton onClick={() => this.setState({ text: !text })} style={{ margin: '2px 0' }} className="mini">
                  <i style={{ fontSize: 14 }} className={'fas fa-chevron-down' + (text ? ' rotate' : '')} />
                </IconButton>
              }
            />
            <Typography variant="body2" style={{ padding: '0 16px 14px' }}>{subtitle}</Typography>
          </Collapse>
        </ClickAwayListener>
        <CardMedia style={{ paddingTop: '60%', marginTop: full ? 75 : 54, position: 'relative' }}
          image={url(`projects/${title}/preview.jpg`)} onClick={() => this.setState({ image: true })}>
          <i className="fas fa-images" style={{ position: 'absolute', bottom: 20, right: 20, color: '#757575', fontSize: 20 }} />
          <Button className="image-button"><i /></Button>
        </CardMedia>
        {image && <Gallery title={title} images={images} folder="projects"
          onClose={() => this.setState({ image: false })} format="png" />}
        <CardActions style={{ padding: 16 }}>
          <div style={{ flex: 1, height: 44 }}>
            {skills.map((title, i) =>
              <Tooltip key={i} title={title}>
                <img width="44" style={{ marginRight: 10 }} src={skill(title)} />
              </Tooltip>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '-4px 0' }}>
            <Tooltip title="Demo" placement="left" className={demo ? '' : 'invisible'}>
              <IconButton className="project-button" target="_blank"
                style={{ fontSize: 19 }} href={demo}>
                <i className="fas fa-eye" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Code" placement="left" className={repo ? '' : 'invisible'}>
              <IconButton href={'https://github.com/' + repo} target="_blank"
                style={{ fontSize: 22 }} className="project-button">
                <i className="fab fa-github-alt" />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>
    );
  }
}
