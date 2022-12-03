import React from 'react';
import { Grid, Grow } from '@material-ui/core';
import { GitHub, IGithubData } from '../../profiles/widgets/GitHub';
import { IStackOverflowData, StackOverflow } from '../../profiles/widgets/StackOverflow';
import { IXdaDevelopersData, XdaDevelopers } from '../../profiles/widgets/XdaDevelopers';

interface IProps {
  visible: boolean;
  data: ({ title: string } & (IGithubData | IStackOverflowData | IXdaDevelopersData))[];
}

interface IState {
  GitHub: IGithubData;
  StackOverflow: IStackOverflowData;
  XdaDevelopers: IXdaDevelopersData;
}

export class TopProfiles extends React.PureComponent<IProps, IState> {
  public state = { GitHub: {}, StackOverflow: {}, XdaDevelopers: {} } as IState;

  componentWillReceiveProps(props: IProps) {
    if (props.data) this.setState({ ...props.data.map(profile => ({ [profile.title]: profile })) } as any);
  }

  render() {
    const { state, props: { visible } } = this;
    return (
      <Grid container justifyContent="center">
        <Grow in={visible} timeout={600}>
          <Grid item md={4} sm={6} xs={12} >
            <div className="box">
              <GitHub data={state.GitHub} />
            </div>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={800}>
          <Grid item md={4} sm={6} xs={12}>
            <div className="box">
              <StackOverflow data={state.StackOverflow} />
            </div>
          </Grid>
        </Grow>
        <Grow in={visible} timeout={1000}>
          <Grid item md={4} sm={6} xs={12}>
            <div className="box">
              <XdaDevelopers data={state.XdaDevelopers} />
            </div>
          </Grid>
        </Grow>
      </Grid>
    );
  }
}
