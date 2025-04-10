import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleDetail from './NewsDetail';
import { useArticleStore } from 'store/articleStore';
import { useQuery } from '../../hooks/useQuery';

// Mock the external dependencies
jest.mock('store/articleStore');
jest.mock('../../hooks/useQuery');

const mockUseArticleStore = useArticleStore;
const mockUseQuery = useQuery;

describe('ArticleDetail Component', () => {
    const mockArticle = {
        uri: 'test-uri',
        title: 'Test Article Title',
        description: 'This is a test article description',
        urlToImage: 'https://test-image.com/image.jpg',
        publishedAt: '2023-01-01T00:00:00Z',
        source: { name: 'Test Source' },
        adx_keywords: 'keyword1; keyword2; keyword3'
    };

    const mockEmptyStore = {
        selectedArticle: null,
        setSelectedArticle: jest.fn()
    };

    const mockStoreWithArticle = {
        selectedArticle: mockArticle,
        setSelectedArticle: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseQuery.mockReturnValue(new URLSearchParams('uri=test-uri'));
    });

    test('renders article details when article is in store', () => {
        mockUseArticleStore.mockImplementation((selector) => selector(mockStoreWithArticle));

        render(<ArticleDetail />);

        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
        expect(screen.getByText(mockArticle.description)).toBeInTheDocument();
        expect(screen.getByText('Test Source')).toBeInTheDocument();
    });

    test('shows "Article not found" when article is not in store', () => {
        mockUseArticleStore.mockImplementation((selector) => selector(mockEmptyStore));

        render(<ArticleDetail />);

        expect(screen.getByText('Article not found.')).toBeInTheDocument();
        expect(screen.queryByText(mockArticle.title)).not.toBeInTheDocument();
    });

    test('matches article by URI when multiple articles exist', () => {
        const otherArticle = {
            ...mockArticle,
            uri: 'other-uri',
            title: 'Other Article'
        };

        mockUseArticleStore.mockImplementation((selector) => selector({
            selectedArticle: otherArticle,
            setSelectedArticle: jest.fn()
        }));

        render(<ArticleDetail />);

        expect(screen.getByText('Article not found.')).toBeInTheDocument();
        expect(screen.queryByText('Other Article')).not.toBeInTheDocument();
    });

    test('handles URI decoding correctly', () => {
        const encodedUri = 'test%20uri%20with%20spaces';
        mockUseQuery.mockReturnValue(new URLSearchParams(`uri=${encodedUri}`));

        mockUseArticleStore.mockImplementation((selector) => selector({
            selectedArticle: { ...mockArticle, uri: 'test uri with spaces' },
            setSelectedArticle: jest.fn()
        }));

        render(<ArticleDetail />);

        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    });

    test('renders image with correct src', () => {
        mockUseArticleStore.mockImplementation((selector) => selector(mockStoreWithArticle));

        render(<ArticleDetail />);

        const image = screen.getByAltText(mockArticle.title);
        expect(image).toHaveAttribute('src', mockArticle.urlToImage);
    });

    test('handles empty keywords', () => {
        const articleWithoutKeywords = {
            ...mockArticle,
            adx_keywords: ''
        };

        mockUseArticleStore.mockImplementation((selector) => selector({
            selectedArticle: articleWithoutKeywords,
            setSelectedArticle: jest.fn()
        }));

        render(<ArticleDetail />);

        expect(screen.queryByText('keyword1')).not.toBeInTheDocument();
    });
});