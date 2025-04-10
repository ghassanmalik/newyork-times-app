const fontStyle = {
    fontFamily:
        "nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, 'Times New Roman', times, serif",
};

export default function NewsHeader({ article }) {
    return (
        <div className="w-full md:w-[60%] bg-black text-white flex flex-col justify-center px-10 h-full">
            <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold italic leading-tight"
                style={fontStyle}
            >
                {article.title}
            </h1>
            <p
                className="mt-6 text-lg text-gray-300 not-italic leading-relaxed"
                style={{
                    ...fontStyle,
                    fontWeight: 300,
                    fontSize: "1.25rem",
                }}
            >
                {article.description}
            </p>
        </div>
    );
}