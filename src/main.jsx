import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import AppContent from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router basename="/old-antique">
      <AppContent />
    </Router>
);
