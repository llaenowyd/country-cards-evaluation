import React from 'react';
import tw from 'twin.macro';
import { UseCountrySort } from './useCountryData';

const Container = tw.div`grid grid-cols-1 sm:grid-cols-2 items-baseline bg-yellow-200 p-2 gap-4`;
const ControlContainer = tw.div`flex items-baseline flex-1 gap-1 p-1`;
const Select = tw.select`bg-yellow-100 text-sm focus:ring-0 ring-0 focus:border-none border-none focus:outline-none`;
const Input = tw.input`bg-yellow-100 text-sm border-b-2 border-black focus:ring-0 ring-0 focus:outline-none`;
const Label = tw.div`text-xs whitespace-nowrap select-none`;

const FilterControl: React.FC<{
  filter: string;
  setFilter: (filter: string) => void;
}> = ({ filter, setFilter }) => {
  return (
    <ControlContainer>
      <Label>Filter</Label>
      <Input type="text" onChange={ev => setFilter(ev.target.value as string)} value={filter} role="textbox" />
    </ControlContainer>
  );
};

const SortControl: React.FC<{
  setSort: (sort: UseCountrySort) => void;
  sort: UseCountrySort;
}> = ({ setSort, sort }) => {
  return (
    <ControlContainer>
      <Label>Sort by</Label>
      <Select onChange={ev => setSort(ev.target.value as UseCountrySort)} role="listbox">
        <option value="name">Name</option>
        <option value="pop-asc">Population (Ascending)</option>
        <option value="pop-desc">Population (Descending)</option>
      </Select>
    </ControlContainer>
  );
};

const Controller: React.FC<{
  filter: string;
  setFilter: (filter: string) => void;
  setSort: (sort: UseCountrySort) => void;
  sort: UseCountrySort;
}> = ({ filter, setFilter, setSort, sort }) => (
  <Container>
    <FilterControl filter={filter} setFilter={setFilter} />
    <SortControl setSort={setSort} sort={sort} />
  </Container>
);

export default Controller;
