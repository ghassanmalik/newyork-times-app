// import * as reactRouterDom from 'react-router-dom';
// // NewsCard.test.js
// import { render, screen, fireEvent } from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
// import { NewsCard } from './NewsCard';
//
// import '@testing-library/jest-dom';
// // Mock article data
//
// const article = {
//     title: 'Test Article',
//     description: 'This is a test description.',
//     source: { name: 'Test Source' },
//     urlToImage: 'https://example.com/image.jpg',
//     publishedAt: '2025-04-01',
//     uri: 'nyt://article/8730daa7-57ae-5322-af2c-a9756d0d5dd3',
// };
//
//
// test('renders NewsCard component and handles click', () => {
//     // Render component
//     render(<NewsCard article={article} cardKey={1} />);
//
//     // Check if title, description, and image are rendered
//     expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
//     expect(screen.getByText(/This is a test description./i)).toBeInTheDocument();
//     expect(screen.getByAltText(/Test Article/i)).toHaveAttribute('src', 'https://example.com/image.jpg');
//
//     // Simulate click event
//     const card = screen.getByRole('button');
//     fireEvent.click(card);
//
//     // You can test if the navigation was triggered (assuming you have react-router set up)
//     // You may mock the useNavigate function from react-router for this
// });
// //News Card Navigation test
// // Mocking useNavigate from react-router-dom
//
// jest.mock('react-router-dom', () => {
//     const actual = jest.requireActual('react-router-dom');
//     return {
//         ...actual,
//         useNavigate: jest.fn(), // mock only useNavigate
//     };
// });
//
//
// test('navigates when clicked', () => {
//     const navigate = useNavigate();
//     const article = { title: 'Test Article', uri: 'nyt://article/8730daa7' };
//     render(<NewsCard article={article} cardKey={1} />);
//
//     // Simulate click
//     const card = screen.getByRole('button');
//     fireEvent.click(card);
//
//     // Check if navigate was called with the correct URI
//     expect(navigate).toHaveBeenCalledWith('/article/nyt%3A%2F%2Farticle%2F8730daa7');
// });


// src/components/ui/news/NewsCard.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import { NewsCard } from "./NewsCard"; // Adjust this import path if needed
import React from "react";

// Mocking useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("NewsCard Component", () => {
    const mockArticle = {
        uri: "nyt://article/8730daa7",
        title: "Test Article",
        source: { name: "Test Source" },
        description: "This is a test description.",
        urlToImage: "https://example.com/image.jpg",
        publishedAt: "2025-04-01T12:00:00Z",
    };

    it("navigates when clicked", () => {
        render(<NewsCard article={mockArticle} />);

        const card = screen.getByRole("button"); // Make sure the card is clickable
        fireEvent.click(card);

        const encodedUri = encodeURIComponent(mockArticle.uri);
        expect(mockNavigate).toHaveBeenCalledWith(`/news/detail?uri=${encodedUri}`);
    });
});
