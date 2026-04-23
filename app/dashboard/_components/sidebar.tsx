"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { Icons } from "./icons";
import { initials, workspaces } from "./data";

type NavKey =
  | "engagement"
  | "learn-library"
  | "learn-articles"
  | "learn-agents"
  | "community";

function matchActive(pathname: string): NavKey | null {
  if (pathname === "/dashboard") return "engagement";
  if (pathname.startsWith("/dashboard/learn/library")) return "learn-library";
  if (pathname.startsWith("/dashboard/learn/articles")) return "learn-articles";
  if (pathname.startsWith("/dashboard/learn/agents")) return "learn-agents";
  if (pathname.startsWith("/dashboard/community")) return "community";
  return null;
}

export function Sidebar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const active = matchActive(pathname);
  const [wsOpen, setWsOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const wsRef = useRef<HTMLDivElement>(null);
  const accRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wsRef.current && !wsRef.current.contains(t)) setWsOpen(false);
      if (accRef.current && !accRef.current.contains(t)) setAccOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const activeWs = workspaces.find((w) => w.active) ?? workspaces[0];
  const userInitials = initials(userName) || "U";

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-name">Midnight</div>
            <div className="brand-sub">CLIENT CONSOLE</div>
          </div>
        </div>
        <div
          className="ws-switcher"
          onClick={() => setWsOpen((v) => !v)}
          ref={wsRef}
        >
          <div className="ws-avatar" style={{ background: activeWs.color }}>{activeWs.tag}</div>
          <div className="ws-meta">
            <div className="ws-name">{activeWs.name}</div>
            <div className="ws-role">Engagement lead · you</div>
          </div>
          <div className="ws-caret"><Icons.caretDown /></div>
          {wsOpen && (
            <div className="ws-popover" onClick={(e) => e.stopPropagation()}>
              <div className="ws-popover-label">Switch workspace</div>
              {workspaces.map((w) => (
                <div key={w.name} className="ws-option" data-active={w.active ? "true" : "false"}>
                  <div className="ws-avatar" style={{ background: w.color }}>{w.tag}</div>
                  <div className="ws-option-meta">
                    <div className="ws-option-name">{w.name}</div>
                    <div className="ws-option-sub">{w.sub}</div>
                  </div>
                  {w.active && <div className="ws-option-check"><Icons.check /></div>}
                </div>
              ))}
              <div style={{ height: 1, background: "var(--line-2)", margin: "4px 0" }} />
              <div className="ws-option" style={{ color: "var(--fg-2)" }}>
                <div className="ws-avatar" style={{ background: "var(--bg-3)", border: "1px dashed var(--line-3)", color: "var(--fg-3)" }}><Icons.plus /></div>
                <div className="ws-option-meta">
                  <div className="ws-option-name" style={{ color: "var(--fg-2)" }}>New engagement</div>
                  <div className="ws-option-sub">Start scoping a workspace</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto" }}>
        <div className="nav-section">
          <div className="nav-section-label">Engagement</div>
          <NavItem
            href="/dashboard"
            icon={<Icons.overview />}
            label="Home"
            active={active === "engagement"}
          />
        </div>
        <div className="nav-section">
          <div className="nav-section-label">Learn</div>
          <NavItem
            href="/dashboard/learn/library"
            icon={<Icons.library />}
            label="Course library"
            active={active === "learn-library"}
          />
          <NavItem
            href="/dashboard/learn/articles"
            icon={<Icons.article />}
            label="Articles"
            active={active === "learn-articles"}
          />
          <NavItem
            href="/dashboard/learn/agents"
            icon={<Icons.agent />}
            label="Agent library"
            active={active === "learn-agents"}
          />
        </div>
        <div className="nav-section">
          <div className="nav-section-label">Community</div>
          <NavItem
            href="/dashboard/community"
            icon={<Icons.community />}
            label="Questions & tips"
            active={active === "community"}
          />
        </div>
      </nav>

      <div className="sidebar-foot">
        <div className="account" ref={accRef} onClick={() => setAccOpen((v) => !v)}>
          <div className="account-avatar">{userInitials}</div>
          <div className="account-meta">
            <div className="account-name">{userName}</div>
            <div className="account-email">{userEmail}</div>
          </div>
          <div style={{ color: "var(--fg-3)" }}><Icons.caretDown /></div>
          {accOpen && (
            <div className="account-popover" onClick={(e) => e.stopPropagation()}>
              <div className="account-item"><Icons.settings /> Settings <span className="account-item-kbd">⌘,</span></div>
              <div className="account-item"><Icons.share /> Invite to workspace</div>
              <div className="account-divider" />
              <div className="account-item"><Icons.info /> Help & docs</div>
              <SignOutButton>
                <div className="account-item" role="button"><Icons.logout /> Sign out</div>
              </SignOutButton>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  disabled,
  badge,
}: {
  href?: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
}) {
  const inner = (
    <>
      <span className="nav-item-icon">{icon}</span>
      <span>{label}</span>
      {badge && <span className="nav-item-badge">{badge}</span>}
    </>
  );
  if (disabled || !href) {
    return (
      <button
        className="nav-item"
        disabled
        style={{ opacity: 0.45, cursor: "not-allowed" }}
      >
        {inner}
      </button>
    );
  }
  return (
    <Link href={href} className="nav-item" data-active={active ? "true" : "false"}>
      {inner}
    </Link>
  );
}
