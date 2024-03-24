import rawData from './data.json';

import { useMemo, useState } from 'react';

export interface CountryRecord {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  capitalInfo: {
    latlng?: number[];
  };
  languages: Record<any, string>;
  currencies: Record<any, string>[];
  population: number;
}

export interface UseCountryDataResult {
  data: CountryRecord[];
  filter: string;
  setFilter: (filter: string) => void;
  setSort: (sort: any) => void;
  sort: any;
}

export type UseCountrySort = 'pop-asc' | 'pop-desc' | 'name';

const sortByPopAsc = (a: CountryRecord, b: CountryRecord) => a.population - b.population;
const sortByPopDesc = (a: CountryRecord, b: CountryRecord) => b.population - a.population;
const sortByName = (a: CountryRecord, b: CountryRecord) => a.name.common.localeCompare(b.name.common);

type FilterFn = (crec: CountryRecord) => boolean;

const makeFilter = (filter: string): FilterFn => {
  const trimmedFilter = filter.trim();

  if (!trimmedFilter) {
    return () => true;
  }

  const regex = new RegExp(trimmedFilter, 'i');

  return (crec) => !!crec.name.common.match(regex) || !!crec.cca3.match(regex);
};

export const useCountryData = (): UseCountryDataResult => {
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<UseCountrySort>('name');

  const sortedAndFilteredData = useMemo(() => {
    const sortFn = sort === 'pop-asc' ? sortByPopAsc : sort === 'pop-desc' ? sortByPopDesc : sortByName;
    const filterFn = makeFilter(filter);

    return (rawData as unknown as CountryRecord[]).filter(filterFn).sort(sortFn);
  }, [filter, sort]);

  return {
    data: sortedAndFilteredData,
    filter,
    setFilter,
    setSort,
    sort,
  };
};
