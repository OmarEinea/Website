import React from 'react';
import { Grid, Grow } from '@material-ui/core';
import { Circle } from '../../skills/widgets/Circle';
import { Line } from '../../skills/widgets/Line';
import { SkillShape } from '../../skills/Skills';

interface IProps {
  visible: boolean;
  data: {
    type: SkillShape;
    items: Record<string, number>;
  }[];
}

interface IState {
  circles: [string, number][];
  lines: [string, number][];
}

export class TopSkills extends React.PureComponent<IProps, IState> {
  state: IState = { circles: [], lines: [] };

  componentWillReceiveProps(props: IProps) {
    if (!props.data) return;
    const lines = (props.data.find(d => d.type === SkillShape.line) || {}).items || {};
    const circles = (props.data.find(d => d.type === SkillShape.circle) || {}).items || {};
    this.setState({ lines: Object.entries(lines), circles: Object.entries(circles) });
  }

  render() {
    const { state: { circles, lines }, props: { visible } } = this;
    return (
      <Grid container>
        <Grow in={visible} timeout={400}>
          <Grid container item md={7} xs={12}>
            <Grid container justifyContent="space-around" className="box">
              {circles.map(([name, rate], i) => <Circle key={i} name={name} rate={rate} />)}
            </Grid>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={700}>
          <Grid container item md={5} xs={12}>
            <Grid container direction="column" className="box">
              {lines.map(([name, rate], i) => <Line key={i} name={name} rate={rate} />)}
            </Grid>
          </Grid>
        </Grow>
      </Grid>
    );
  }
}
