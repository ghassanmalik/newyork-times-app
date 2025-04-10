import React, {useState} from "react";
import { useNews } from "hooks/useNews.js";
import { NewsCard } from "components/ui/news/NewsCard.jsx";
import { NewsCardSkeleton } from "components/ui/news/NewsCardSkeleton.jsx";

const Home = () => {
    const [period, setPeriod] = useState(7); // default: 7 days
    const { data: articles, isLoading } = useNews(period);

    return (
        <div className='p-4'>
            <div className="flex gap-2 mb-4">
                {[1, 7, 30].map((p) => (
                    <button
                        key={p}
                        className={`px-4 py-2 rounded border ${period === p ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => setPeriod(p)}
                    >
                        Last {p} day{p > 1 ? "s" : ""}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
                    : articles?.length
                        ? articles.map((article, index) => (
                            <NewsCard key={`${article.title}-${index}`} article={article} />
                        ))
                        : <p>No articles found.</p>
                }
            </div>
        </div>
    );
};

export default Home;
