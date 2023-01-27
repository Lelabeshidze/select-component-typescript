import { useState } from "react";
import styles from "./select.module.css";
type SelectOption = {
  label: string;
  value: any;
};
type SelectProps = {
  options: SelectOption[];
  onChange: (value: SelectOption | undefined) => void;
  value?: SelectOption;
};
export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  function clearOptions() {
    onChange(undefined);
  }
  function selectOption(option: SelectOption) {
    onChange(option);
  }
  function isOptenSelected(option: SelectOption) {
    return option === value;
  }

  return (
    <div
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        {" "}
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.label}
            className={`${styles.option} ${
              isOptenSelected(option) ? styles.selected : ""
            }  ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
