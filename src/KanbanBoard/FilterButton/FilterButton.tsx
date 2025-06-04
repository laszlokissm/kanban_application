import { useState } from 'preact/hooks';
import { Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

type FilterButtonProps = {
  allTags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
};

/**
 * FilterButton component displays a button to filter items by tags.
 * When clicked, it opens a menu with all available tags where users can select or deselect tags.
 * The selected tags are highlighted, and the menu closes after a tag is toggled.
 */
const FilterButton = ({ allTags, activeTags, onToggleTag }: FilterButtonProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <div>
      {/* Filter Button */}
      <Button
        variant="outlined"
        onClick={(e) => {
          if (allTags.length > 0) {
            setMenuAnchor(e.currentTarget);
          }
        }}
        disabled={allTags.length === 0}
      >
        <FilterListIcon />
        Filter by Tags
      </Button>

      {/* Tag Filter Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >        {allTags.map((tag) => (
          <MenuItem
            key={tag}
            onClick={() => {
              onToggleTag(tag);
              setMenuAnchor(null);
            }}
            selected={activeTags.includes(tag)}
          >
            {activeTags.includes(tag) ? `✔ ${tag}` : tag}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterButton;
