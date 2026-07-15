import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BookCover from "../components/Books/BookCover";
import Loading from "../components/Shared/Loading";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { fetchBookById } from "../api/booksApi";
import { ui } from "../styles/ui";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(`Failed to load book: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  return (
    <main className={ui.page}>
      <Header />

      <div className={ui.pageTopSpace}>
        <div className={`${ui.homeContainer} py-8`}>
          {loading && <Loading />}

          {!loading && book && (
            <>
              <div className={ui.detailLayout}>
                <div className={ui.detailCoverWrap}>
                  <BookCover
                    image={book.bookImage}
                    title={book.title}
                    size="xl"
                  />
                </div>

                <div className={ui.detailInfoList}>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Title :</span>{" "}
                    {book.title || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Author :</span>{" "}
                    {book.author || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Genre :</span>{" "}
                    {book.genre || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Published year :</span>{" "}
                    {book.publishedYear || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Stock :</span>{" "}
                    {(book.stockQuantity ?? 0) > 0
                      ? "available"
                      : "Out of stock"}
                  </p>
                </div>
              </div>

              <h2 className={ui.detailSectionHeading}>Description Book :</h2>

              <p className={ui.detailIntroText}>
                {book.description || "No description available for this book."}
              </p>
            </>
          )}

          <FeedbackMessage message={error} type="error" />
        </div>
      </div>
    </main>
  );
}
