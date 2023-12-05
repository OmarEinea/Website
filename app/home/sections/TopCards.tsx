import React from 'react';
import { Grid, Zoom } from '@mui/material';
import { CertificateCard } from '../../cards/widgets/CertificateCard';
import { EventCard } from '../../cards/widgets/EventCard';
import { ProjectCard } from '../../cards/widgets/ProjectCard';
import { ICardData } from '../../cards/interfaces';

const cardTypes = {
  Project: ProjectCard,
  Event: EventCard,
  Certificate: CertificateCard
};

interface IProps {
  type: keyof typeof cardTypes;
  visible: boolean;
  data: ICardData[];
}

export class TopCards extends React.PureComponent<IProps> {
  public state = { cards: [] };
  private Card: React.JSXElementConstructor<any> | undefined;

  componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type];
  }

  componentWillReceiveProps(props: IProps) {
    if (props.data) this.setState({ cards: props.data });
  }

  render() {
    const { Card, state: { cards }, props: { visible } } = this;
    if (!Card) return;
    return (
      <Grid container justifyContent="center">
        {cards.map((cardData, index) =>
          <Zoom in={visible} key={index} timeout={(index + 1) * 400}>
            <Grid item md={4} sm={6} xs={12}>
              <Card data={cardData} full />
            </Grid>
          </Zoom>
        )}
      </Grid>
    );
  }
}
