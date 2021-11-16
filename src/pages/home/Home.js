import React from 'react';import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'

const Home = ({assets, isLoading}) =>  {
    // console.log(assets)
    return (
        <div className="home">
            {/* <FeatureInfo assets={assets} isLoading={isLoading}/> */}
            {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User" /> */}
            <WidgetLg assets={assets} isLoading={isLoading} />
            <WidgetSm />
        </div>
    );
    
}

export default Home;