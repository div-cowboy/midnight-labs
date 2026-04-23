import { currentUser } from "@clerk/nextjs/server";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";
import { TWEAKS } from "./_components/data";
import "./dashboard.css";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Rae Castellanos";
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? "rae@midnight.ai";

  return (
    <div className="midnight-dashboard">
      <div className="app" data-density={TWEAKS.density}>
        <Sidebar userName={userName} userEmail={userEmail} />
        <div className="main">
          <Topbar />
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
