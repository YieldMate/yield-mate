import WithdrawDetails from "./WithdrawDetails";

export default function WithdrawModal() {
  return (
    <>
      <input type="checkbox" id="withdraw-modal" className="modal-toggle" />
      <div className="modal">
        <div className="prose modal-box">
          <h2>Withdraw</h2>
          <WithdrawDetails />
          <label
            className="btn absolute right-4 top-4"
            htmlFor="withdraw-modal"
          >
            &#88;
          </label>
        </div>
      </div>
    </>
  );
}
