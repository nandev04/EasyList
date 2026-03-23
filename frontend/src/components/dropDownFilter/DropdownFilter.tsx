import { RiFilterFill } from "react-icons/ri";
import { IoIosCheckmark } from "react-icons/io";
import styles from "./dropdownFilter.module.css";

import { SetStateAction } from "react";
import {
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItems,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { StatusTask } from "../../types/task.types";

const DropdownFilter = ({
  selectedStatus,
  setSelectedStatus,
  statusLabel,
  filter,
}: {
  selectedStatus: StatusTask | null;
  setSelectedStatus: React.Dispatch<SetStateAction<StatusTask | null>>;
  statusLabel: Record<StatusTask, string>;
  filter: StatusTask[];
}) => {
  return (
    <>
      <Menu>
        <MenuButton className={styles.button}>
          <RiFilterFill />
        </MenuButton>

        <MenuItems className={styles.menu} anchor="bottom end">
          <div className={styles.group_container}>
            <RadioGroup
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              aria-label="Server size"
              className={styles.group}
            >
              {filter.map((status) => (
                <Field
                  key={status}
                  className={styles.field}
                  onClick={(e) => {
                    if (selectedStatus === status) {
                      e.preventDefault();
                      setSelectedStatus(null);
                    }
                  }}
                >
                  <Radio value={status} className={styles.radio}>
                    <IoIosCheckmark strokeWidth={10} className={styles.icon} />
                  </Radio>

                  <Label className={styles.label}>{statusLabel[status]}</Label>
                </Field>
              ))}
            </RadioGroup>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};

export default DropdownFilter;
