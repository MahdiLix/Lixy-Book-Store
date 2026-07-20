export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div id="errorDisplayContainer">{message}</div>;
}