import React, { useState, useEffect } from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  makeStyles
} from '@material-ui/core';
import { FormatQuoteRounded, Twitter } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quoteBox: {
    width: '450px',
    margin: '0 auto',
    padding: '15px 50px 40px 50px'
  },
  quote: {
    fontSize: '1.5em',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: "'Raleway', sans-serif",
    lineHeight: 1.3
  },
  quoteIcon: {
    transform: 'rotate(180deg)',
    position: 'relative',
    top: '14px',
    marginRight: '5px',
    fontSize: '2em'
  },
  author: {
    marginTop: '10px',
    textAlign: 'right'
  },
  twitter: {
    display: 'block'
  },
  button: {
    marginLeft: 'auto',
    color: 'white',
    fontWeight: '600'
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
  const [selectedQuote, setSelectedQuote] = useState();
  const [accentColor, setAccentColor] = useState();

  const classes = useStyles();

  useEffect(() => {
    const url =
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

    fetch(url)
      .then(res => res.json())
      .then(({ quotes }) => {
        setQuotes(quotes);

        const randQuoteIndex = Math.round(Math.random() * quotes.length - 1);
        setSelectedQuote(quotes[randQuoteIndex]);
        const randColorIndex = Math.round(Math.random() * colors.length - 1);
        setAccentColor(colors[randColorIndex]);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFccTest({
    fccTest: FccTests.random_quote_machine
  });

  const generateRandNumUpTo = num => {
    return Math.floor(Math.random() * num);
  };

  const handleChangeQuote = () => {
    setSelectedQuote(quotes[generateRandNumUpTo(quotes.length)]);
    setAccentColor(colors[generateRandNumUpTo(colors.length)]);
  };

  return (
    <Container
      className={classes.container}
      style={{ background: accentColor }}
    >
      <Card variant="outlined" className={classes.quoteBox} id="quote-box">
        <CardContent>
          <Typography
            id="text"
            className={classes.quote}
            style={{ color: accentColor }}
          >
            <FormatQuoteRounded className={classes.quoteIcon} />
            {selectedQuote?.quote}
          </Typography>

          <Typography
            color="secondary"
            id="author"
            className={classes.author}
            style={{ color: accentColor }}
          >
            - {selectedQuote?.author}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <a href="twitter.com/intent/tweet" id="tweet-quote">
            <Button
              className={classes.button}
              style={{ backgroundColor: accentColor }}
              aria-label="tweet quote"
            >
              <Twitter
                className={classes.twitter}
                href="twitter.com/intent/tweet"
              />
            </Button>
          </a>
          <Button
            id="new-quote"
            className={classes.button}
            style={{
              backgroundColor: accentColor
            }}
            size="medium"
            onClick={handleChangeQuote}
          >
            New Quote
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
