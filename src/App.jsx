import './App.scss'
import { ApiResponse, Div, Navbar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Users } from './pages'

const App = ({ apiResponse, setApiResponse }) => {
	return (
		<Div className="App">
			<Router>
				<Navbar />
				<Div id={'app__page'}>
					<Routes>
						<Route path={'/'} element={<Home />} exact />
						<Route path={'/users'} element={<Users />} />
					</Routes>
					<ApiResponse apiResponse={apiResponse} />
				</Div>
			</Router>
		</Div>
	)
}

export default App
