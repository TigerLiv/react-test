import React from 'react';



class MainLayout extends React.Component {
    render() {
        return (
            <div className='main-layout'>
                {this.props.children}
            </div>
        );
    }
}
export default MainLayout;