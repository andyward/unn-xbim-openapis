import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModelInfo, ModelsService } from '../flexapi';
import { Config } from '../flexConfig';
import ModelViewer from '../Components/ModelViewer';


const ModelDetails = () => {
    const [model, setModel] = useState<ModelInfo>({});
    const navigate = useNavigate();
    const { modelId } = useParams();

    useEffect(() => {
        const fetchModel = async () => {
            const result = await ModelsService.modelsGetSingleByAssetmodelidAndTenantid({
                tenantId: Config.tenantId,
                region: Config.region,
                assetModelId: Number.parseInt(modelId!)
            }
            );
            setModel(result);
        };
        fetchModel();
    }, [modelId]);

    return (
        <div className="container">
            <button className="btn" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <div>
                <div className="title">
                    <h1>{model.Name}</h1>
                </div>
                <div className="flex-split-container">
                    <div className="flex-container">
                        {/* {model.image && (
                    <img src={model.image.url} alt="" className="model-img" />
                )} */}
                        <div className="model-infos">
                            <div className="row">
                                <h3 className="label">Name: </h3>
                                <p className="text">{model.Name}</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Asset: </h3>
                                <p className="text">{model.AssetName}</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Category: </h3>
                                <p className="text">{model.ModelSize} bytes</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Info: </h3>
                                <p className="text">{model.ProcessingStage}</p>
                            </div>
                            <div className="row">
                                <h3 className="label">Instructions: </h3>
                                <p className="text">{model.ProcessingStatus}</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex-viewer">
                        <ModelViewer model={model}></ModelViewer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;