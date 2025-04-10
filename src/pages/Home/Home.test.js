import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { useNews } from 'hooks/useNews';
import NewsCard from 'components/ui/news/NewsCard';
import NewsCardSkeleton from 'components/ui/news/NewsCardSkeleton';

// Mock child components and hooks
jest.mock('components/ui/news/NewsCard', () => ({ article }) => (
    <div data-testid="news-card">{article.title}</div>
));
jest.mock('components/ui/news/NewsCardSkeleton', () => () => (
    <div data-testid="news-card-skeleton">Loading skeleton...</div>
));
jest.mock('hooks/useNews');

describe('Home Component', () => {
    const mockArticles = [
        { title: 'Test Article 1', url: 'http://test1.com', urlToImage: 'image1.jpg' },
        { title: 'Test Article 2', url: 'http://test2.com', urlToImage: 'image2.jpg' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders period buttons correctly', () => {
        useNews.mockReturnValue({ data: [], isLoading: false });

        render(<Home />);

        expect(screen.getByText('Last 1 day')).toBeInTheDocument();
        expect(screen.getByText('Last 7 days')).toBeInTheDocument();
        expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    });

    test('defaults to 7-day period with active styling', () => {
        useNews.mockReturnValue({ data: [], isLoading: false });

        render(<Home />);

        const sevenDayButton = screen.getByText('Last 7 days');
        expect(sevenDayButton).toHaveClass('bg-black text-white');
    });

    test('changes period when button is clicked', () => {
        useNews.mockReturnValue({ data: [], isLoading: false });

        render(<Home />);

        const oneDayButton = screen.getByText('Last 1 day');
        fireEvent.click(oneDayButton);

        expect(oneDayButton).toHaveClass('bg-black text-white');
        expect(screen.getByText('Last 7 days')).not.toHaveClass('bg-black text-white');
    });

    // test('shows loading skeletons when data is loading', () => {
    //     useNews.mockReturnValue({ data: [], isLoading: true });
    //
    //     render(<Home />);
    //
    //     expect(screen.getAllByText('Loading skeleton...').length).toBe(6);
    // });

    // test('displays articles when loaded', () => {
    //     useNews.mockReturnValue({ data: mockArticles, isLoading: false });
    //
    //     render(<Home />);
    //
    //     expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    //     expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    // });

    // test('displays articles when loaded', () => {
    //     useNews.mockReturnValue({ data: mockArticles, isLoading: false });
    //
    //     render(<Home />);
    //
    //     // Verify the correct number of news cards are rendered
    //     const newsCards = screen.getAllByTestId('news-card');
    //     expect(newsCards).toHaveLength(2);
    //
    //     // Verify article titles are present
    //     expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    //     expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    // });

    test('shows "No articles found" when empty array is returned', () => {
        useNews.mockReturnValue({ data: [], isLoading: false });

        render(<Home />);

        expect(screen.getByText('No articles found.')).toBeInTheDocument();
    });

    test('calls useNews with correct period when changed', () => {
        const mockUseNews = useNews.mockReturnValue({ data: [], isLoading: false });

        render(<Home />);

        const thirtyDayButton = screen.getByText('Last 30 days');
        fireEvent.click(thirtyDayButton);

        expect(mockUseNews).toHaveBeenCalledWith(30);
    });
});