import Link from "next/link";
import React from "react";
import Wallet from "~/features/wallet/components/Wallet";

export default function Navbar() {
  return (
    <div className="navbar z-10 bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-56 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/new-order">New order</Link>
            </li>
            <li>
              <Link href="/orders">My orders</Link>
            </li>
            <li className="disabled">
              <a href="https://snapshot.org/#/yieldmate" target="_blank">
                Governance (coming soon)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Link href="/" className="navbar-center prose">
        <h1>
          Yield
          <span className="text-primary">Mate</span>
        </h1>
      </Link>
      <div className="navbar-end">
        <Wallet />
      </div>
    </div>
  );
}
