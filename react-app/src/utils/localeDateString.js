const localeDateStringOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export default function spreadOptionsForDateString() {
  return ["en-US", localeDateStringOptions];
}
