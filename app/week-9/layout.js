import { AuthContextProvider } from "./_utils/auth-context";

export const metadata = {
  title: "Week 9 - Firebase Auth",
};

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
