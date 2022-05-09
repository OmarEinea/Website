import React from 'react';
import { Grid, Typography, Paper, Grow, Fade } from '@material-ui/core';
import { get } from '../utils/db';
import { Loading } from '../utils/Loading';
import { Circle } from './widgets/Circle';
import { Line } from './widgets/Line';
import './Skills.css';

type ISkillData = [string, [string, number][]];

export class Skills extends React.Component<{}, { circles: ISkillData[], lines: ISkillData[] }> {
  private processData = ({ order, ...skills }: { order: any, [skill: string]: Record<string, number> }) => {
    const skillsData: ISkillData[] = [];
    for (const key in skills) {
      const data = Object.entries(skills[key]).sort((a, b) => b[1] - a[1]);
      skillsData.push([key, data]);
    }
    const orderedSkills: ISkillData[] = [];
    order.split(',').map((i: number) => orderedSkills.push(skillsData[i - 1]));
    return orderedSkills;
  };

  async componentWillMount() {
    const { circles, lines } = await get('skills');
    this.setState({
      circles: this.processData(circles),
      lines: this.processData(lines)
    });
  }

  render() {
    const { state } = this;
    if (!state) return <Loading />;
    return (
      <Grid container className="container" style={{ marginBottom: 24 }}>
        {state.circles.map(([category, skills], i) =>
          <Grid container key={i} justifyContent="center">
            <Fade in>
              <Typography variant="h4" className="category">{category}</Typography>
            </Fade>
            {skills.map((skill, index) =>
              <Grow in key={index} timeout={(index + 1) * 200}>
                <Paper style={{ margin: 8 }} elevation={1}>
                  <Circle skill={skill} />
                </Paper>
              </Grow>
            )}
          </Grid>
        )}
        <div style={{ width: '100%' }}>
          {state.lines.map(([category, skills], i) =>
            <div key={i} className="lines-list">
              <Typography variant="h4" className="category">{category}</Typography>
              <Paper style={{ margin: 8, padding: '12px 8px 16px' }} elevation={1}>
                {skills.map((skill, i) => <Line key={i} skill={skill} />)}
              </Paper>
            </div>
          )}
        </div>
      </Grid>
    );
  }
}
