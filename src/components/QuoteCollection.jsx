import { useState, useEffect } from 'react'

const QuoteCollection = () => {
    const defaultQuotes = [
        { id: 1, text: "The only way to do great work is to love what you do.", author: "Steve Jobs", favorite: false },
        { id: 2, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", favorite: false },
        { id: 3, text: "Life is what happens when you're busy making other plans.", author: "John Lennon", favorite: false }
    ]

    const [quotes, setQuotes] = useState(() => {
        const savedQuotes = localStorage.getItem('quotes')
        return savedQuotes ? JSON.parse(savedQuotes) : defaultQuotes
    })
    const [newQuote, setNewQuote] = useState({ text: '', author: '' })
    const [showFavorites, setShowFavorites] = useState(false)
    const [randomQuote, setRandomQuote] = useState(null)

    useEffect(() => {
        const savedQuotes = localStorage.getItem('quotes')
        if (savedQuotes) {
            setQuotes(JSON.parse(savedQuotes))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('quotes', JSON.stringify(quotes))
    }, [quotes])

    const addQuote = (e) => {
        e.preventDefault()
        if (newQuote.text.trim() && newQuote.author.trim()) {
            const quote = {
                id: Date.now(),
                text: newQuote.text,
                author: newQuote.author,
                favorite: false
            }
            setQuotes(prev => [...prev, quote])
            setNewQuote({ text: '', author: '' })
        }
    }

    const deleteQuote = (id) => {
        setQuotes(prev => prev.filter(quote => quote.id !== id))
    }

    const toggleFavorite = (id) => {
        setQuotes(prev => prev.map(quote => quote.id === id ? { ...quote, favorite: !quote.favorite } : quote
            )
        )
    }

    const getRandomQuote = () => {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length)
            return quotes[randomIndex]
        }
        return null
    }

    const displayedQuotes = showFavorites
        ? quotes.filter(quote => quote.favorite)
        : quotes

    const favoriteCount = quotes.reduce((count, quote) => {
        return quote.favorite ? count + 1 : count
    }, 0)

    return (
        <div className="quote-collection">
            <form onSubmit={addQuote} className="quote-form">
                <input
                    type="text"
                    value={newQuote.text}
                    onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                    placeholder="Enter quote..."
                    className="quote-input"
                />
                <input
                    type="text"
                    value={newQuote.author}
                    onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                    placeholder="Author..."
                    className="quote-author-input"
                />
                <button type="submit" className="quote-add-btn">
                    Add Quote
                </button>
            </form>

            <div className="quote-controls">
                <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className="quote-filter-btn"
                >
                    {showFavorites ? 'Show All' : `Show Favorites (${favoriteCount})`}
                </button>
                <button
                    onClick={() => setRandomQuote(getRandomQuote())}
                    className="quote-random-btn"
                >
                    Random Quote
                </button>
            </div>

            {randomQuote && (
                <div className="random-quote">
                    <blockquote>
                        "{randomQuote.text}"
                        <cite>- {randomQuote.author}</cite>
                    </blockquote>
                </div>
            )}

            <div className="quotes-list">
                {displayedQuotes.length === 0 ? (
                    <p className="no-quotes">
                        {showFavorites ? 'No favorite quotes yet' : 'No quotes in collection'}
                    </p>
                ) : (
                    displayedQuotes.map(quote => (
                        <div key={quote.id} className="quote-item">
                            <blockquote>
                                "{quote.text}"
                                <cite>- {quote.author}</cite>
                            </blockquote>
                            <div className="quote-actions">
                                <button
                                    onClick={() => toggleFavorite(quote.id)}
                                    className={`quote-favorite ${quote.favorite ? 'active' : ''}`}
                                >
                                    {quote.favorite ? '❤️' : '🤍'}
                                </button>
                                <button
                                    onClick={() => deleteQuote(quote.id)}
                                    className="quote-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default QuoteCollection