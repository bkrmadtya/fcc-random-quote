import React, { useState, useEffect } from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

import QuoteBox from './QuoteBox';

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
    <QuoteBox
      newQuote={newQuote}
      accentColor={accentColor}
      handleChangeQuote={handleChangeQuote}
    />
  );
}
