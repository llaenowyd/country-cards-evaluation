import React from 'react';
import tw from 'twin.macro';
import Controller from './Controller';
import Grid from './Grid';
import { useCountryData } from './useCountryData';

const Container: React.FC = tw.div`flex flex-col max-h-full`;

const Countries: React.FC = () => {
  const { data, filter, setFilter, setSort, sort } = useCountryData();

  return (
    <Container>
      <Controller filter={filter} setFilter={setFilter} setSort={setSort} sort={sort} />
      <Grid data={data} />
    </Container>
  );
};

export default Countries;
