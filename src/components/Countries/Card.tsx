import React from 'react';
import tw from 'twin.macro';
import { CountryRecord } from './useCountryData';

const Container = tw.div`
  flex-initial
  rounded
  shadow-md
  text-sm
  p-1
  mx-1
  bg-green-100
  text-indigo-900
  hover:font-bold
  hover:bg-green-200
  hover:contrast-150
  hover:drop-shadow-lg
  select-none
  cursor-pointer
`;
const Line = tw.div`truncate text-sm`;
const DetailLine = tw.div`truncate text-xs`;

const Card: React.FC<{ value: CountryRecord; selected: boolean; onClick: () => void }> = ({
  value,
  selected,
  onClick
}) => {
  return (
    <Container onClick={onClick} role="listitem">
      <Line>{value.name.common}</Line>
      {selected && (
        <>
          <DetailLine>Capital: {value.capital ? value.capital.join(', ') : 'N/A'}</DetailLine>
          <DetailLine>
            Languages:{' '}
            {value.languages
              ? Object.entries(value.languages)
                  .map(([, v]) => v)
                  .join(', ')
              : 'N/A'}
          </DetailLine>
          <DetailLine>
            Currencies:{' '}
            {value.currencies
              ? Object.entries(value.currencies)
                  .map(([k]) => k)
                  .join(', ')
              : 'N/A'}
          </DetailLine>
        </>
      )}
    </Container>
  );
};

export default Card;
