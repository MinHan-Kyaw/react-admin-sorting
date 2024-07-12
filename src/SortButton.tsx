import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslate } from "react-admin";

interface SortButtonProps {
  fields: string[];
  onSortChange: (field: string) => void;
  sort: { field: string; order: string };
}

const SortButton: React.FC<SortButtonProps> = ({
  fields,
  onSortChange,
  sort,
}) => {
  const translate = useTranslate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeSort: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const field = event.currentTarget.dataset.sort;
    if (field) {
      onSortChange(field);
    }
    setAnchorEl(null);
  };

  const buttonLabel = sort
    ? translate("ra.sort.sort_by", {
        field: translate(`${sort.field}`),
        order: translate(`${sort.order.toLowerCase()}`),
      })
    : "";

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        startIcon={<SortIcon />}
        endIcon={<ArrowDropDownIcon />}
        size="small"
      >
        {buttonLabel}
        {/* {translate("ra.sort.sort_by")} */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {fields.map((field) => (
          <MenuItem onClick={handleChangeSort} data-sort={field} key={field}>
            {translate(`${field}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortButton;
