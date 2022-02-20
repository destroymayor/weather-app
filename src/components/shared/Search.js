import clsx from 'clsx';

import { SearchIcon } from '@heroicons/react/solid';

const Search = (props) => {
  const { placeholder = '搜尋', value, onChange } = props;

  const handleChange = (e) => onChange(e.target.value);

  return (
    <div
      className={clsx('flex items-center', 'rounded-lg bg-white shadow-sm', 'group cursor-pointer')}
    >
      <div className="flex items-center pl-2">
        <SearchIcon className="h-6 w-6 text-gray-500" />
      </div>
      <input
        className="w-full rounded-md bg-transparent p-2 text-gray-800 focus:outline-none"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
