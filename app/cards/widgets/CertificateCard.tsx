import React from 'react';
import { ClickAwayListener, Typography, Collapse } from '@mui/material';
import { Card, CardMedia, CardContent, CardActions, Button, IconButton } from '@mui/material';
import { Gallery } from '../../utils/gallery/Gallery';
import { ICertificateCard } from '../interfaces';
import { url } from '../../utils/db';
import './Card.css';


export class CertificateCard extends React.PureComponent<{ data: ICertificateCard }> {
  public state = { text: false, image: false, scroll: false };

  render() {
    const { text, image, scroll } = this.state;
    const { title, subtitle, authority } = this.props.data;
    return (
      <Card className="card">
        <CardMedia style={{ paddingTop: '70%', marginBottom: 78, position: 'relative' }}
          image={url(`certs/small/${title}.jpg`)} onClick={() => this.setState({ image: true })}>
          <Button className="image-button"><i /></Button>
        </CardMedia>
        {image && <Gallery title={title} folder="certs" onClose={() => this.setState({ image: false })} />}
        <ClickAwayListener onClickAway={() => { if (text) this.setState({ text: false }) }}>
          <Collapse in={text} collapsedSize="78px" timeout="auto" className={'collapse' + (scroll ? ' scroll' : '')}
            onEntered={() => this.setState({ scroll: true })} onExit={() => this.setState({ scroll: false })}>
            <CardContent style={{ padding: '14px 16px' }}>
              <Typography variant="h6" style={{ fontSize: 19, marginBottom: 8, color: '#424242' }} noWrap>
                {title}
              </Typography>
              <CardActions style={{ padding: 0 }}>
                <Typography variant="caption" style={{ flex: 1, color: '#616161' }} noWrap>
                  <i className="fas fa-landmark" style={{ marginRight: 4 }} /> {authority}
                </Typography>
                <IconButton onClick={() => this.setState({ text: !text })}
                  style={{ margin: '-10px -10px -12px' }} className="mini">
                  <i style={{ fontSize: 12 }} className={'fas fa-chevron-up' + (text ? ' rotate' : '')} />
                </IconButton>
              </CardActions>
            </CardContent>
            <Typography variant="body2" style={{ padding: '0 16px 14px' }}>{subtitle}</Typography>
          </Collapse>
        </ClickAwayListener>
      </Card>
    );
  }
}
