import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme, Grow, Zoom, Slide } from '@mui/material';
import { Grid, Toolbar, Button, Avatar, Typography, Hidden } from '@mui/material';
import { url, colors } from './utils/db';
import { Optimize } from './utils/Optimize';
import { Home } from './home/Home';
import { Certificates, Events, Projects } from './cards/Cards';
import { Skills } from './skills/Skills';
import { Profiles } from './profiles/Profiles';
import { Timeline } from './timeline/Timeline';
import { Footer } from './utils/Footer';
import './App.css';

class App extends React.Component {
  public state = { page: 'home', mounted: true };
  private pages: Record<string, React.JSXElementConstructor<any>> = {
    home: () => <Home goto={this.goto.bind(this)} />,
    projects: () => <Projects />,
    skills: () => <Skills />,
    events: () => <Events />,
    profiles: () => <Profiles />,
    certificates: () => <Certificates />,
    timeline: () => <Timeline />
  };
  private buttonColor = (page: string, index: number) => ({
    color: colors[index], boxShadow: this.state.page === page ?
      'inset 0px 0px 0px 1px ' + colors[index] : 'unset'
  });

  private goto(page: string, event?: React.MouseEvent, now = false) {
    if (event) event.preventDefault();
    if (page === this.state.page) return;
    const switchPage = () => {
      window.scroll({ top: 0, left: 0 });
      if (event) history.pushState(null, '', page === 'home' ? '/' : page);
      this.setState({ page, mounted: true });
      document.title = 'Omar Einea | ' + page[0].toUpperCase() + page.slice(1);
    };
    if (now) switchPage();
    else {
      this.setState({ mounted: false });
      setTimeout(switchPage, 200);
    }
  }

  componentWillMount() {
    const page = location.hash.slice(1);
    if (page in this.pages && page !== 'home') {
      history.replaceState(null, '', page);
      this.goto(page, undefined, true);
    }
    window.addEventListener('popstate', () => {
      this.goto(location.pathname.slice(1) || 'home');
    });
  }

  render() {
    const { state, pages } = this;
    const CurrentPage = pages[state.page];
    const isNotHome = state.page !== 'home';
    return (
      <Grid id="root" container direction="column">
        <div id="top-shadow" />
        <Toolbar id="toolbar" className="container">
          <Hidden mdDown={!isNotHome}>
            <div style={{ width: '34.5%', marginLeft: 12 }} className={isNotHome ? 'show' : 'hide'}>
              <Grow in={isNotHome} timeout={400} unmountOnExit>
                <a href="/" onClick={(event) => this.goto('home', event)} id="home-link">
                  <Avatar style={{ border: '1px solid #616161', marginRight: 12 }} src={url('my/logo.jpg')} />
                  <Typography variant="h5" style={{ lineHeight: '42px', color: '#4F4D4E' }}>
                    Omar Einea
                  </Typography>
                </a>
              </Grow>
            </div>
          </Hidden>
          {Object.keys(pages).slice(1).map((page, index) =>
            <Slide in key={index} timeout={(6 - index) * 150} direction="down">
              <span>
                <Button href={page} style={this.buttonColor(page, index)}
                  onClick={(event) => this.goto(page, event)}>{page}</Button>
              </span>
            </Slide>
          )}
          <Zoom in={isNotHome} timeout={{ enter: 300, exit: 200 }}>
            <div className="divider" />
          </Zoom>
        </Toolbar>
        {/* <Grow in={state.mounted} timeout={{ enter: 500, exit: 400 }}> */}
          <Optimize><CurrentPage /></Optimize>
        {/* </Grow> */}
        <Footer />
      </Grid>
    );
  }
}

const app = document.getElementById('app');
if (app) createRoot(app).render(
  <ThemeProvider theme={createTheme({
    typography: { fontFamily: 'Quicksand' }
  })}>
    <App />
  </ThemeProvider>
);
