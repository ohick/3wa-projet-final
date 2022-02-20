import React, { useEffect, useState } from 'react';
import {
  Checkbox, FormControlLabel, FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const options = [
  {
    label: 'Track',
    value: 'track',
  },
  {
    label: 'Artist',
    value: 'artist',
  },
  {
    label: 'Album',
    value: 'album',
  },
];

function CheckboxGroup({
  name, control, setValue, label,
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      {options.map((option) => (
        <FormControlLabel
          control={(
            <Controller
              name={name}
              render={() => (
                <Checkbox
                  checked={selectedItems.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                />
              )}
              control={control}
            />
              )}
          label={option.label}
          key={option.value}
        />
      ))}

    </>
  );
}

export default CheckboxGroup;
