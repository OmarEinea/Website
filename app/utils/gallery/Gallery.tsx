import React from 'react';
import { Typography, Modal, Zoom } from '@mui/material';
import { url } from '../db';
import { Loading } from '../Loading';
import './Gallery.css';

interface IProps {
  title: string;
  images?: string[];
  folder: string;
  format?: string;
  onClose: () => any;
}

export class Gallery extends React.Component<IProps> {
  public state = { loaded: false, closing: false, index: 0 };
  private images: string[] = [];
  private urls: string[] = [];

  private loaded = () => this.setState({ loaded: true });
  private gotoImage = (index: number) => () => {
    this.setState({ loaded: false });
    setTimeout(() => this.setState({ index }), 100);
  };
  private onClose = () => {
    this.setState({ loaded: false, closing: true });
    setTimeout(this.props.onClose, 250);
  };
  private frameStyle = (tight: boolean) => {
    if (window.innerWidth / window.innerHeight > 16 / 9)
      return { height: 'calc(100vh - 52px)', width: tight ? '52vh' : '161vh' };
    return { width: 'calc(100vw - 16px)', height: tight ? '170vw' : '54vw' };
  };

  componentWillMount() {
    const { title, images, folder, format = 'jpg' } = this.props;
    this.urls = [];
    if (images && images.length > 0) {
      this.images = images;
      for (let i = 1; i <= images.length; i++) {
        this.urls.push(`${folder}/${title}/${i}.${format}`);
      }
    } else {
      this.urls.push(`${folder}/${title}.${format}`);
      this.images = [title];
    }
  }

  render() {
    const { images, state: { loaded, index, closing } } = this,
      youtube = images[index].split('https://www.youtube.com/watch?v=')[1];
    return (
      <Modal open onClose={this.onClose} className={'gallery' + (closing ? ' closing' : '')}>
        <div className="content">
          {!loaded && !closing && <Loading style={{ position: 'absolute' }} />}
          <Zoom in={loaded} timeout={{ enter: 400, exit: 250 }}>
            <div className="main">
              <div className="white-text">
                <Typography variant="subtitle1" style={{ flex: 1 }} noWrap>
                  {!youtube && images[index]}
                </Typography>
                <Typography variant="subtitle1" style={{ marginLeft: 8, marginRight: -8 }}>
                  ({index + 1} of {images.length})
                  <i className="fas fa-times" onClick={this.onClose} />
                </Typography>
              </div>
              {youtube
                ? <iframe style={this.frameStyle(youtube.includes('tight'))} frameBorder="0"
                  onLoad={this.loaded} allow="autoplay; encrypted-media" allowFullScreen
                  src={`https://www.youtube-nocookie.com/embed/${youtube.split('&')[0]}?rel=0`} />
                : <img style={{ maxHeight: 'calc(100vh - 52px)', maxWidth: '100%' }}
                  src={url(this.urls[index])} onLoad={this.loaded} />
              }
            </div>
          </Zoom>
          {index > 0 &&
            <div className="nav white-text" style={{ left: 0 }}>
              <i onClick={this.gotoImage(index - 1)} className="fas fa-chevron-left" />
            </div>
          }
          {images.length > 1 && index + 1 < images.length &&
            <div className="nav white-text" style={{ right: 0 }}>
              <i onClick={this.gotoImage(index + 1)} className="fas fa-chevron-right" />
            </div>
          }
        </div>
      </Modal>
    );
  }
}
