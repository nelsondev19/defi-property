/**
 * @typedef {Object} Props
 * @property {string} [className] - Optional additional class names
 * @property {function} [onClick] - Optional click handler
 */

/**
 * BtnConnectWallet component - Renders a connect button that closes the modal
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */
export function BtnConnectWallet({ className, onClick }) {
  return <button className={`btn ${className}`} onClick={onClick}>Connect</button>;
}
