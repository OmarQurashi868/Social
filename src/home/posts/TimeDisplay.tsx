import styles from "./TimeDisplay.module.css";

interface Props {
  givenDate: Date;
}

const TimeDisplay = ({ givenDate }: Props) => {
  let dateDisplay = "";
  let timeDisplay = "";
  const hourDifference = new Date().getHours() - new Date(givenDate).getHours();

  if (
    new Date().toLocaleDateString() === new Date(givenDate).toLocaleDateString()
  ) {
    dateDisplay = "Today";
    if (hourDifference == 0) {
      timeDisplay = "less than an hour ago";
    } else if (hourDifference == 1) {
      timeDisplay = "about an hour ago";
    } else {
      timeDisplay = new Date(givenDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  } else {
    dateDisplay = new Date(givenDate).toLocaleDateString();
    timeDisplay = new Date(givenDate).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className={styles.Tooltip}>
      {dateDisplay} {timeDisplay}
      <span className={styles.TooltipText}>{new Date(givenDate).toLocaleString()}</span>
    </div>
  );
};

export default TimeDisplay;
