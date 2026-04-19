import { Landing } from "./_components/landing";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return <Landing />;
}
