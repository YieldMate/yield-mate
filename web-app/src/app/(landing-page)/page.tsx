import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Smarter investing starts with smarter limit orders
          </h1>
          <p className="py-6">
            Welcome to YieldMate, the revolutionary platform that empowers you
            to optimize your investments with intelligent limit orders. Say
            goodbye to traditional trading strategies and embrace a smarter
            approach that maximizes your potential for profit.
          </p>
          <Link href="/new-order" className="btn-primary btn">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
