export default function NewsImage({ article }) {
    return (
        <div className="w-full md:w-[40%] h-full relative -z-10">
            <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-75" />
            <div className="absolute inset-0 hover:scale-105 transition-transform duration-300 ease-in-out" />
        </div>
    );
}