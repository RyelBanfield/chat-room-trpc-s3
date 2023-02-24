import moment from "moment";

const formatDate = (date: string) => {
  const now = moment();
  const messageTime = moment(date);
  const diffMinutes = now.diff(messageTime, "minutes");
  if (diffMinutes < 30) {
    return `${diffMinutes} mins ago`;
  } else {
    return messageTime.format("MMM DD, YYYY h:mm A");
  }
};

export default formatDate;
