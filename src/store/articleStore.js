import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useArticleStore = create(
    persist(
        (set) => ({
            selectedArticle: null,
            setSelectedArticle: (article) => set({ selectedArticle: article }),
        }),
        {
            name: 'nyt-article-store', // localStorage key
        }
    )
);
