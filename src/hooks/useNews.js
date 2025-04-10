import { useQuery } from "@tanstack/react-query";

// Not putting API KEY into env file so, you do not have to create one by yourself.
const NYT_API_KEY = "3jZzrpdu9mL5QDN8mueCsGvbK22MaGI8";

const fetchMostPopular = async (period = 1) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${NYT_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.results.map(article => ({
        title: article.title,
        description: article.abstract,
        url: article.url,
        urlToImage: article.media?.[0]?.["media-metadata"]?.[2]?.url || "",
        source: { name: "New York Times" },
        publishedAt: article.published_date,
        uri: article.uri,
        adx_keywords: article.adx_keywords,
    }));
};

export const useNews = (period = 1) => {
    return useQuery({
        queryKey: ["mostPopularNews", period],
        queryFn: () => fetchMostPopular(period),
        staleTime: 5 * 60 * 1000,
    });
};
