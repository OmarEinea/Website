import React from 'react';
import { Grid, Grow } from '@material-ui/core';
import { Circle } from '../../skills/widgets/Circle';
import { Line } from '../../skills/widgets/Line';

interface IProps {
  visible: boolean;
  data: IState;
}

interface IState {
  circles: string[];
  lines: string[];
}

export class TopSkills extends React.PureComponent<IProps, IState> {
  state = { circles: [], lines: [] };

  componentWillReceiveProps(props: IProps) {
    if (props.data) this.setState(props.data);
  }

  render() {
    const { state: { circles, lines }, props: { visible } } = this;
    return (
      <Grid container>
        <Grow in={visible} timeout={400}>
          <Grid container item md={7} xs={12}>
            <Grid container justifyContent="space-around" className="box">
              {circles.map((skill, i) => <Circle key={i} skill={skill} />)}
            </Grid>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={700}>
          <Grid container item md={5} xs={12}>
            <Grid container direction="column" className="box">
              {lines.map((skill, i) => <Line key={i} skill={skill} />)}
            </Grid>
          </Grid>
        </Grow>
      </Grid>
    );
  }
}
