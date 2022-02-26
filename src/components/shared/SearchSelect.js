import { useState, useEffect, useRef, Fragment } from 'react';

import useOnClickOutside from '@/hooks/use-on-click-outside';

import clsx from 'clsx';

import { LoadingIcon } from '@/components/shared/Icons';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const SearchSelect = (props) => {
  const {
    label,
    loading,
    disabled,
    placeholder,
    options = [],
    value,
    onSearch,
    onSelect,
    renderItem,
  } = props;
  const ref = useRef();

  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleToggle = () => setIsOpen((prevState) => !prevState);

  const handleSearch = (e) => {
    if (onSearch) onSearch(e.target.value);
    setSearchValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (option) => {
    if (onSelect) onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div
        className={clsx(
          'relative flex items-center justify-between',
          'rounded-lg border-0',
          'group focus:outline-none'
        )}
        onClick={() => (disabled ? {} : handleToggle())}
      >
        <input
          disabled={disabled}
          aria-label={label}
          className={clsx(
            `${disabled ? 'cursor-not-allowed text-gray-200' : 'text-gray-800'}`,
            'w-full',
            'py-2 pl-3 pr-12',
            'rounded-lg focus:outline-none'
          )}
          placeholder={placeholder ?? '搜尋'}
          value={searchValue ?? ''}
          onChange={handleSearch}
        />
        <div className="absolute right-2 flex items-center justify-center text-gray-500">
          <div
            className={clsx(
              `${disabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer text-gray-600'}`,
              'p-1',
              'rounded-full',
              'transition duration-150 ease-in-out '
            )}
          >
            {value !== '' && loading ? (
              <LoadingIcon className="h-5 w-5" />
            ) : (
              <>
                {isOpen ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        show={isOpen && value !== ''}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ul
          className={clsx(
            'absolute z-10 max-h-56 w-full',
            'mt-1 py-2',
            'rounded-lg bg-white shadow-lg',
            'overflow-auto focus:outline-none'
          )}
        >
          {value !== '' && loading && (
            <li className="flex justify-center py-2 text-center text-gray-500">
              <LoadingIcon className="h-7 w-7" />
            </li>
          )}

          {!loading && options.length === 0 && (
            <li className="py-2 text-center text-gray-500">查無資料</li>
          )}

          {options.map((option, index) => (
            <li
              className={clsx(
                'relative flex flex-wrap items-center',
                'ml-2 mr-4 p-2',
                'truncate rounded-lg text-sm text-gray-600',
                'cursor-pointer hover:bg-gray-500 hover:text-gray-200'
              )}
              key={`${index.toString()}`}
              onClick={() => handleSelect(option)}
            >
              {renderItem({ option })}
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  );
};

export default SearchSelect;
