import { Checkbox } from "@mui/material";

import { FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

const CheckboxButtons = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);
  // value: red
  const handleToggle = (value: string) => {
    //checkitems: blue, grren
    const updatedChecked = checkedItems?.includes(value)
      ? // filter khac voi value
        checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <FormGroup>
      {items &&
        items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                onClick={() => handleToggle(item)}
                color="secondary"
                sx={{ py: 0.7, fontSize: 40 }}
              />
            }
            label={item}
          />
        ))}
    </FormGroup>
  );
};
export default CheckboxButtons;
