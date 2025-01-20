import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });

    const acceptedProducts = products.filter(product => product.status === 'accepted').length;
    const pendingProducts = products.filter(product => !product.status || product.status === 'pending').length;
    const rejectedProducts = products.filter(product => product.status === 'rejected').length;

    const pieData = [
        { name: 'Accepted Products', value: acceptedProducts, color: '#4CAF50' },
        { name: 'Pending Products', value: pendingProducts, color: '#FFC107' },
        { name: 'Rejected Products', value: rejectedProducts, color: '#F44336' },
        { name: 'Total Users', value: users.length, color: '#2196F3' },
        { name: 'Total Reviews', value: reviews.length, color: '#9C27B0' }
    ];

    return (
        <div className="w-full p-6 space-y-8">
            <Helmet>
                <title>Statistics | Tech Hunt</title>
            </Helmet>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Statistics Overview</h2>

            <div className="bg-base-100 rounded-lg shadow p-6">
                <div className="h-96">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats bg-primary text-primary-content">
                    <div className="stat">
                        <div className="text-white">Total Products</div>
                        <div className="stat-value">{products.length}</div>
                    </div>
                </div>

                <div className="stats bg-secondary text-secondary-content">
                    <div className="stat">
                        <div className="text-white">Total Users</div>
                        <div className="stat-value">{users.length}</div>
                    </div>
                </div>

                <div className="stats bg-accent-content text-neutral-content">
                    <div className="stat">
                        <div className="text-white">Total Reviews</div>
                        <div className="stat-value">{reviews.length}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stats bg-success text-success-content">
                    <div className="stat">
                        <div className="">Accepted Products</div>
                        <div className="stat-value">{acceptedProducts}</div>
                    </div>
                </div>

                <div className="stats bg-warning text-warning-content">
                    <div className="stat">
                        <div className="">Pending Products</div>
                        <div className="stat-value">{pendingProducts}</div>
                    </div>
                </div>

                <div className="stats bg-error text-error-content">
                    <div className="stat">
                        <div className="">Rejected Products</div>
                        <div className="stat-value">{rejectedProducts}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
