import styles from "./Dropdown.module.css";

interface Children {
  children: JSX.Element | JSX.Element[];
  isEnabled: Boolean;
}

const Dropdown = ({ children, isEnabled }: Children) => {
  const classes = `${styles.Menu} ${isEnabled ? "" : styles.Disabled}`
  return (
    <div className={classes} id="dropdown">
      {/* {!Array.isArray(children) ? children : children.map((child, i) => {
          console.log(child)
          if (i == 0) {
              <li className={styles.ItemFirst}>{child}</li>
          } else {
            <li className={styles.Item}>{child}</li>
          }
      })} */}
      {children}
    </div>
  );
};

export default Dropdown;
