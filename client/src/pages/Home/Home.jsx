import React from 'react';
import Section1 from './Section1';
import Section2 from './Section2';
import PointsTable from '../dashboard/PointsTable';
import HomeFooter from './HomeFooter';

const Home = () => {
    return (
        <div>
            <Section1 />
            <Section2 />
            <div className='px-5 '>
                <PointsTable />
            </div>
            <HomeFooter />
        </div>
    );
};

export default Home;