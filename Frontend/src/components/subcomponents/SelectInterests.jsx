
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





export default function MultipleSelectChip({keywords, handleKeywordsChange, selectedKeywords}) {
 

  return (
    <div>
      <FormControl style={{ width: '77%' }}>
        <InputLabel id="demo-multiple-chip-label">Schlagworte</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedKeywords}
          onChange={(e)=>{handleKeywordsChange(e)}}
          input={<OutlinedInput id="select-multiple-chip" label="Schlagworte" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {keywords.map((keyword, index) => (
            <MenuItem
              key={index}
              value={keyword.keyword  }
            >
              {keyword.keyword}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
