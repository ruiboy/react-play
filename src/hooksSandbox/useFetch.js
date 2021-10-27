import { useEffect, useState } from 'react'

export const useFetch = (url) => {
    const [fact, setFact] = useState({data: null, loading: true})

    useEffect(() => {
        setFact({data: null, loading: true})
        fetch(url)
            .then(x => x.text())
            .then(y => setFact({data: y, loading: false}))
    }, [url, setFact])

    return fact
}