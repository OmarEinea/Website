import React from 'react';
import { Grid, Typography, Tooltip, Grow } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { Loading } from '../utils/Loading';
import { get } from '../utils/db';
import './Timeline.css';

interface ITimeline {
  years: Record<string, string>;
  cities: Record<string, string>;
  institutes: Record<string, string>;
  events: Record<string, string>;
}

type IItemsMap = Record<string, [string[], number]>;

interface IState {
  showEvents: boolean;
  years?: [string, string][];
  cities?: IItemsMap;
  institutes?: IItemsMap;
  events?: IItemsMap;
  pc?: boolean;
}

export class Timeline extends React.Component<{}, IState> {
  public state: IState = { showEvents: true };
  private structureItems = (items: Record<string, string>) => {
    return Object.entries(items).reduce((map, [range, desc]) => {
      const [a, b] = range.split(',');
      map[a] = [desc.split(';').map(d => d.trim()), Number(b || a) - Number(a)];
      return map;
    }, {} as IItemsMap);
  };
  private onResize = () => {
    const pc = window.innerWidth > 650;
    if (pc !== this.state.pc) this.setState({ pc });
  };

  async componentWillMount() {
    this.onResize();
    const { years, cities, institutes, events } = await get<ITimeline>('timeline');
    this.setState({
      years: Object.entries<string>(years).slice(1),
      cities: this.structureItems(cities),
      institutes: this.structureItems(institutes),
      events: this.structureItems(events),
    });
  }

  render() {
    const { years, cities = {}, institutes = {}, events = {}, showEvents, pc } = this.state;
    let instIcon: string, institute: string, instDesc: string, instStart: boolean, instCount: number;
    let city: string[], cityStart: boolean, cityCount: number;
    if (!years) return <Loading />;
    return (
      <Grid container direction="column-reverse"
        alignItems={pc ? 'center' : showEvents ? 'flex-end' : 'flex-start'}
        className="container" style={{ margin: '30px auto', paddingTop: 18, overflow: 'hidden' }}>
        {years.map(([year, state], index) => {
          if (cityStart = year in cities) {
            [city, cityCount] = cities[year];
          }
          if (instStart = year in institutes) {
            [[instIcon, institute, instDesc], instCount] = institutes[year];
          }
          const [[eventText, eventDirection = '']] = events[year] || [[]];
          const calendarYear = +year + 1994;
          return (
            <Grow in key={index} timeout={(years.length - index) * 100 + 200}>
              <div className={'year' + (cityStart && ' start' || '') + (cityCount-- === 0 && ' end' || '')}>
                {showEvents && cityStart && <span>
                  <b className="city-vline"><i />
                    <Typography className="number">{calendarYear}</Typography>
                  </b>
                  <Typography className="city" variant="subtitle1" noWrap>
                    <i className="fas fa-map-marker-alt" /> {city[0]}
                  </Typography>
                </span>}
                {(pc || !showEvents) && <span>
                  {instCount === 0 && <span className="inst-box white-text"><i />
                    <Typography variant="subtitle1" style={instDesc ? { marginBottom: 6 } : {}} noWrap>
                      <i style={{ marginRight: 8 }} className={'fas fa-' + instIcon} />
                      <b>{institute}</b>
                    </Typography>
                    <Typography variant="caption">{instDesc}</Typography>
                  </span>}
                  {instCount >= 0 &&
                    <i className={'inst-sign' + (instStart ? ' start' : '') + (instCount-- === 0 ? ' end' : '')} />
                  }
                </span>}
                {(pc || showEvents) && eventText &&
                  <Typography className={'white-text event ' + eventDirection}><i />{eventText}</Typography>
                }
                <Typography align="center" style={{ flex: 1, color: '#616161' }}>
                  <Tooltip title={`${year} years old (${calendarYear})`}>
                    {state ? <span>{state}</span> : <i className="fas fa-child fa-lg" />}
                  </Tooltip>
                </Typography>
              </div>
            </Grow>
          );
        })}
        {!pc && <RadioGroup value={showEvents} className="ctrls"
          onChange={() => this.setState({ showEvents: !showEvents })}>
          <FormControlLabel value={true} control={<Radio />} label="Events" className="orange" />
          <FormControlLabel value={false} control={<Radio />} label="Phases" className="black" />
        </RadioGroup>}
      </Grid>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}
