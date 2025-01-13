import { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProducts(data);
            });
    }, []);
    return [products, loading]
}

export default useProducts