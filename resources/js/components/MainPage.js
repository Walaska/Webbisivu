import React from 'react';
import ReactDOM from 'react-dom';
import ContainerC from './ContainerC';

function MainPage() {
    return (
        <ContainerC />
    );
}

export default MainPage;

if (document.getElementById('main-page')) {
    ReactDOM.render(<MainPage />, document.getElementById('main-page'));
}