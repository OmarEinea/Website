import React from 'react';
import { Grid, Zoom } from '@material-ui/core';
import cardTypes from '../../cards/widgets';

interface IProps {
  type: keyof typeof cardTypes;
  visible: boolean;
  data: any[];
}

export class TopCards extends React.PureComponent<IProps> {
  public state = { cards: [] as any[] };
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
