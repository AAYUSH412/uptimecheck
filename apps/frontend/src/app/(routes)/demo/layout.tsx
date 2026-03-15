import { DemoProvider } from "@/context/DemoContext";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoProvider>
      {children}
    </DemoProvider>
  );
}
