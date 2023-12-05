import React, { ReactNode } from 'react';
import { Card, CardMedia, Button, Typography, Grid } from '@mui/material';
import { Gallery } from '../../utils/gallery/Gallery';
import { url, profile } from '../../utils/db';
import './Card.css';


interface IProfileCardProps {
  name: string;
  images: string[];
  use?: string;
  children?: ReactNode;
}

export class ProfileCard extends React.PureComponent<IProfileCardProps> {
  public state = { image: false };

  render() {
    const { name, images, children, use = '', ...props } = this.props;
    const { image } = this.state, [text, icon] = use.split(';');
    return (
      <Card className="card" {...props}>
        <CardMedia style={{ paddingTop: '64%', position: 'relative', backgroundPosition: 'left' }}
          image={url(`profiles/${name}/preview.jpg`)} onClick={() => this.setState({ image: true })}>
          <Button className="image-button"><i /></Button>
          <i className="fas fa-images"
            style={{ position: 'absolute', bottom: 24, right: 24, fontSize: 20, color: '#757575' }} />
        </CardMedia>
        {image && <Gallery title={name} images={images} format="png"
          folder="profiles" onClose={() => this.setState({ image: false })} />}
        <div style={{ padding: 8 }}>
          {children || <Grid container direction="column" style={{ padding: '16px 16px 12px' }}>
            <Grid item style={{ marginBottom: 8 }}>
              <a href={'my/' + name.toLowerCase().replace(/ /g, '')}>
                <img height="42" src={profile(name)} />
              </a>
            </Grid>
            <Grid item>
              <Typography className="profile-use" variant="body1" style={{ color: '#616161', lineHeight: 1.4 }}>
                <b style={{ color: '#9e9e9e', fontSize: 14 }}>Main Use:</b>
                <br /><i className={'fa fa-fw fa-' + icon} /> {text}
              </Typography>
            </Grid>
          </Grid>}
        </div>
      </Card>
    );
  }
}
