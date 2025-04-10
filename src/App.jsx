import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "components/layout/layout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Lazy loading pages
const Home = React.lazy(() => import("pages/Home/Home"));
const NewsDetail = React.lazy(() => import("pages/NewsDetail/NewsDetail"));

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient} contextSharing={true}>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/news/detail" element={<NewsDetail />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
        </QueryClientProvider>
    );
}
