import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import secureApi from '../../../api/secureApi';
import { useReactToPrint } from 'react-to-print';

const styles = StyleSheet.create({
    container: {
        padding: '10px',
    },
    table: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomStyle: 'solid',
        alignItems: 'center',
        padding: '8px',
    },
    cell: {
        width: 'auto',
        textAlign: 'left',
        padding: '8px',
        fontSize: 10,
    },
    imageCell: {
        width: '50px',
        height: 'auto',
    },
});

const PointsTableReport = () => {
    const [season, setSeason] = useState(new Date().getFullYear());
    const [pointsData, setPointsData] = useState([]);
    const [rankingData, setRankingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {
        const fetchPointsData = async () => {
            try {
                const response = await secureApi.get(`/dashboard/points-table/${season}`);
                if (response.success) {
                    setPointsData(response.data);
                    setError(null);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPointsData();
    }, [season]);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await secureApi.get(`/dashboard/performance/${season}`);
                if (response.success) {
                    setRankingData(response.data);
                }
            } catch (err) {
                console.error('Error fetching ranking data:', err);
            }
        };

        fetchRankingData();
    }, [season]);

    const handleChangeSeason = (event) => {
        setSeason(event.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h3 className='pl-5'>Points Table</h3>
            <hr />
            <div className="mb-3 pl-5">
                <label htmlFor="seasonSelect" className="form-label">Select Season:</label>
                <select
                    className="form-select"
                    id="seasonSelect"
                    value={season}
                    onChange={handleChangeSeason}
                >
                    {[...Array(5)].map((_, index) => (
                        <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                    ))}
                </select>
            </div>
            <div className="pl-5">
                <button onClick={handlePrint} className="btn btn-success">Print as PDF</button>
            </div>
            <div ref={componentRef}>
                <div className='pl-5'>Season: {season}</div>
                <div className='pl-5' >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Club</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pointsData.map((team, index) => (
                                <tr key={team.team_id}>
                                    <td>{index + 1}</td>
                                    <td>{team.team_name}</td>
                                    <td>{team.MP}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.losses}</td>
                                    <td>{team.GF}</td>
                                    <td>{team.GA}</td>
                                    <td>{team.GD}</td>
                                    <td>{team.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pl-5">
                    <h3>Player Performance</h3>
                    <hr />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Player Name, Team Name</th>
                                <th>Goals</th>
                                <th>Yellow Cards</th>
                                <th>Red Cards</th>
                                <th>Assists</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingData.map((player, index) => (
                                <tr key={player.user_id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={player.photo} height={50} width={50} alt="" />
                                        {player.username}, &nbsp;
                                        {player.team_name}
                                    </td>
                                    <td>{player.total_goals}</td>
                                    <td>{player.total_yc}</td>
                                    <td>{player.total_rc}</td>
                                    <td>{player.total_assists}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Add PDF download functionality here */}
            {/* For example: <PDFViewer>
                <Document>
                    {/* Your PDF content */}
            {/* </Document>
            </PDFViewer> */}
        </div>
    );
};

export default PointsTableReport;
