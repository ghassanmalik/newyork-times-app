import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "components/ui/card/card";
import { formatDate } from "lib/utils.js";
import {useNavigate} from "react-router-dom";
import {useArticleStore} from "store/articleStore";

export const NewsCard = ({ article, cardKey }) => {
    const navigate = useNavigate();
    const setSelectedArticle = useArticleStore((state) => state.setSelectedArticle);

    const handleClick = () => {
        setSelectedArticle(article);
        const encodedUri = encodeURIComponent(article.uri);
        navigate(`/news/detail?uri=${encodedUri}`);
    };

    return (
        <Card
            key={cardKey}
            role="button"
            tabIndex={0}
            className="h-auto md:h-full transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg border border-gray-300 cursor-pointer"
            onClick={handleClick}
        >
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                    {article.title || article.webTitle}
                </CardTitle>
                <CardDescription>{article.source?.name || "Unknown"}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-2 md:line-clamp-none">
                    {article.description || article.abstract || "No description available."}
                </p>

                {article.urlToImage && (
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="mt-4 w-full h-32 md:h-48 object-cover rounded-lg"
                    />
                )}

                <p className="text-gray-500 mt-2">
                    Published on: {formatDate(article.publishedAt)}
                </p>
            </CardContent>
        </Card>
    )
};
