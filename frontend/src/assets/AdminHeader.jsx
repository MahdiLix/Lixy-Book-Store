import Header from "../components/Layout/Header";

export default function AdminHeader({ subtitle = "Admin Dashboard" }) {
  return <Header subtitle={subtitle} logoutRedirectTo="/login" />;
}
