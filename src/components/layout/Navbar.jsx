// HOOKS
import { useState, useRef, useEffect } from "react";
import { useAccountChanges } from "../../hooks/useAccountChanges";

// COMPONENTS
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { BtnConnectWallet } from "../../ui/BtnConnectWallet";
import { BiLinkExternal } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { WalletAddress } from "../../ui/WalletAddress";
import Modal from "../../ui/Modal";

// CLASS
import { WalletRepository } from "../../repositories/walletRepository";
import { WalletService } from "../../services/walletService";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [Wallet, setWallet] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const repositoryRef = useRef(new WalletRepository());
  const serviceRef = useRef(new WalletService(repositoryRef.current));

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const { address } = await serviceRef.current.connectAndLoadData();
      setWallet(address);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LOAD CONNECTED WALLET ON MOUNT
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { address } = await serviceRef.current.loadConnectedWalletData();
        setWallet(address);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useAccountChanges({ setWallet, setError });

  return (
    <>
      {Error === "User rejected the request." && (
        <Modal
          Title="Error"
          Description={Error}
          setShowModal={() => setError(null)}
          Loading={Loading}
          TitleBtnOk="OK"
          TitleBtnCancel="Close"
          iconBtnPositive={<FaCheck size={20} />}
          fnBtnOk={async (e) => {
            e.preventDefault();
            setError(null);
          }}
        />
      )}
      {Error === "MetaMask is not installed" && (
        <Modal
          Title="Error"
          Description={Error}
          setShowModal={() => setError(null)}
          Loading={Loading}
          TitleBtnOk="Install"
          TitleBtnCancel="Close"
          iconBtnPositive={<BiLinkExternal size={20} />}
          fnBtnOk={(e) => {
            e.preventDefault();
            window.open(
              "https://metamask.io/download/",
              "_blank",
              "noopener,noreferrer"
            );
            setError(null);
          }}
        />
      )}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="container">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <svg
                  width="30"
                  height="35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="20" r="10" stroke="#2660d3" />
                  <circle
                    cx="15"
                    cy="20"
                    r="6"
                    stroke="#2660d3"
                    strokeWidth="3"
                  />
                </svg>
                <span className="text-2xl font-bold text-primary-600 mt-1.5">
                  GoldenProp
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sapphire-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
              {Loading ? (
                <Connecting />
              ) : (
                <>
                  {Wallet ? (
                    <WalletAddress Wallet={Wallet} />
                  ) : (
                    <BtnConnectWallet onClick={handleConnect} />
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="text-secondary-600 hover:text-primary-600"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1 bg-glass backdrop-blur-xl rounded-b-2xl border-t border-glass">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-sapphire-700 hover:text-primary-600 hover:bg-glass-light rounded-xl mx-2 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {Loading ? (
                  <Connecting />
                ) : (
                  <>
                    {Wallet ? (
                      <WalletAddress Wallet={Wallet} />
                    ) : (
                      <BtnConnectWallet
                        className="block mx-2 mt-2 px-3 py-2 text-base font-medium w-auto"
                        onClick={handleConnect}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function Connecting() {
  return (
    <div className="block px-3 py-2 text-base font-medium text-sapphire-700">
      Connecting...
    </div>
  );
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
];

export default Navbar;
