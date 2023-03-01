import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
			<div className="banner-container">
				<div className="banner">
					<h2>Open API Model Viewer</h2>
					<Link to="/models">
						<div className="btn">View Models</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;