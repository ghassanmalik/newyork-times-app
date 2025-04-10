const fontStyle = {
    fontFamily:
        "nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, 'Times New Roman', times, serif",
};

export default function ArticleMetadata({ article }) {
    return (
        <div className="w-full px-4 py-6 bg-gray-50 border-t border-gray-200">
            <div className="max-w-5xl flex flex-col md:flex-row gap-x-3">
                <div className="flex-shrink-0 text-gray-700 text-base leading-relaxed">
                    <p>
            <span style={fontStyle} className="font-semibold">
              Published On:
            </span>{" "}
                        {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2">
            <span style={fontStyle} className="font-semibold">
              Source:
            </span>{" "}
                        {article.source?.name || "Unknown"}
                    </p>
                    <div className="flex mt-2 text-gray-700 text-base leading-relaxed">
                        <p style={fontStyle} className="font-semibold mb-1">
                            Keywords:
                        </p>
                        <div className="flex flex-wrap gap-2 max-w-[70%]">
                            {article.adx_keywords?.split(";").map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 cursor-pointer transition"
                                >
                  {keyword.trim()}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}