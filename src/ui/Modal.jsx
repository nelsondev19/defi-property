import { IoMdClose } from "react-icons/io";

/**
 * @typedef {Object} ModalProps
 * @property {string} Title - Modal title heading
 * @property {string} Description - Modal description text
 * @property {string} TitleBtnOk - Text for the confirm button
 * @property {string} TitleBtnCancel - Text for the cancel button
 * @property {React.ReactNode} iconBtnPositive - Icon name for the positive button
 * @property {function(Event): Promise<void>} fnBtnOk - Function to execute on form submit
 * @property {React.ReactNode} children - Modal content/form elements
 * @property {boolean} loading - Loading state for the submit button
 * @property {function(): void} setShowModal - Function to control modal visibility
 */

/**
 * Modal component - Displays a modal dialog with title, description, and action buttons
 * @param {ModalProps} props - Component props
 * @returns {JSX.Element}
 */
function Modal({
  Title,
  Description,
  TitleBtnOk,
  TitleBtnCancel,
  iconBtnPositive,
  fnBtnOk,
  children,
  Loading,
  setShowModal,
}) {
  return (
    <div
      id="modal-confirm"
      className="z-50 p-3 bg-black/60 backdrop-blur-xs flex justify-center items-center fixed top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-white px-5 py-5 w-[40rem] rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{Title}</h1>
          <button
            onClick={setShowModal}
            type="button"
          >
            <IoMdClose size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <p className="mt-2">{Description}</p>

        <form onSubmit={fnBtnOk}>
          {children}
          <div className="flex justify-end mt-5 gap-3">
            <div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn-danger gap-0.5"
              >
                <IoMdClose size={20} />
                {TitleBtnCancel}
              </button>
            </div>
            <button type="submit" className="btn gap-0.5">
              {Loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 animate-spin"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"></path>
                </svg>
              ) : (
                iconBtnPositive
              )}
              {TitleBtnOk}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
