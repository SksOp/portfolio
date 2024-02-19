import dynamic from "next/dynamic";
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: false, // This will only import the component on the client-side
});

export default function Home() {
  return <Hero />;
}
