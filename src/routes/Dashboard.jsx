import supabase from "../supabase-client.js";
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Form from "../components/Form.jsx";

function Dashboard() {
    const [metrics, setMetrics] = useState([]);
    useEffect(() => {
        fetchMetrics();
        const subscription = supabase
            .channel('public:sales_deals')
            .on(
                'postgres_changes',
                {event: '*', schema: 'public', table: 'sales_deals'},
                (payload) => {
                    console.log('Change received!', payload);
                    fetchMetrics();
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(subscription);
        }
    }, [])

    async function fetchMetrics() {
        const {data, error} = await supabase
            .from('sales_deals')
            .select('name, value.sum()')

        if (error) {
            throw new Error('Error fetching metrics:', error);
        } else {
            setMetrics(data);
        }
    }

    return (
        <div className="dashboard-wrapper">
            <div className="chart-container">
                <h2>Total Sales This Quarter ($)</h2>
                {metrics.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip
                                formatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Bar dataKey="sum" fill="#8884d8"/>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>Loading metrics...</p>
                )}
            </div>
            <Form metrics={metrics}/>
        </div>
    );
}

export default Dashboard;