import React, { useState, useEffect } from 'react';
import secureApi from '../../../api/secureApi';
import { Document, Page, View, Text, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        padding: '5px',
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
        backgroundColor: '#f0f0f0',  // Add background color for header
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
        width: '100%',
        textAlign: 'left',
        padding: '8px',
        fontSize: 10,
    },
    imageCell: {
        width: '50px',
        height: 'auto',
    },
});

const UserReport = () => {
    const [players, setPlayers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('player');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await secureApi.get(`/dashboard/playerInformation/${selectedRole}`);
                if (response.success) {
                    setPlayers(response.data);
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

        fetchPlayers();
    }, [selectedRole]);

    const handleChangeRole = (event) => {
        setSelectedRole(event.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container pt-5">
            <div className="mb-4">
                <label htmlFor="roleSelect" className="form-label">Select Role:</label>
                <select
                    className="form-select"
                    id="roleSelect"
                    value={selectedRole}
                    onChange={handleChangeRole}
                >
                    <option value="player">Player</option>
                    <option value="organizer">Organizer</option>
                    <option value="owner">Owner</option>
                    <option value="referee">Referee</option>
                </select>
            </div>
            <PDFViewer width="100%" height="500px">
                <Document>
                    <Page size="A4" style={styles.container}>
                        <View style={styles.table}>
                            <View style={styles.headerRow}>
                                <Text style={styles.cell}>ID</Text>
                                <Text style={styles.cell}>Username</Text>
                                <Text style={styles.cell}>Phone</Text>
                                <Text style={styles.cell}>UNI ID</Text>
                                <Text style={styles.cell}>Dept</Text>
                                <Text style={styles.cell}>Email</Text>
                            </View>
                            {players.map((player) => (
                                <View style={styles.row} key={player.id}>
                                    <Text style={styles.cell}>{player.id}</Text>
                                    <Text style={styles.cell}>{player.username}</Text>
                                    <Text style={styles.cell}>{player.phone}</Text>
                                    <Text style={styles.cell}>{player.user_id}</Text>
                                    <Text style={styles.cell}>{player.dept_id === '1' ? 'CSE' : ''}</Text>
                                    <Text style={styles.cell}>{player.email}</Text>
                                </View>
                            ))}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default UserReport;
