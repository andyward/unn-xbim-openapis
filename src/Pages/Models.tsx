import { LinearProgress, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useNavigate, Link } from 'react-router-dom';
import {Model, ModelsService } from '../flexapi';
import {Config} from '../flexConfig';


class Paging {
	// should use a Reducer
	setTotal(total: number) { 
		this.count = total; 
		this.totalPages = Math.ceil(total / this.top);
	}
	setPageNo(pageNo: number) { 
		this.pageNo = pageNo;
		this.skip = (Math.max(0, pageNo -1) * this.top);
	}
	count: number = 0;
	top: number = 12;
	skip?: number = undefined;
	pageNo: number = 1;
	totalPages: number = 0;
	sort = 'DateUploaded desc';
}

const Models = () => {
	const [models, setModels] = useState<Model[]>([]);
	const [paging, setPaging] = useState(new Paging());
	const [inError, setError] = useState({hasError: false, error: ''});

	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchModels = async () => {
			setIsLoading(true);
			console.log('loading');
			try{

				const result = await ModelsService.modelsGetByTenantid(
					{tenantId:Config.tenantId, region: Config.region, count: true, top: paging.top, skip: paging.skip, orderby: paging.sort}
				);
				console.log('loaded', result);
				setModels(result.value!);
				paging.setTotal(result['@odata.count']!);
				setPaging(paging);
			}
			catch(error) {
				setError({hasError: true, error: JSON.stringify(error)})
			}
			setIsLoading(false);
		};

		
		fetchModels();
	}, [paging]);
	
	const handleChange = (event: React.ChangeEvent<unknown>, pageno: number) => {
		console.log('page change', pageno);
		const newPage = new Paging();
		newPage.setTotal(paging.count);
		newPage.setPageNo(pageno);
		// setIsLoading(true);
		setPaging(newPage);
	  };
	  if(inError.hasError){
		return <p>Sorry there was an error: {inError.error}</p>
	  }
	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div className="title">
				<h1>{paging.count} Models</h1>
			</div>

				{isLoading ?  <LinearProgress /> : <span/> }

			<div className="models-container">
				{models.map((model) => (
					<div key={model.AssetModelId} className="model-card">
						{/* <img src={mode.image.url} alt="" className="model-img" /> */}
						<div className="model-info">
							<div className="content-text">
								<h2 className="model-name">{model.Name}</h2>
								<div className="info">{model.AssetName}</div>
								<div className="date"><Moment  format='MMM DD YYYY HH:mm:ss a'>{model.DateUploaded!}</Moment></div>
							</div>
							<Link to={`/models/${model.AssetModelId}`}>
								<div className="btn">View Details</div>
							</Link>
						</div>
					</div>
				))}
			</div>
			<div className="pagination">

				<Pagination count={paging.totalPages} page={paging.pageNo} onChange={handleChange} />
			</div>
		</div>
	);
};

export default Models;