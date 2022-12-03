import React from 'react';
import { ClickAwayListener, Typography, Collapse, CardActions } from '@material-ui/core';
import { Card, CardMedia, Button, IconButton } from '@material-ui/core';
import { Gallery } from '../../utils/gallery/Gallery';
import { IEventCard } from '../interfaces';
import { url } from '../../utils/db';
import './Card.css';

export class EventCard extends React.PureComponent<{ data: IEventCard }> {
  public state = { text: false, image: false, scroll: false };

  render() {
    const { text, image, scroll } = this.state;
    const { title, subtitle, location, images, preview } = this.props.data;
    return (
      <Card className="card">
        <CardMedia onClick={() => this.setState({ image: true })}
          style={{ paddingTop: '50%', marginBottom: 50, position: 'relative' }}
          image={url(`events/${title}/${preview ? 'preview' : 1}.jpg`)}>
          <Button className="image-button"><i /></Button>
          <i className="fas fa-images white-text" style={{ position: 'absolute', bottom: 18, left: 18, fontSize: 20 }} />
        </CardMedia>
        {image && <Gallery title={title} images={images}
          folder="events" onClose={() => this.setState({ image: false })} />}
        <ClickAwayListener onClickAway={() => { if (text) this.setState({ text: false }) }}>
          <Collapse in={text} collapsedSize="50px" timeout="auto" className={'collapse' + (scroll ? ' scroll' : '')}
            onEntered={() => this.setState({ scroll: true })} onExit={() => this.setState({ scroll: false })}>
            <CardActions style={{ padding: '14px 16px' }}>
              <Typography variant="h6" style={{ fontSize: 19, flex: 1, color: '#424242' }} noWrap>
                {title}
              </Typography>
              <IconButton onClick={() => this.setState({ text: !text })}
                style={{ margin: -10 }} className="mini">
                <i style={{ fontSize: 12 }} className={'fas fa-chevron-up' + (text ? ' rotate' : '')} />
              </IconButton>
            </CardActions>
            <div style={{ margin: 16, marginTop: text ? -8 : 0, marginBottom: text ? 14 : 6 }}>
              <Typography variant="caption" style={{ color: '#616161' }} noWrap>
                <i className="fas fa-map-marker-alt" style={{ marginLeft: 1, marginRight: 2 }} /> {location}
              </Typography>
              <Typography variant="body2" style={{ marginTop: 12 }}>{subtitle}</Typography>
            </div>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
