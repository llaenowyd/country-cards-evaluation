import React, { useState } from 'react';
import tw from 'twin.macro';
import Card from './Card';
import { CountryRecord } from './useCountryData';

const Container = tw.div`
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-4
  xl:grid-cols-8
  py-2
  gap-y-2
  overflow-y-auto
`;

const Grid: React.FC<{
  data: CountryRecord[];
}> = ({ data }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');

  return (
    <Container>
      {(data ?? []).map((value, i) => (
        <Card
          key={i}
          value={value}
          selected={value.cca3 === selectedCountryCode}
          onClick={
            value.cca3 === selectedCountryCode
              ? () => setSelectedCountryCode('')
              : () => setSelectedCountryCode(value.cca3)
          }
        />
      ))}
    </Container>
  );
};

export default Grid;
