import { Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import  HomePage  from './pages/HomePage';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/chats' element={<ChatPage/>}></Route>
           </Routes>
        </div>
    )
}
export default App;