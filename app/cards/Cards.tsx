import React from 'react';
import { Grid, Typography, Grow, Fade } from '@material-ui/core';
import { get } from '../utils/db';
import { Loading } from '../utils/Loading';
import cardTypes from './widgets';
import 'fetch';

interface IProps {
  type: keyof typeof cardTypes;
  wide?: boolean;
}

export class Cards extends React.Component<IProps, { allCards: [string, any][] }> {
  private Card: React.JSXElementConstructor<any> | undefined;

  async componentWillMount() {
    const { type } = this.props;
    this.Card = cardTypes[type];
    const { order, ...cards } = await get(type.toLowerCase() + 's');
    for (const key in cards) {
      cards[key] = Object.entries(cards[key]).map(([title, card]) => {
        // if (card.preload) fetch(card.demo);
        return [title, card];
      });
    }
    const orderedCategories = [];
    const cardsData = Object.entries(cards);
    if (order) order.split(',').map((i: string) => orderedCategories.push(cardsData[Number(i) - 1]));
    else orderedCategories.push(...cardsData);
    this.setState({ allCards: orderedCategories });
  }

  render() {
    const { state, Card, props: { wide } } = this;
    if (!state || !Card) return <Loading />;
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {state.allCards.map(([category, cards], i) =>
          <Grid container key={i} justifyContent="center">
            <Fade in>
              <Typography variant="h4" className="category">{category}</Typography>
            </Fade>
            {cards.map((cardData: any, index: number) =>
              <Grow in key={index} timeout={(index + 1) * 400}>
                <Grid item md={wide ? 6 : 4} sm={6} xs={12}>
                  <Card data={cardData} />
                </Grid>
              </Grow>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
