import { render, screen } from '@testing-library/react';
import { NewsCard } from './NewsCard';

describe('NewsCard Component', () => {
    const mockArticle = {
        title: "Test Article",
        description: "This is a test article",
        url: "https://example.com"
    };

    it('renders article title', () => {
        render(<NewsCard article={mockArticle} />);
        expect(screen.getByText(/Test Article/)).toBeInTheDocument();
    });

    it('renders article description', () => {
        render(<NewsCard article={mockArticle} />);
        expect(screen.getByText(/This is a test article/)).toBeInTheDocument();
    });

    // it('renders a link to the article', () => {
    //     render(<NewsCard article={mockArticle} />);
    //     expect(screen.getByRole('link')).toHaveAttribute('href', mockArticle.url);
    // });
});
