import React, { useState, useEffect } from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import { Container, makeStyles, Typography, Link } from '@material-ui/core';

import QuoteBox from './component/QuoteBox';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signature: {
    color: 'white',
    fontSize: '0.8em',
    margin: 15
  },
  credit: {
    color: 'white'
  }
}));

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState();
  const [accentColor, setAccentColor] = useState();

  const classes = useStyles();

  useEffect(() => {
    const url =
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

    fetch(url)
      .then(res => res.json())
      .then(({ quotes }) => {
        setQuotes(quotes);

        setNewQuote(quotes[generateRandNumUpTo(quotes.length)]);
        setAccentColor(colors[generateRandNumUpTo(colors.length)]);
      });
  }, []);

  useFccTest({
    fccTest: FccTests.random_quote_machine
  });

  const generateRandNumUpTo = num => {
    return Math.floor(Math.random() * num);
  };

  const handleChangeQuote = () => {
    setNewQuote(quotes[generateRandNumUpTo(quotes.length)]);
    setAccentColor(colors[generateRandNumUpTo(colors.length)]);
  };

  return (
    <Container
      className={classes.container}
      style={{ background: accentColor }}
    >
      <QuoteBox
        newQuote={newQuote}
        accentColor={accentColor}
        handleChangeQuote={handleChangeQuote}
      />
      <Typography className={classes.signature}>
        by{' '}
        <Link
          variant="subtitle2"
          href="https://linkedin.com/in/bkrmadtya"
          target="blank"
          color="inherit"
        >
          Bikram Karki
        </Link>{' '}
        2020
      </Typography>

      <Typography variant="body2" className={classes.credit}>
        Inspired by:{' '}
        <Link
          href="https://codepen.io/freeCodeCamp/pen/qRZeGZ"
          target="blank"
          color="inherit"
        >
          https://codepen.io/freeCodeCamp/pen/qRZeGZ
        </Link>
      </Typography>
    </Container>
  );
}
