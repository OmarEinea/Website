import React from 'react';
import { Grid, Typography, Paper, Grow, Fade } from '@mui/material';
import { get } from '../utils/db';
import { Loading } from '../utils/Loading';
import { Circle } from './widgets/Circle';
import { Line } from './widgets/Line';
import './Skills.css';

export enum SkillShape {
  circle = 'circle',
  line = 'line',
}

interface ISkillsSection {
  section: string;
  type: SkillShape;
  items: Record<string, number>;
}

export class Skills extends React.Component<{}, { circles: ISkillsSection[], lines: ISkillsSection[] }> {
  async componentWillMount() {
    const skills = await get<ISkillsSection[]>('skills');
    const circles = skills.filter(s => s.type === SkillShape.circle);
    const lines = skills.filter(s => s.type === SkillShape.line);
    this.setState({ circles, lines });
  }

  render() {
    const { state } = this;
    if (!state) return <Loading />;
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {state.circles.map(({ section, items }, i) =>
          <Grid container key={i} justifyContent="center">
            <Fade in>
              <Typography variant="h4" className="category">{section}</Typography>
            </Fade>
            {Object.entries(items).map(([name, rate], index) =>
              <Grow in key={index} timeout={(index + 1) * 200}>
                <Paper style={{ margin: 8 }} elevation={1}>
                  <Circle name={name} rate={rate} />
                </Paper>
              </Grow>
            )}
          </Grid>
        )}
        <div style={{ width: '100%' }}>
          {state.lines.map(({ section, items }, i) =>
            <div key={i} className="lines-list">
              <Typography variant="h4" className="category">{section}</Typography>
              <Paper style={{ margin: 8, padding: '12px 8px 16px' }} elevation={1}>
                {Object.entries(items).map(([name, rate], i) => <Line key={i} name={name} rate={rate} />)}
              </Paper>
            </div>
          )}
        </div>
      </Grid>
    );
  }
}
