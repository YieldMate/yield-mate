export default function LearnMoreModal() {
  return (
    <>
      <input type="checkbox" id="learn-more-modal" className="modal-toggle" />
      <div className="modal">
        <div className="prose modal-box">
          <h2>Learn more</h2>
          <p>
            {`YieldMate offers a unique feature where users can place limit orders
            that generate extra yield while waiting for the target price. Once
            the swap is executed, the newly bought token is automatically
            deposited into another yield protocol, where it earns even more
            yield until it is withdrawn.`}
          </p>
          <p>
            {`All of this is made possible by Chainlink automation , which
            monitors the prices of the selected token pair. When the target
            price is reached, YieldMate automatically performs the swap in the
            user's name.`}
          </p>
          <h3>{`Here's an example:`}</h3>
          <p>
            {`Let's say Alice wants to buy 1 wETH for 2000 DAI. The current market
            price is 2100 DAI, so YieldMate redirects Alice's DAI to a yield
            protocol where it starts earning interest. Alice's DAI sits there and
            over time generates extra 50 DAI. After some time, the
            price of wETH drops to 2050 DAI. YieldMate then automatically
            withdraws Alice's DAI from the yield protocol and sells it for 1
            wETH, which is then redirected back to the protocol. When Alice
            decides to withdraw her wETH, she realizes that even though she only
            wanted to buy one token, the yield protocol generated an extra 0.03 wETH and
            on top of that Alice was able to buy the token at her desired price even though the market price never actually dropped to 2000 DAI.`}
          </p>

          <p>
            {`YieldMate's limit order feature and automated yield farming allow
            users to maximize their profits and take advantage of market
            fluctuations in a seamless and efficient way.`}
          </p>
          <label
            htmlFor="learn-more-modal"
            className="btn absolute right-4 top-4"
          >
            &#88;
          </label>
        </div>
      </div>
    </>
  );
}
