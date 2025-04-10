import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNews } from './useNews';

// Mock the global fetch
global.fetch = jest.fn();

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useNews hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe('useNews hook', () => {
        test('handles error state', async () => {
            fetch.mockRejectedValueOnce(new Error('API Error'));

            const { result } = renderHook(() => useNews(1), { wrapper: createWrapper() });

            await waitFor(() => expect(result.current.isError).toBe(true));
            expect(result.current.error).toEqual(new Error('API Error'));
        });
    });
});