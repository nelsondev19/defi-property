// HOOKS
import { useState } from "react";

// COMPONENTS
import { IoClipboardOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";

/**
 * @typedef {Object} Props
 * @property {string} Wallet - The wallet address to display and copy
 */

/**
 * WalletAddress component - Displays a truncated wallet address with copy-to-clipboard functionality
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */
function WalletAddress({ Wallet }) {
  const [TextCopied, setTextCopied] = useState(false);

  const clipboard = () => {
    navigator.clipboard.writeText(Wallet);
    setTextCopied(true);
    setTimeout(() => setTextCopied(false), 1500);
  };
  return (
    <div className="px-3 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg gap-2 flex items-center">
      {`${Wallet.substring(0, 6)}...${Wallet.substring(Wallet.length - 4)}`}
      <button onClick={clipboard}>
        {TextCopied ? (
          <LuClipboardCheck size={20} />
        ) : (
          <IoClipboardOutline size={20} />
        )}
      </button>
    </div>
  );
}

export { WalletAddress };
