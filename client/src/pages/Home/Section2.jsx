import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Section2 = () => {
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingMatch = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/dashboard/upcomming');
                setMatchData(response.data.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching upcoming match:', error);
                setLoading(false);
            }
        };

        fetchUpcomingMatch();
    }, []);

    if (loading) {
        return <div>Please Wait, it's loading...</div>;
    }

    if (!matchData) {
        return (
            <div className=" px-5 py-4 text-center">
                <h4>Upcoming Match Not Found</h4>
            </div>
        );
    }

    return (
        <div className="card px-5 py-4">
            <h2 className="text-center my-4">Upcoming Match</h2>
            <div className="card-body text-center">
                <div className="row justify-content-around team-vs">
                    <div className="col-md-5">
                        <div className="team-details text-center">
                            <img src={matchData.team1_logo} height={200} width={200} alt={matchData.team1_name} className="img-fluid mb-3" />
                            <h3>{matchData.team1_name}</h3>
                            <ul className="list-unstyled">
                                {/* Team 1 players can be added here */}
                            </ul>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <h1 className='font-weight-bold'>VS</h1>
                        <h3>{matchData?.match_stage == 'Final' && 'Final'}</h3>
                        <h3>{matchData?.match_stage == 'Semi-Final' && 'Semi-Final'}</h3>
                        <h3>{matchData.match_date}</h3>
                        <h3>{matchData.match_time}</h3>
                    </div>
                    <div className="col-md-5">
                        <div className="team-details text-center">
                            <img src={matchData.team2_logo} height={200} width={200} alt={matchData.team2_name} className="img-fluid mb-3" />
                            <h3>{matchData.team2_name}</h3>
                            <ul className="list-unstyled">
                                {/* Team 2 players can be added here */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
