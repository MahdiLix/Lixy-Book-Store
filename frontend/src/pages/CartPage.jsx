import Header from "../components/Header";
import { ui } from "../styles/ui";

export default function CartPage() {
  return (
    <main className={ui.page}>
      <Header subtitle="Shopping Cart" logoutRedirectTo="/books" />
      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className={ui.card}>
            <div className={ui.cardBody}>
              <h1 className={ui.sectionTitle}>Shopping Cart</h1>
              <p className={ui.sectionSub}>Cart page can be added next.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}