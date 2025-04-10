import { useQuery } from "../../hooks/useQuery";
import { useArticleStore } from "store/articleStore";
import NewsImage from "components/ui/newsDetail/NewsImage";
import NewsMetadata from "components/ui/newsDetail/NewsMetadata";
import NewsHeader from "components/ui/newsDetail/NewsHeader";
import NewsNotFound from "components/ui/newsDetail/NewsNotFound";

export default function ArticleDetail() {
    const query = useQuery();
    const encodedUri = query.get("uri");
    const decodedUri = decodeURIComponent(encodedUri || "");
    const selectedArticle = useArticleStore((state) => state.selectedArticle);

    // Fallback: if user refreshes and state is lost, try to recover from localStorage
    if (!selectedArticle || selectedArticle.uri !== decodedUri) {
        const stored = JSON.parse(localStorage.getItem("nyt-article-store"));
        if (stored?.state?.selectedArticle?.uri === decodedUri) {
            return <NewsNotFound article={stored.state.selectedArticle} />;
        }
        return <NewsNotFound />;
    }

    return (
        <div className="flex w-screen h-screen overflow-hidden flex-col max-w-[100%]">
            <div className="flex w-full h-[90vh]">
                <NewsHeader article={selectedArticle} />
                <NewsImage article={selectedArticle} />
            </div>
            <NewsMetadata article={selectedArticle} />
        </div>
    );
}