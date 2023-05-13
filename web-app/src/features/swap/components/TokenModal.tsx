import { SUPPORTED_TOKENS } from "../constants/tokens";
import TokenListItem from "./TokenListItem";

export default function TokenModal() {
  return (
    <>
      {/*
        modal's visibility is controlled by this checkbox's :checked state,
        no JS required!
      */}
      <input type="checkbox" id="tokens-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-row flex-wrap">
            {SUPPORTED_TOKENS.map((token) => (
              <TokenListItem key={token.symbol} token={token} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
