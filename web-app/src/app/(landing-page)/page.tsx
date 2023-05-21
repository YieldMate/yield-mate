import Image from "next/image";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function LandingPage() {
  return (
    <div className="grid min-h-screen w-full grid-cols-2 items-center overflow-hidden px-8 2xl:px-32">
      <article className="flex flex-col items-start justify-center gap-6 text-left">
        <h1 className="max-w-5xl">
          <Balancer>
            Smarter investing starts with smarter limit orders
          </Balancer>
        </h1>
        <p className="max-w-xl text-lg">
          Welcome to YieldMate, the revolutionary platform for intelligent limit
          orders. Set precise target prices, execute trades automatically, and
          maximize your profit potential. Embrace a smarter approach to
          investing and unlock the power of YieldMate.
        </p>
        <Link href="/new-order" className="btn-primary btn max-w-lg">
          Show me
        </Link>
      </article>

      <Image
        src="/hero.svg"
        alt=""
        width={866}
        height={683}
        role="presentation"
        priority
      />
    </div>
  );
}
