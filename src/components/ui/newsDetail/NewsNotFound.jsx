export default function NewsNotFound({ article }) {
    if (article) {
        return (
            <div>
                <h1>{article.title}</h1>
                {/* render the rest if needed */}
            </div>
        );
    }
    return <p>Article not found.</p>;
}