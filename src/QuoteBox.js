import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  makeStyles,
  Fade
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

export default function QuoteBox(props) {
  const [quote, setQuote] = useState();
  const { newQuote, accentColor, handleChangeQuote } = props;
  const classes = useStyles();

  const setNewQuote = newQuote => {
    setTimeout(() => {
      setQuote(newQuote);
    }, 300);
  };

  useEffect(() => {
    setNewQuote(newQuote);

    return setNewQuote;
  }, [newQuote]);

  return (
    <Container
      className={classes.container}
      style={{ background: accentColor }}
    >
      <Card variant="outlined" className={classes.quoteBox} id="quote-box">
        <Fade in={quote?.quote === newQuote?.quote} timeout={400}>
          <CardContent>
            <Typography
              id="text"
              className={classes.quote}
              style={{ color: accentColor }}
            >
              {quote && <FormatQuoteRounded className={classes.quoteIcon} />}
              {quote?.quote}
            </Typography>

            <Typography
              color="secondary"
              id="author"
              className={classes.author}
              style={{ color: accentColor }}
            >
              - {quote?.author}
            </Typography>
          </CardContent>
        </Fade>

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
